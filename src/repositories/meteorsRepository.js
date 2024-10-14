const axios = require('axios');

const getMeteorsData = async (startDate, endDate) => {
    const url = `${process.env.NASA_API_NEO_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`;
      
    console.debug(url)

    const response = await axios.get(url);
    return response.data.near_earth_objects;
};

module.exports = { getMeteorsData };
