import { format, parseISO } from 'date-fns';
import { getFormattedMeteors } from '../useCases/meteorsUseCase.js';

export const getMeteors = async (req, res, next) => {
  try {
    const { date, count, 'were-dangerous-meteors': dangerousMeteors } = req.query;

    const [startDate, endDate] = date ? date.split('/') : [null, null];
    const formattedStartDate = startDate ? format(parseISO(startDate), 'yyyy-MM-dd') : null;
    const formattedEndDate = endDate ? format(parseISO(endDate), 'yyyy-MM-dd') : null;

    let meteors = await getFormattedMeteors(formattedStartDate, formattedEndDate);

    if (dangerousMeteors !== undefined) {
      const isDangerous = dangerousMeteors === 'true';
      meteors = meteors.filter(meteor => meteor.is_potentially_hazardous_asteroid === isDangerous);
    }

    if (req.accepts('html')) {
      if (count !== undefined) {
        return res.render('meteors.njk', { count: meteors.length });
      }
      return res.render('meteors.njk', { meteors });
    } else {
      if (count !== undefined) {
        return res.json({ count: meteors.length });
      }
      return res.json(meteors);
    }

  } catch (error) {
    next(error)
  }
};

