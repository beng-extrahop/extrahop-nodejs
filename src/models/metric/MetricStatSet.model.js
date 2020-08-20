// MetricStats.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const MetricStat = require('./MetricStat.model');

module.exports = class MetricStatSet extends BaseObjectSet {
  constructor(metricStats = []) {
    super();
    metricStats.forEach((metricStat) => this.push(new MetricStat(metricStat)));
  }
};
