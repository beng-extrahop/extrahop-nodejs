// index.js

const Swagger = require('./src/models/_http/Swagger.model');
const Appliance = require('./src/models/_app/Appliance.model');
const ApplianceSet = require('./src/models/_app/ApplianceSet.model');
const Environment = require('./src/models/_app/Environment.model');
const EnvironmentSet = require('./src/models/_app/EnvironmentSet.model');
const { Banner } = require('./src/constants/Global.constants');

module.exports = class Extrahop {
  constructor(config, options = {}) {
    // Check for quiet output mode
    if (!options.quiet) {
      console.log(Banner);
    }

    // ApplianceSet or EnvironmentSet
    if (config instanceof Array) {
      if (config[0].hostname && config[0].apikey) {
        return config.length > 1 ? new ApplianceSet(...config) : new Appliance(config[0]);
      }
      if (config[0].name && config[0].appliances) {
        return config.length > 1 ? new EnvironmentSet(...config) : new Environment(config[0]);
      }
    }

    // Check for Appliance
    else if (config.hostname && config.apikey) {
      return new Appliance(config);
    }

    // Check for Environment
    else if (config.name && config.appliances) {
      return new Environment(config);
    }

    // Invalid config
    else {
      console.error('No configuration provided or config file not found');
    }
  }
};
