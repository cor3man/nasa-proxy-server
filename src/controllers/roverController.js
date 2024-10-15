const { getRoverImage } = require('../useCases/roverUseCase');

const getRoverImageForUser = async (req, res) => {
    try {
        const { userId, userName, userApiKey } = req.body;

        if (!userId || !userName || !userApiKey) {
            return res.status(400).json({ error: 'Missing required user data' });
        }

        const roverImage = await getRoverImage(userApiKey);

        if (req.accepts('html')) {
            return res.render('rover.njk', { roverImage });
        } else {
            return res.json({
                image: roverImage
            });
        }

    } catch (error) {
        console.error('Error fetching rover image:', error.message);
        res.status(500).json({ error: 'Failed to fetch rover image' });
    }
};

module.exports = { getRoverImageForUser };
