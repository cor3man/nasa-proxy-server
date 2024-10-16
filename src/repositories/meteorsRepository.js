const { NASA_API_URL, NASA_API_KEY} = require('../configurations/config');
const axios = require('axios');
const NASA_API_NEO_URL = NASA_API_URL + '/neo/rest/v1/feed';

const getMeteorsData = async (startDate, endDate) => {
    const url = `${NASA_API_NEO_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
      
    console.debug(url)

    const response = await axios.get(url);
    return response.data.near_earth_objects;
};

module.exports = { getMeteorsData };

