INSERT INTO users(id, name, email, password)
VALUES (1,'Homer Simpson','homer_simpson@email.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       (2,'Marge Simpson','maggie_simpson@email.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       (3,'Maggie Simpson','maggie_simpson@email.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1,'Ocean Views','breezy','https://external-preview.redd.it/QtyT-J_AdnuJSYl_7V3IY8jvq3Wt3dzFjsgsHmsUscs.jpg?auto=webp&s=e51bc6e52ab3d4340e1c00b9e91c15acd458f68b','https://external-preview.redd.it/QtyT-J_AdnuJSYl_7V3IY8jvq3Wt3dzFjsgsHmsUscs.jpg?auto=webp&s=e51bc6e52ab3d4340e1c00b9e91c15acd458f68b',300,2,2,3,'Canada', 'This Street', 'Vancouver','British Columbia','V1S2V1', true),
       (2,'City Views','buzzing','https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,fl_lossy/g5/g5-c-1t2d31r8-berkshire-communities/g5-cl-57lfbgucw-the-rey/uploads/bpa-sandiego-therey-hero.jpg','https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,fl_lossy/g5/g5-c-1t2d31r8-berkshire-communities/g5-cl-57lfbgucw-the-rey/uploads/bpa-sandiego-therey-hero.jpg', 400,1,2,3,'United States of America','Narrow Street','San Diego', 'California','A1Z2A1', true),
       (3,'Ranch','quiet','https://si.wsj.net/public/resources/images/B3-ET798_MURPHY_M_20190819105950.jpg','https://si.wsj.net/public/resources/images/B3-ET798_MURPHY_M_20190819105950.jpg', 200,5,3,4,'Canada','Open Street','Calgary','Alberta','C2A8C1',true);

INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES ('2019-01-01', '2019-02-01',1,1),
       ('2019-02-01', '2019-03-01',2,2),
       ('2019-03-01', '2019-04-01',3,3);

INSERT INTO property_reviews(guest_id, reservation_id, property_id, rating, message)
VALUES (1, 1, 1, 5, 'small and clean'),
       (2, 2, 2, 4, 'accessible'),
       (3, 3, 3, 4, 'big and cozy');