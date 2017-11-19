import log from "./lib/logger";

const welcome = () => {
  return "Welcome to DM-Tools - Demo program is working!!!";
};

log.info("Entering main");

console.log(welcome());

log.info("Exiting main");
