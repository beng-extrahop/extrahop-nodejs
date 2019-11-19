// Metric.model.js

const BaseObject = require('../../models/_base/BaseObject.model');
const MetricStatSet = require('../../models/metric/MetricStatSet.model');

module.exports = class Metric extends BaseObject {
  constructor(metric = {}) {
    super(metric);
    this.stats = new MetricStatSet(metric.stats);
    this.cycle = metric.cycle;
    this.node_id = metric.node_id;
    this.clock = metric.clock;
    this.from = metric.from;
    this.until = metric.until;
  }
};
