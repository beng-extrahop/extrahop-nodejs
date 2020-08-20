// CustomizationSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Customization = require('./Customization.model');

module.exports = class CustomizationSet extends BaseObjectSet {
  constructor(customizations = []) {
    super();
    customizations.forEach((customization) => this.push(new Customization(customization)));
  }

  writeToCSV({ filename = `customizations-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
