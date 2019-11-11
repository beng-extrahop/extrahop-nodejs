// index.js

const Appliance = require('./src/models/_extrahop/Appliance.model');
const Environment = require('./src/models/_extrahop/Environment.model');
const EnvironmentSet = require('./src/models/_extrahop/EnvironmentSet.model');

module.exports = class Extrahop {
  constructor(config = {}) {
    if ( !config.environments ) {
      return new Appliance(config);
    }
    else if ( config.environments.length == 1 ) {
      return new Environment(config.environments[0]);
    }
    else {
      return new EnvironmentSet(config.environments);
    }
  }
}
