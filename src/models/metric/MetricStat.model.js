// MetricStat.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class MetricStat extends BaseObject {
  constructor(metricStat = {}) {
    super();
    Object.keys(MetricStat).forEach((key) => this[key] = MetricStat[key]);
  }
};
