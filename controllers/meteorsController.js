const { getFormattedMeteors } = require('../useCases/meteorsUseCase');

const getMeteors = async (req, res) => {
  try {
    const formattedMeteors = await getFormattedMeteors();
    res.json(formattedMeteors);

  } catch (error) {
    console.error('Error while making the request:', error.message);
    res.status(500).send('Error while fetching data from NASA API');
  }
};

module.exports = { getMeteors };
