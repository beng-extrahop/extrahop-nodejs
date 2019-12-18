// EnvironmentSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Environment = require('../../models/_app/Environment.model');

module.exports = class EnvironmentSet extends BaseObjectSet {
  constructor(environments = []) {
    super();
    environments.forEach(environment => this.push(new Environment(environment)));
  }

  getEnvironment(name) {
    return this.find(environment => environment.name === name);
  }
};
