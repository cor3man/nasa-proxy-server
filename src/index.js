const express = require('express');
const { getMeteors } = require('./controllers/meteorsController');
const { getRoverImageForUser } = require('./controllers/roverController');
const nunjucks = require('nunjucks');
require('dotenv').config({ path: '../.env' });

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_NEO_URL = process.env.NASA_API_NEO_URL;
const NASA_API_ROVER_URL = process.env.NASA_API_ROVER_URL
const PORT = process.env.APP_PORT;

validateEnvVariables(NASA_API_KEY, NASA_API_NEO_URL, NASA_API_ROVER_URL, PORT)

const app = express();
app.use(express.json());

nunjucks.configure('../views', {
	autoescape: true,
	express: app
});

app.get('/meteors', getMeteors);
app.post('/rover-image', getRoverImageForUser);

app.listen(PORT, () => {
	console.log(`The server is running on http://localhost:${PORT}`);
});

function validateEnvVariables(...envVars) {
	const faults = envVars.filter(ev => !ev);
	if (faults.length > 0) {
		console.error('Cant read env variables');
		process.exit(1);
	}
}
