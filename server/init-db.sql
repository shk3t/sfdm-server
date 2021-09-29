DROP SCHEMA guys CASCADE;
CREATE SCHEMA guys;
SET search_path TO guys;

CREATE TABLE guys.person
(
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(255),
    surname VARCHAR(255)
);

CREATE TABLE guys.post
(
    id      SERIAL PRIMARY KEY,
    title   VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
)