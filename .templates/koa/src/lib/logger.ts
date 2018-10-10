/**
 * Logging
 * Bunyan: https://www.npmjs.com/package/bunyan
 */
'use strict';
import * as bunyan from 'bunyan';

const log = bunyan.createLogger(
  { name: 'main', streams: [ { level: 'info', path: './logs/main.log' } ] } );

export { log };
