// index.js

const Appliance = require('./src/models/_extrahop/Appliance.model');
const ApplianceSet = require('./src/models/_extrahop/ApplianceSet.model');
const Environment = require('./src/models/_extrahop/Environment.model');
const EnvironmentSet = require('./src/models/_extrahop/EnvironmentSet.model');

module.exports = class Extrahop {
  constructor(config = {}) {
    // ApplianceSet or EnvironmentSet
    if ( config.environments || config.appliances || config instanceof Array ) {

      confg = config.environments || config.appliances || config[0];

      if ( config.hostname && config.apikey ) {
        return new ApplianceSet(config);
      }
      else if ( config.name && config.appliances ) {
        return new EnvironmentSet(config);
      }

    }

    // Appliance or Environment
    if ( config instanceof Object ) {

      if ( config.hostname && config.apikey ) {
        return new Appliance(config);
      }
      else if ( config.name && config.appliances ) {
        return new Environment(config);
      }

    }
  }
}
