const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`SELECT * FROM users WHERE email = $1;`, [email])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => err);
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users 
  WHERE id = $1;`, [id])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => err);
}

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3);
  `, [user.name, user.email, user.password])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => err);
}

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  JOIN reservations ON properties.id = property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < NOW()::date
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows)
  .catch(err => err);
}


exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

  // return pool.query(`
  // SELECT * FROM properties
  // LIMIT $1
  // `, [limit])
  // .then(res => res.rows);

const checkInput = (count) => {
  if (count > 0) {
    return ' AND '; 
  } else {
    return ' WHERE ';
  }
};

const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let input = 0;

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `${checkInput(input)} city LIKE $${queryParams.length} `;
    input++;
  }

  if (options.user_id) {
    queryParams.push(`%${options.user_id}%`);
    queryString += `${checkInput(input)} user_id LIKE $${queryParams.length} `;
    input++;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `${checkInput(input)} cost_per_night >= $${queryParams.length} `;
    input++;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `${checkInput(input)} cost_per_night < $${queryParams.length} `;
    input++;
  }

  queryParams.push(limit);

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    GROUP BY properties.id
    HAVING AVG(property_reviews.rating) >= $${queryParams.length}
    ORDER BY cost_per_night
    LIMIT $${queryParams.length - 1};
    `;
    input++;
  } else {
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }

  console.log('string!!!!!',queryString);
  console.log();
  console.log('params!!!!!',queryParams)

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
  
}

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
