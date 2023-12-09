// Example NodeJS API Server
// Type 'npm run dev' to compile is watch mode.
// Type 'npm run devwatch' to run Server.

// Testing API Server
// curl localhost:3000/test
// curl localhost:3000/dfjfdsklj
// curl -X POST --data 'My test message!' localhost:3000/test

// Log files can be found under the 'logs' directory.
'use strict';
import express from 'express';
import cors from 'cors';
import log from '../utils/logger';

const SERVER_PORT = 3000;
const app = express();

app.use(cors());

app.get('/', (_req, res) => {
  log.info('GET /');
  res.send('Hello World!');
});
log.info('Node Server started ...');

// Start server to put into listen mode.
app.listen(SERVER_PORT, () => {
  log.info(`Server listening on port ${SERVER_PORT}`);
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
