// MetricSearchSpecs.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const MetricSearchSpec = require('./MetricSearchSpec.model');

module.exports = class MetricSearchSpecSet extends BaseObjectSet {
  constructor(metricSearchSpecs = []) {
    super(Array.from(metricSearchSpecs).map((metricSearchSpec) => new MetricSearchSpec(metricSearchSpec)));
  }
};
