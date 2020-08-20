// MetricSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Metric = require('./Metric.model');

module.exports = class MetricSet extends BaseObjectSet {
  constructor(metrics = []) {
    super();
    metrics.forEach((metric) => this.push(new Metric(metric)));
  }

  writeToCSV({ filename = `metrics-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
