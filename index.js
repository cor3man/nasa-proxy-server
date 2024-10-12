const express = require('express');
const { getMeteors } = require('./controllers/meteorsController');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_NEO_URL = process.env.NASA_API_NEO_URL;
const PORT = process.env.APP_PORT;

validateEnvVariables(NASA_API_KEY, NASA_API_NEO_URL, PORT)

const app = express();
app.get('/meteors', getMeteors);

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
