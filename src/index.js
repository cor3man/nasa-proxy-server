const express = require('express');
const errorHandler = require('./errors/errorHandler');
const { getMeteors } = require('./controllers/meteorsController');
const { getRoverImageForUser } = require('./controllers/roverController');
const { PORT } = require('./configurations/config');
const nunjucks = require('nunjucks');

const app = express();

app.use(express.json());

nunjucks.configure('../views', {
	autoescape: true,
	express: app
});

app.get('/meteors', getMeteors);
app.post('/rover-image', getRoverImageForUser);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`The server is running on http://localhost:${PORT}`);
});

