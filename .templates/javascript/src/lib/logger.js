"use strict";
const bunyan = require("bunyan");

const log = bunyan.createLogger( {
  name: "main",
  streams: [
    {
      level: "info",
      path: "./logs/main.log"
    }
  ]
} );

exports.info = msg => log.info(msg);
