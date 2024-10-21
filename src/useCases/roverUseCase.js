import getLatestRoverImage from '../repositories/roverRepository.js';

export const getRoverImage = async (userApiKey) => {
  const roverImage = await getLatestRoverImage(userApiKey);
  return roverImage;
};
