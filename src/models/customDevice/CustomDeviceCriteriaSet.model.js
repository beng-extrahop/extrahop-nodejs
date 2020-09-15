// CustomDeviceCriteriaSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const CustomDeviceCriteria = require('./CustomDeviceCriteria.model');

module.exports = class CustomDeviceCriteriaSet extends BaseObjectSet {
  constructor(customDeviceCriterias = []) {
    super();
    customDeviceCriterias.forEach((customDevice) => this.push(new CustomDeviceCriteria(customDevice)));
  }

  writeToCSV({ filename = `customDeviceCriterias-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
