// index.js
'use strict';

var Appliance = require('./src/models/appliances/Appliance.model');
var Environment = require('./src/models/environments/Environment.model');
var EnvironmentSet = require('./src/models/environments/EnvironmentSet.model');

module.exports = class Extrahop {
  constructor(config) {
    if ( config instanceof Object ) {
      return config.environments == null ? new Appliance(config) : new EnvironmentSet(config.environments);
    }
    else {
      return new Environment(config.environments.find(environment => environment.name == config));
    }
  }

  printMsg() {
    console.log("This is a message from the demo package");
  }
}
