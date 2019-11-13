// ApplianceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Appliance = require('../../models/_extrahop/Appliance.model');

module.exports = class ApplianceSet extends BaseObjectSet {
  constructor(appliances = []) {
    super(appliances);
    appliances.forEach(appliance => this.push(new Appliance(appliance)));
    console.log();
  }
}
