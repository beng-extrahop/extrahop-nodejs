// MetricStat.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class MetricStat extends BaseObject {
  constructor(metricStat = {}) {
    super(metricStat);
    this.oid = metricStat.oid;
    this.time = metricStat.time;
    this.duration = metricStat.duration;
    this.values = metricStat.values;
  }
};
