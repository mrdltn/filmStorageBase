create TABLE person(
    person_id SERIAL PRIMARY KEY,
    firstname varchar(128),
    surname varchar(128),
    position varchar(32)
);

create TABLE film(
    film_id SERIAL PRIMARY KEY,
    title varchar(128) NOT NULL,
    production_year int NOT NULL,
    country varchar(64) NOT NULL,
    fk_director_id int REFERENCES person(person_id) NOT NULL,
    fk_scenario_id int REFERENCES person(person_id) NOT NULL,
    fk_producer_id int REFERENCES person(person_id) NOT NULL,
    fk_operator_id int REFERENCES person(person_id) NOT NULL,
    fk_composer_id int REFERENCES person(person_id) NOT NULL,
    fk_artist_id int REFERENCES person(person_id) NOT NULL,
    fk_editor_id int REFERENCES person(person_id) NOT NULL,
    budget int,
    cash_world int,
    release_world varchar(32),
    age_limit int,
    duration int
);

CREATE TABLE genre(
    genre_id SERIAL PRIMARY KEY,
    title varchar(64)
);

CREATE TABLE audience(
    audience_id SERIAL PRIMARY KEY,
    country varchar(64),
    quantity int
);

CREATE TYPE role AS ENUM ('main_role', 'dubbing_role');
CREATE TABLE film_person(
    film_id int REFERENCES film(film_id),
    person_id int REFERENCES person(person_id),
    person_role role,
    CONSTRAINT film_person_pk PRIMARY KEY (film_id, person_id)
);

CREATE TABLE film_genre(
    film_id int REFERENCES film(film_id),
    genre_id int REFERENCES genre(genre_id),
    CONSTRAINT film_genre_pk PRIMARY KEY (film_id, genre_id)
);

CREATE TABLE film_audience(
    film_id int REFERENCES film(film_id),
    audience_id int REFERENCES audience(audience_id),
    CONSTRAINT film_audience_pk PRIMARY KEY (film_id, audience_id)
);