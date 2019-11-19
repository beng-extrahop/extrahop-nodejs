// EnvironmentSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Environment = require('../../models/_extrahop/Environment.model');

module.exports = class EnvironmentSet extends BaseObjectSet {
  constructor(...environments) {
    super(...environments.map(environment => new Environment(environment)));
  }

  getEnvironment(name) {
    return this.find(environment => environment.name === name);
  }
};
