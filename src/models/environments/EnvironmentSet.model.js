// EnvironmentSet.model.js

const BaseObjectSet = require('../../models/base/BaseObjectSet.model');
const Environment = require('../../models/environments/Environment.model');

module.exports = class EnvironmentSet extends BaseObjectSet {
  constructor(environments = []) {
    super(environments);
    environments.filter(environment => !environment.disabled).forEach(environment => this.push(new Environment(environment)));
  }

  getEnvironment(name = '') {
    return this.find(environment => environment.name == name);
  }
}
