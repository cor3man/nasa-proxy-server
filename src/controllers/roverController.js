const { getRoverImage } = require('../useCases/roverUseCase');
const CustomException = require('../errors/CustomException');

const getRoverImageForUser = async (req, res, next) => {
    try {
        const { userId, userName, userApiKey } = req.body;

        if (!userId || !userName || !userApiKey) {
            return next(new CustomException(400, 'Missing required user data'));
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
        next(error)
    }
};

module.exports = { getRoverImageForUser };
