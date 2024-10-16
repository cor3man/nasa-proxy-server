const { getLatestRoverImage } = require('../repositories/roverRepository');

const getRoverImage = async (userApiKey) => {
  const roverImage = await getLatestRoverImage(userApiKey);
  return roverImage;
};

module.exports = { getRoverImage };
