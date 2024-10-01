/**
 * Setup express server.
 */
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from './routes/v1';

import { RouteError } from './common/classes';
import { NodeEnvs } from './common/misc';
import { config } from './config/config'
import HttpStatusCodes from './common/HttpStatusCodes';
import httpStatus from 'http-status';


// **** Variables **** //

const app = express();

const BASE_V1 = "/v1"

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Security
if (config.env === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(BASE_V1, BaseRouter);

app.use("/", (req, res) => {
  res.status(httpStatus.NO_CONTENT).send()
})

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (config.env !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});


// **** Export default **** //

export default app;
