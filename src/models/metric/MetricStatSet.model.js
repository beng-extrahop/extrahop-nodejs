// MetricStats.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const MetricStat = require('./MetricStat.model');

module.exports = class MetricStatSet extends BaseObjectSet {
  constructor(metricStats = []) {
    super(Array.from(metricStats).map((metricStat) => new MetricStat(metricStat)));
  }
};
