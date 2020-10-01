// EnvironmentSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Environment = require('./Environment.model');

module.exports = class EnvironmentSet extends BaseObjectSet {
  constructor(environments = []) {
    super(Array.from(environments).map((environment) => new Environment(environment)));
  }

  get(filter = {}) {
    const key = Object.keys(filter)[0];
    return this.find((environment) => environment[key] === filter[key]);
  }
};
