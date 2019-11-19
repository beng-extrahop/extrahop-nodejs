// ExclusionIntervalSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const ExclusionInterval = require('../../models/exclusionInterval/ExclusionInterval.model');

module.exports = class ExclusionIntervalSet extends BaseObjectSet {
  constructor(...exclusionIntervals) {
    super(...exclusionIntervals.map(exclusionInterval => new ExclusionInterval(exclusionInterval)));
  }

  writeToCSV({ filename = `exclusionIntervals-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
