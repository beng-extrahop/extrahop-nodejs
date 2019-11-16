// MetricSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Metric = require('../../models/metric/Metric.model');

module.exports = class MetricSet extends BaseObjectSet {

  constructor(...metrics) {
    super(...metrics.map(metric => new Metric(metric)));
  }

  writeToCSV(options = {}) {
    const { filename = `devices-${this.generateId()}.csv`, subkey = '_source' } = options;
    super.writeToCSV(filename, subkey);
  }

}
