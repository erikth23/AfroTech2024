
import { on, exit } from 'process'
import 'dotenv/config'
import { app } from './app';
import { config } from './config/config';

let server;
server = app.listen(config.port, () => {
  console.log(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      exit(1);
    });
  } else {
    exit(1);
  }
};

// const unexpectedErrorHandler = (error) => {
//   logger.error(error);
//   exitHandler();
// };

// on('uncaughtException', unexpectedErrorHandler);
// on('unhandledRejection', unexpectedErrorHandler);

// on('SIGTERM', () => {
//   logger.info('SIGTERM received');
//   if (server) {
//     server.close();
//   }
// });
