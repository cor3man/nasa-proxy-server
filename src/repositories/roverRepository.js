const axios = require('axios');

const getLatestRoverImage = async (apiKey) => {
  try {

    const response = await axios.get(process.env.NASA_API_ROVER_URL, {
      params: {
        api_key: apiKey
      }
    });

    const photos = response.data.latest_photos;
    if (photos.length === 0) {
      throw new Error('No photos available.');
    }

    const latestPhoto = photos[0];
    return latestPhoto.img_src;
  } catch (error) {
    console.error('Error fetching data from NASA Rover API:', error.message);
    throw error;
  }
};

module.exports = { getLatestRoverImage };
