const axios = require('axios');
const { format, addDays, startOfWeek, endOfWeek } = require('date-fns');

const getMeteors = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.NASA_API_NEO_URL}?start_date=${period().start}&end_date=${period().end}&api_key=${process.env.NASA_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error while making the request:', error.message);
    res.status(500).send('Error while fetching data from NASA API');
  }
};

function period() {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 });
  const endDate = addDays(startDate, 4);

  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');

  return {
      start: formattedStartDate,
      end: formattedEndDate,
  };
}

module.exports = { getMeteors };
