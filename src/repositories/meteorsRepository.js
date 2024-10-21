import axios from 'axios';
import config from '../configurations/config.js';

const { NASA_API_URL, NASA_API_KEY } = config;
const NASA_API_NEO_URL = `${NASA_API_URL}/neo/rest/v1/feed`;

const getMeteorsData = async (startDate, endDate) => {
  const url = `${NASA_API_NEO_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;

  const response = await axios.get(url);
  return response.data.near_earth_objects;
};

export default getMeteorsData;
