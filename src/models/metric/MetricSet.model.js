// MetricSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Metric = require('./Metric.model');

module.exports = class MetricSet extends BaseObjectSet {
  constructor(metrics = []) {
    super(Array.from(metrics).map((metric) => new Metric(metric)));
  }
};
