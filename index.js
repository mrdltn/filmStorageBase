const dotenv = require('dotenv');
dotenv.config();

const PORT = process.envPORT || 5000;
const Application = require('./framework/Application');
const parseJson = require('./framework/parse-json');
const parseUrl = require('./framework/parse-url');

const filmRouter = require('./routes/film-routes');
const genreRouter = require('./routes/genre-routes');

const app = new Application();

app.use(parseJson);
app.use(parseUrl(`http://localhost:${PORT}`));
app.addRouter(filmRouter);
app.addRouter(genreRouter);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));