import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import { env } from 'process';

dotenv.config({ path: '/Users/erikth/Projects/design_scout/SortingHatService/.env'});

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('production'),
    PORT: Joi.number().default(3000),
    AWS_ACCESS_KEY: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    OPENAI_API_KEY:  Joi.string().required()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  accessKeyId: envVars.AWS_ACCESS_KEY,
  secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
  openAiApiKey: envVars.OPENAI_API_KEY
};
