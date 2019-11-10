// ApplianceSet.model.js

const BaseObjectSet = require('../../models/base/BaseObjectSet.model');
const Appliance = require('../../models/appliances/Appliance.model');

module.exports = class ApplianceSet extends BaseObjectSet {
  constructor(appliances = []) {
    super(appliances);
    appliances.forEach(appliance => this.push(new Appliance(appliance)));
  }
}
