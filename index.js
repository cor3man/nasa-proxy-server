const axios = require('axios');
const { format, addDays, startOfWeek, endOfWeek } = require('date-fns');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const NASA_API_KEY = '3wnO1v2VLBwGIzc05o6yoOdKWc0X0qi9obIDm5gG';

const today = new Date();
const startDate = startOfWeek(today, { weekStartsOn: 1 });
const endDate = addDays(startDate, 4);

const formattedStartDate = format(startDate, 'yyyy-MM-dd');
const formattedEndDate = format(endDate, 'yyyy-MM-dd');

const nasaUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}&api_key=${NASA_API_KEY}`;

async function getAsteroids() {
    try {
      const response = await axios.get(nasaUrl);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error!', error.message);
    }
  }
  
  getAsteroids();