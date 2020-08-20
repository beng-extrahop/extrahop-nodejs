// Metric.model.js

const BaseObject = require('../_base/BaseObject.model');
const MetricStatSet = require('./MetricStatSet.model');

module.exports = class Metric extends BaseObject {
  constructor(metric = {}) {
    super();
    Object.keys(deviceGroup).forEach((key) => this[key] = deviceGroup[key]);
    this.stats = new MetricStatSet(metric.stats);
  }
};
