// ApplianceSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Appliance = require('./Appliance.model');

module.exports = class ApplianceSet extends BaseObjectSet {
  constructor(appliances = []) {
    super(Array.from(appliances).map((appliance) => new Appliance(appliance)));
  }

  get(filter = {}) {
    const key = Object.keys(filter)[0];
    return this.find((appliance) => appliance[key] === filter[key]);
  }
};
