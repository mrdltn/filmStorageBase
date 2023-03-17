const db = require('../db');

class FilmGenreController {
    async addRecord(film_id, genres_id) {
        let queryToFilmGenre = "INSERT INTO film_genre (film_id, genre_id) values ";
        for (let i = 0; i < genres_id.length; i++) {
            const genre_id = genres_id[i];
            queryToFilmGenre += `(${film_id}, ${genre_id})`;
            if (i !== genres_id.length - 1) {
                queryToFilmGenre += ","
            }
        }
        db.query(queryToFilmGenre);
    }

    async deleteFilmRecords(film_id) {
        let query = `DELETE FROM film_genre WHERE film_id = ${film_id}`;
        await db.query(query);
    }

    async deleteGenreRecords(genre_id) {
        let query = `DELETE FROM film_genre WHERE genre_id = ${genre_id}`;
        await db.query(query);
    }
}


module.exports = new FilmGenreController();