// index.js
'use strict';

var Appliance = require('./src/models/appliances/Appliance.model');
var Environment = require('./src/models/environments/Environment.model');
var EnvironmentSet = require('./src/models/environments/EnvironmentSet.model');

module.exports = class Extrahop {
  constructor(config) {
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

  printMsg() {
    console.log("This is a message from the demo package");
  }
}
