import { getRoverImage } from '../useCases/roverUseCase.js';

export const getForm = (req, res) => {
    res.render('form.njk');
};

export const getRoverImageForUser = async (req, res, next) => {
    try {
        const { userApiKey } = req.body;
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
