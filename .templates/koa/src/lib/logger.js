'use strict';
import bunyan from 'bunyan';

export const log = bunyan.createLogger({
  name: 'main',
  streams: [
    {
      level: 'info',
      path: './logs/main.log'
    }
  ]
});
