const { getMeteorsData } = require('../repositories/meteorsRepository');
const { format, startOfWeek, endOfWeek } = require('date-fns');

const getFormattedMeteors = async (start, end) => {

    if (!start || !end) {
        const { start: defaultStart, end: defaultEnd } = defaultDateRange();
        start = defaultStart;
        end = defaultEnd;
    }
     
    const asteroids = await getMeteorsData(start, end);
    
    return formatAsteroidsData(asteroids);
};

const formatAsteroidsData = (asteroids) => {
    return Object.values(asteroids).flatMap(day =>
      day.map(asteroid => ({
        id: asteroid.id,
        name: asteroid.name,
        diameter: asteroid.estimated_diameter.meters,
        is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
        close_approach_date_full: asteroid.close_approach_data[0].close_approach_date_full,
        relative_velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
      }))
    );
};

const defaultDateRange = () => {
  const now = new Date();
  const startDate = startOfWeek(now, { weekStartsOn: 1 });
  const endDate = endOfWeek(now, { weekStartsOn: 1 });
  
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(new Date(endDate.setDate(endDate.getDate() - 2)), 'yyyy-MM-dd');

  return {
    start: formattedStartDate,
    end: formattedEndDate,
  };
};

module.exports = { getFormattedMeteors };
