// MetricSearchSpecs.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const MetricSearchSpec = require('../../models/metric/MetricSearchSpec.model');

module.exports = class MetricSearchSpecSet extends BaseObjectSet {
  constructor(metricSearchSpecs = []) {
    super();
    super(metricSearchSpecs);
    metricSearchSpecs.forEach(metricSearchSpec => this.push(new MetricSearchSpec(metricSearchSpec)));
  }
};
