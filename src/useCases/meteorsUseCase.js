import { format, startOfWeek, endOfWeek } from 'date-fns';
import getMeteorsData from '../repositories/meteorsRepository.js';

const formatAsteroidsData = (asteroids) => Object.values(asteroids)
  .flatMap((day) => day.map((asteroid) => ({
    id: asteroid.id,
    name: asteroid.name,
    diameter: asteroid.estimated_diameter.meters,
    // eslint-disable-next-line camelcase
    is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
    // eslint-disable-next-line camelcase
    close_approach_date_full: asteroid.close_approach_data[0].close_approach_date_full,
    // eslint-disable-next-line camelcase
    relative_velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second,
  })),
);

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

export const getFormattedMeteors = async (start, end) => {
  if (!start || !end) {
    const { start: defaultStart, end: defaultEnd } = defaultDateRange();
    start = defaultStart;
    end = defaultEnd;
  }
  const asteroids = await getMeteorsData(start, end);

  return formatAsteroidsData(asteroids);
};
