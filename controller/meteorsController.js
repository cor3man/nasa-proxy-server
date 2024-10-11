const axios = require('axios');
const { format, addDays, startOfWeek, endOfWeek } = require('date-fns');

const getMeteors = async (req, res) => {
  try {
    const url = `${process.env.NASA_API_NEO_URL}?start_date=${period().start}&end_date=${period().end}&api_key=${process.env.NASA_API_KEY}`;
    console.debug(`Requested url: ${url}`)

    const response = await axios.get(url);

    res.json(exctractEssentialData(response));

  } catch (error) {
    console.error('Error while making the request:', error.message);
    res.status(500).send('Error while fetching data from NASA API');
  }
};


function exctractEssentialData(response) {
  const asteroids = response.data.near_earth_objects;

  const filteredAsteroids = Object.values(asteroids).flatMap(day => 
    day.map(asteroid => ({
      id: asteroid.id,
      name: asteroid.name,
      diameter: asteroid.estimated_diameter.meters,
      is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
      close_approach_date_full: asteroid.close_approach_data[0].close_approach_date_full,
      relative_velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
    }))
  );

  return filteredAsteroids;
}


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
