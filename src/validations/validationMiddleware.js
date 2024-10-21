import { CustomException } from '../errors/CustomException.js';

export const validateSchema = (schema) => (req, _res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomException(400, error.details[0].message));
  }
  return next();
};
