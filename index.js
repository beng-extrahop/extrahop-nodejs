// index.js

const Appliance = require('./src/models/_extrahop/Appliance.model');
const ApplianceSet = require('./src/models/_extrahop/ApplianceSet.model');
const Environment = require('./src/models/_extrahop/Environment.model');
const EnvironmentSet = require('./src/models/_extrahop/EnvironmentSet.model');

module.exports = class Extrahop {
  constructor(config) {
    // ApplianceSet or EnvironmentSet
    if (config instanceof Array) {
      if (config[0].hostname && config[0].apikey) {
        return config.length > 1 ? new ApplianceSet(...config) : new Appliance(config[0]);
      }
      if (config[0].name && config[0].appliances) {
        return config.length > 1 ? new EnvironmentSet(...config) : new Environment(config[0]);
      }
    }

    // Appliance or Environment
    if (config instanceof Object) {
      if (config.hostname && config.apikey) {
        return new Appliance(config);
      }
      if (config.name && config.appliances) {
        return new Environment(config);
      }
    }
  }
};
