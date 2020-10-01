// Environment.model.js

const BaseObject = require('../_base/BaseObject.model');
const Appliance = require('./Appliance.model');
const ApplianceSet = require('./ApplianceSet.model');

module.exports = class Environment extends BaseObject {
  constructor(environment = {}) {
    super();
    this.config = environment;
    this.name = this.config.name;
    this.eca = this.get({ type: 'ECA' });
    this.eda = this.get({ type: 'EDA' });
    this.eta = this.get({ type: 'ETA' });
    this.exa = this.get({ type: 'EXA' });
  }

  get(filter = {}) {
    const key = Object.keys(filter)[0];
    const appliances = this.config.appliances.filter((appliance) => appliance[key] === filter[key]);

    if (appliances.length) {
      return appliances.length > 1 ? new ApplianceSet(appliances) : new Appliance(appliances[0]);
    }
  }
};
