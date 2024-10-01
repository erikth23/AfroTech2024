import express from 'express';
import { config } from './config/config';
import morgan from './config/morgan';
import { router as routes } from './routes/v1';
import httpStatus from 'http-status';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use('/v1', routes);

app.use('/', (req, res) => {
  res.status(httpStatus.NO_CONTENT).send()
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new Error('Not found'));
});

export { app }
