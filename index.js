const axios = require('axios');
const express = require('express');
const { format, addDays, startOfWeek, endOfWeek } = require('date-fns');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_NEO_URL = process.env.NASA_API_NEO_URL;

if (!NASA_API_KEY || !NASA_API_NEO_URL) {
  console.error('Cant read env variables');
  process.exit(1); 
}

const app = express();
const PORT = 4000;
app.listen(PORT, () => {
  console.log('The server is running on port ${PORT}');
});

const today = new Date();
const startDate = startOfWeek(today, { weekStartsOn: 1 });
const endDate = addDays(startDate, 4);

const formattedStartDate = format(startDate, 'yyyy-MM-dd');
const formattedEndDate = format(endDate, 'yyyy-MM-dd');

const nasaUrl = `${NASA_API_NEO_URL}?start_date=${formattedStartDate}&end_date=${formattedEndDate}&api_key=${NASA_API_KEY}`;
async function getAsteroids() {
    try {
      console.log(nasaUrl)
      const response = await axios.get(nasaUrl);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error!', error.message);
    }
  }
  
getAsteroids();