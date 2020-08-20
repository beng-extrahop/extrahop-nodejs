// MetricSearch.model.js

const Search = require('../_search/Search.model');
const MetricSearchSpecSet = require('./MetricSearchSpecSet.model');

module.exports = class MetricSearch extends Search {
  constructor({
    cycle, from, until, metric_category, metric_specs, object_ids, object_type,
  }) {
    super({ from, until });
    this.cycle = cycle;
    this.metric_category = metric_category;
    this.metric_specs = new MetricSearchSpecSet(metric_specs);
    this.object_ids = object_ids;
    this.object_type = object_type;
  }
};
