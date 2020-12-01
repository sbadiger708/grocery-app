CREATE DATABASE geeksvilla;

CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE grocery(
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price INT NOT NULL
);

CREATE TABLE cart(
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  grocery_id BIGINT NOT NULL REFERENCES grocery(id)
);

CREATE TABLE payment(
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  grocery_id BIGINT NOT NULL REFERENCES grocery(id),
  completed BOOLEAN NOT NULL DEFAULT false,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (user_name, user_email, user_password) VALUES ('Shivakumar', 'sbadiger708@gmail.com', '1234');