// index.js

const Appliance = require('./src/models/_app/Appliance.model');
const ApplianceSet = require('./src/models/_app/ApplianceSet.model');
const Environment = require('./src/models/_app/Environment.model');
const EnvironmentSet = require('./src/models/_app/EnvironmentSet.model');
const { Banner } = require('./src/constants/Global.constants');

module.exports = class Extrahop {
  constructor(config, options = {}) {
    console.log(Banner);

    // ApplianceSet
    if (config instanceof Array && config[0].hostname && config[0].apikey) {
      return config.length > 1 ? new ApplianceSet(config) : new Appliance(config[0]);
    }

    // EnvironmentSet
    if (config instanceof Array && config[0].appliances) {
      return config.length > 1 ? new EnvironmentSet(config) : new Environment(config[0]);
    }

    // Appliance
    if (config.hostname && config.apikey) {
      return new Appliance(config);
    }

    // Environment
    if (config.appliances) {
      return new Environment(config);
    }

    // Invalid
    console.error('No configuration provided or config file not found');
  }
};
