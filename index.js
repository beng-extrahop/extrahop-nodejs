// index.js

const Appliance = require('./src/models/_extrahop/Appliance.model');
const ApplianceSet = require('./src/models/_extrahop/ApplianceSet.model');
const Environment = require('./src/models/_extrahop/Environment.model');
const EnvironmentSet = require('./src/models/_extrahop/EnvironmentSet.model');

module.exports = class Extrahop {
  constructor(config = {}) {
    if ( !config.environments && !config.appliances  ) {
      return new Appliance(config);
    }
    else if ( !config.environments && config.appliances ) {
      return new ApplianceSet(config);
    }
    else if ( config.environments.length == 1 ) {
      return new Environment(config.environments[0]);
    }
    else {
      return new EnvironmentSet(config.environments);
    }
  }
}
