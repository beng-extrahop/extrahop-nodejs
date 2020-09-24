// ExclusionIntervalSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const ExclusionInterval = require('./ExclusionInterval.model');

module.exports = class ExclusionIntervalSet extends BaseObjectSet {
  constructor(exclusionIntervals = []) {
    super(Array.from(exclusionIntervals).map((exclusionInterval) => new ExclusionInterval(exclusionInterval)));
  }
};
