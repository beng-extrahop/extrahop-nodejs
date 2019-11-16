// MetricStats.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const MetricStat = require('../../models/metric/MetricStat.model');

module.exports = class MetricStatSet extends BaseObjectSet {

  constructor(...metricStats) {
    super(...metricStats.map(metricStat => new MetricStat(metricStat)));
  }

}
