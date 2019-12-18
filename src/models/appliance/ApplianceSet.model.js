// ApplianceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Appliance = require('../../models/appliance/Appliance.model');

module.exports = class ApplianceSet extends BaseObjectSet {
  constructor(appliances = []) {
    super();
    appliances.forEach(appliance => this.push(new Appliance(appliance)));
  }

  writeToCSV({ filename = `appliances-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
