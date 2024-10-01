import Joi from 'joi';
import { pick } from '../utils/pick';
import { IReq, IRes } from '../routes/common/types';

const validate = (schema: any) => (req: IReq, res: IRes, next: any) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new Error(errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export { validate };