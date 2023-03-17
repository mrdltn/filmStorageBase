CREATE TABLE film_light_search(
    film_id SERIAL PRIMARY KEY,
    title varchar(64),
    release_year int
);

CREATE TABLE genre_light_search(
    genre_id SERIAL PRIMARY KEY,
    title varchar(32)
);

CREATE TABLE film_genre(
    film_id int REFERENCES film_light_search(film_id),
    genre_id int REFERENCES genre_light_search(genre_id),
    CONSTRAINT film_genre_pk PRIMARY KEY (film_id, genre_id)
);