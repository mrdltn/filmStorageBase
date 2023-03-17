const db = require('../db');
const filmGenreController = require('./film-genre-controller');

class GenreController {
    async createGenre(req, res) {
        const {title} = req.body;

        const newGenre = await db.query("INSERT into genre_light_search (title) values ($1) RETURNING *", 
        [title]);

        res.send(newGenre.rows[0]);
    }

    async getGenres(req, res) {
        const id = req.params.id;
        if (id) {
            const genre = await db.query(`SELECT g.title as genre_title, array_agg(f.title) as films
            FROM genre_light_search g
            LEFT JOIN film_genre fg ON fg.genre_id = g.genre_id
            LEFT JOIN film_simple f ON fg.film_id = f.film_id WHERE g.genre_id = $1 GROUP BY g.title `, [id]);
            res.send(genre.rows[0]);
        } else {
            const genres = await db.query(`SELECT g.title as genre_title, 
            array_agg(f.title)as films 
            FROM genre_light_search g
            LEFT JOIN film_genre fg ON fg.genre_id = g.genre_id
            LEFT JOIN film_simple f ON fg.film_id = f.film_id GROUP BY g.title`);
            res.send(genres.rows);
        }
    }

    async updateGenre(req, res) {
        const id = req.params.id;
        const {title} = req.body;

        let updatedGenre;
        if (id) {
            const genre = await db.query("SELECT * FROM genre_light_search WHERE genre_id = $1", [id]);
            if (title) {
                updatedGenre = await db.query('UPDATE genre_light_search set title = $1 WHERE genre_id = $2 RETURNING *', 
                [title, id]);
                
                res.send(updatedGenre.rows[0]);
            } else {
                res.send(genre.rows[0]);
            }
        } else {
            throw new Error('id of "film" did not specified');
        }
    }

    async deleteGenre(req, res) {
        const id = req.params.id;
        if (id) {
            await filmGenreController.deleteGenreRecords(id);
            const genre = await db.query(`DELETE FROM genre_light_search WHERE genre_id = $1  RETURNING *`, [id]);
            res.send(genre.rows[0]);
        } else {
            throw new Error('id of "genre" did not specified');
        }
    }
}


module.exports = new GenreController();