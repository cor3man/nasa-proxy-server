const { getRoverImage } = require('../useCases/roverUseCase');

const getForm = (req, res) => {
    res.render('form.njk');
};

const getRoverImageForUser = async (req, res, next) => {
    try {
        const { userId, userName, userApiKey } = req.body;
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

module.exports = { getRoverImageForUser, getForm };
