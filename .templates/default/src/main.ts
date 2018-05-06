// Example NodeJS API Server
// Type 'npm start' to start Server.

// Testing API Server
// curl localhost:3000/test
// curl localhost:3000/dfjfdsklj
// curl -X POST --data 'My test message!' localhost:3000/test

// Log files can be found under the 'logs' directory.
'use strict';
import log from './lib/logger';

log.info( 'Test app started.' );
console.log('It is working!');
