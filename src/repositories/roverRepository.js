const axios = require('axios');
const { NASA_API_URL } = require('../configurations/config');
const NASA_API_ROVER_URL = NASA_API_URL + '/mars-photos/api/v1/rovers/curiosity/latest_photos';
const CustomException = require('../errors/CustomException')

const getLatestRoverImage = async (apiKey) => {
  const response = await axios.get(NASA_API_ROVER_URL, {
    params: {
      api_key: apiKey
    }
  });

  const photos = response.data.latest_photos;
  if (photos.length === 0) {
    throw new CustomException(204, 'No photos available.');
  }

  const latestPhoto = photos[0];
  return latestPhoto.img_src;
};

module.exports = { getLatestRoverImage };
