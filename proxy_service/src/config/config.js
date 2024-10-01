const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    CANIDATE_CLIENT_ID: Joi.string().required(),
    CANIDATE_CLIENT_SECRET: Joi.string().required(),
    SHS_ENDPOINT: Joi.string().required(),
    PS_ENDPOINT: Joi.string().required(),
    IMAGE_SERVICE_ENDPOINT: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  canidateClientId: envVars.CANIDATE_CLIENT_ID,
  canidateClientSecret: envVars.CANIDATE_CLIENT_SECRET,
  shsEndpoint: envVars.SHS_ENDPOINT,
  psEndpoint: envVars.PS_ENDPOINT,
  imageServiceEndpoint: envVars.IMAGE_SERVICE_ENDPOINT
};
