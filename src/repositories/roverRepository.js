import axios from 'axios';
import config from '../configurations/config.js';
import { CustomException } from '../errors/CustomException.js';

const { NASA_API_URL } = config;
const NASA_API_ROVER_URL = `${NASA_API_URL}/mars-photos/api/v1/rovers/curiosity/latest_photos`;

const getLatestRoverImage = async (apiKey) => {
  const response = await axios.get(NASA_API_ROVER_URL, {
    params: {
      // eslint-disable-next-line camelcase
      api_key: apiKey,
    },
  });

  const photos = response.data.latest_photos;
  if (photos.length === 0) {
    throw new CustomException(204, 'No photos available.');
  }

  const latestPhoto = photos[0];
  return latestPhoto.img_src;
};

export default getLatestRoverImage;
