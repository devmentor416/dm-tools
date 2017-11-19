import log from "./lib/logger";

const welcome = (): string => {
  return "Welcome to DM-Tools - Node.js demo program is working!";
};

log.info( "Entering main" );

console.log( welcome() );

log.info( "Exiting main" );
