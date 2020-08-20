// ExclusionIntervalSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const ExclusionInterval = require('./ExclusionInterval.model');

module.exports = class ExclusionIntervalSet extends BaseObjectSet {
  constructor(exclusionIntervals = []) {
    super();
    exclusionIntervals.forEach((exclusionInterval) => this.push(new ExclusionInterval(exclusionInterval)));
  }

  writeToCSV({ filename = `exclusionIntervals-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
