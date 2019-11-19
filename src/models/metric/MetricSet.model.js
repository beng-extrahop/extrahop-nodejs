// MetricSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Metric = require('../../models/metric/Metric.model');

module.exports = class MetricSet extends BaseObjectSet {
  constructor(...metrics) {
    super(...metrics.map(metric => new Metric(metric)));
  }

  writeToCSV({ filename = `metrics-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
