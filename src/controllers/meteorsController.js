const { getFormattedMeteors } = require('../useCases/meteorsUseCase');
const { format, parseISO } = require('date-fns');

const getMeteors = async (req, res, next) => {
  try {
    const { date, count, 'were-dangerous-meteors': dangerousMeteors } = req.query;

    const [start_date, end_date] = date ? date.split('/') : [null, null];
    const formattedStartDate = start_date ? format(parseISO(start_date), 'yyyy-MM-dd') : null;
    const formattedEndDate = end_date ? format(parseISO(end_date), 'yyyy-MM-dd') : null;

    var meteors = await getFormattedMeteors(formattedStartDate, formattedEndDate);

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

module.exports = { getMeteors };
