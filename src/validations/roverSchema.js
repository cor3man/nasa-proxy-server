import joi from 'joi';

export const roverSchema = joi.object({
  userId: joi.string().required(),
  userName: joi.string().required(),
  userApiKey: joi.string().required(),
});
