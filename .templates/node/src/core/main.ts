// Example NodeJS API Server
// Type 'npm run dev' to compile is watch mode.
// Type 'npm run devwatch' to run Server.

// Testing API Server
// curl localhost:3000/test
// curl localhost:3000/dfjfdsklj
// curl -X POST --data 'My test message!' localhost:3000/test

// Log files can be found under the 'logs' directory.
'use strict';
import {createServer, IncomingMessage, ServerResponse} from 'http';
import {Buffer} from 'buffer';
import log from '../utils/logger';

const SERVER_PORT = 3000;

log.info('Node Server started ...');

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    const {method, url, headers} = request;
    const user_agent = headers['user-agent'];
    log.info('Handling request ...');
    log.info(`user-agent: ${user_agent}`);

    const request_body: Uint8Array[] = [];
    let request_data = '';

    request.on('error', (err) => {
      log.info(err.message);
      log.info(err.stack);
    });

    const ERR_SUCCESS = 200;
    const ERR_BAD_REQUEST = 400;
    let message = {};

    log.info(`Method: ${method}, URL: ${url}`);

    // Enable CORS
    response.writeHead(ERR_SUCCESS, {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });

    if (method === 'GET' && url === '/test') {
      // Process HTTP GET
      message = {
        status: 200,
        message: 'Server is running.',
      };
      const response_data = JSON.stringify(message) + '\n';
      response.write(response_data);
      response.end();
      log.info('Response sent to client.');
    } else if (method === 'POST' && url === '/test') {
      // Process HTTP POST
      request
        .on('data', (chunk) => {
          // Capture data
          request_body.push(chunk);
        })
        .on('end', () => {
          // We must wait for the request data to be processed completely,
          // before performing any action
          request_data = Buffer.concat(request_body).toString();
          log.info(`Request data: ${request_data}`);
          message = {
            status: ERR_SUCCESS,
            length: request_data.length,
            message: request_data,
          };
          log.info('Posting test request.');
          log.info(`Data: ${request_data}`);
          const response_data = JSON.stringify(message) + '\n';
          response.write(response_data);
          response.end();
        });
    } else {
      // Unknown Client request, send a 400 server error.
      log.info('Server Error: Bad Client request.');
      response.writeHead(ERR_BAD_REQUEST, {
        'Content-type': 'application/json',
      });
      message = {
        status: ERR_BAD_REQUEST,
        message: 'Bad Request',
      };
      const response_data = JSON.stringify(message) + '\n';
      response.write(response_data);
      response.end();
      log.info('Response sent to client.');
    }
  },
);

// Start server to put into listen mode.
server.listen(SERVER_PORT, () => {
  log.info(`Server listening on port ${SERVER_PORT}`);
  console.log(`Server listening on port ${SERVER_PORT}`);
});
