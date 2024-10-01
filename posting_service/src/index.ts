import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import { config } from './config/config';
import server from './server';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  config.port.toString());

server.listen(config.port, () => logger.info(SERVER_START_MSG));
