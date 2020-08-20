// MetricSearchSpecs.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const MetricSearchSpec = require('./MetricSearchSpec.model');

module.exports = class MetricSearchSpecSet extends BaseObjectSet {
  constructor(metricSearchSpecs = []) {
    super();
    super(metricSearchSpecs);
    metricSearchSpecs.forEach((metricSearchSpec) => this.push(new MetricSearchSpec(metricSearchSpec)));
  }
};
