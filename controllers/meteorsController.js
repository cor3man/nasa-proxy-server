const { getFormattedMeteors } = require('../useCases/meteorsUseCase');
const { format, parseISO } = require('date-fns');

const getMeteors = async (req, res) => {
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

    if (count !== undefined) {
      return res.json({ count: meteors.length });
    }

    res.json(meteors);

  } catch (error) {
    console.error('Error while making the request:', error.message);
    res.status(500).send('Error while fetching data from NASA API');
  }
};

module.exports = { getMeteors };
