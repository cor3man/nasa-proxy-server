const express = require('express');
const errorHandler = require('./errors/errorHandler');
const { getMeteors } = require('./controllers/meteorsController');
const { getForm, getRoverImageForUser } = require('./controllers/roverController');
const { PORT } = require('./configurations/config');
const nunjucks = require('nunjucks');
const validateSchema = require('./validations/validationMiddleware');
const roverSchema = require('./validations/roverSchema');

const app = express();
nunjucks.configure('../views', {
	autoescape: true,
	express: app
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/meteors', getMeteors);
app.get('/rover-image', getForm);
app.post('/rover-image', validateSchema(roverSchema), getRoverImageForUser);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`The server is running on http://localhost:${PORT}`);
});
