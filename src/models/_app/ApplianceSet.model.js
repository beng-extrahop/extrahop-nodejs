// ApplianceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Appliance = require('../../models/_app/Appliance.model');

module.exports = class ApplianceSet extends BaseObjectSet {
  constructor(appliances = []) {
    super();
    appliances.forEach(appliance => this.push(new Appliance(appliance)));
  }
};
