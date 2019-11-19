// Metric.controller.js

const Database = require('nedb');
const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const MetricSet = require('../models/metric/MetricSet.model');
const MetricSearch = require('../models/metric/MetricSearch.model');
const Utils = require('../utils/BaseUtil.util.js');
const { Config, Icons } = require('../constants/Global.constants');

module.exports = class MetricCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(search) {
    return new MetricSet(...this.postMetrics(search));
  }

  getNext(search) {
    return new MetricSet(...this.postMetrics(search));
  }

  total(search) {
    return this.postMetricsTotal(search);
  }

  totalByObject(search) {
    return this.postMetricsTotalByObject(search);
  }

  // -------------------------------------
  // Search Functions
  // -------------------------------------

  search(params = {}) {
    const search = this.searchInit(new MetricSearch(params));
    const db = new Database({
      filename: `${Config.DB_DIR}/metrics-${search.id}.db`,
      autoload: true
    });

    this.printSearchInfo(search);

    let { metrics } = search;
    let count = 0;
    let pageAt = 0;
    const numPages = this.getPageCount(search.total, search.limit);

    while (metrics && metrics.length > 0) {
      // metrics = metrics.map(metric => this.parse(metric, '_source'));
      db.insert(metrics);

      console.info(
        `[${++pageAt}/${numPages}] Processed ${(count += metrics.length)} results, awaiting next page...`
      );
      metrics = this.searchNext(search);
    }

    if (count == search.total) {
      console.info(
        `\n${Icons.Success} Committed ${count}/${search.total} results to DB: metrics-${search.id}.db`
      );
    } else {
      console.info(`\n${Icons.Warn} Committed ${count}/${search.total} metrics to DB: metrics-${search.id}.db`);
    }

    return Object.assign(search, { db, metrics });
  }

  searchInit(search) {
    const searchId = Utils.generateId();
    const getMetrics = this.get(search);

    return Object.assign(search, getMetrics, { id: searchId, total: getMetrics.stats.length });
  }

  searchNext(search) {
    const getMetrics = this.getNext(search);

    return getMetrics.data ? getMetrics.data.stats : [];
  }

  // -------------------------------------
  // API Functions
  // -------------------------------------

  postMetrics(search) {
    return this.process(this.appliance.postMetrics(search), 'metrics');
  }

  getMetricsNext(search) {
    return this.process(this.appliance.getNextMetrics(search.xid), 'metrics');
  }

  postMetricsTotal(search) {
    return this.process(this.appliance.postMetricsTotal(search), 'metrics');
  }

  postMetricsTotalByObject(search) {
    return this.process(this.appliance.postMetricsTotalByObject(search), 'metrics');
  }

  // -------------------------------------
  // Utility Functions
  // -------------------------------------

  getPageCount(total = 1, limit = 1) {
    return total % limit == 0 ? total / limit : Math.floor(total / limit) + 1;
  }

  printSearchInfo(search = {}) {
    console.info(`-------------------------- METRIC SEARCH INFO --------------------------------`);
    console.info(`- Search ID (local): ${search.id}`);
    console.info(`- Search timestamp: ${search.clock}`);
    console.info(`- Search types: ${search.metric_category || 'any'}`);
    console.info(`- Search results: ${search.total}`);
    console.info(`- Search from: ${new Date(search.from)}`);
    console.info(`- Search until: ${new Date(search.until)}`);
    console.info(`-------------------------------------------------------------------------------\n`);
  }

  saveToCSV(search = {}) {
    search.db.find({}).exec(function(err, results) {
      if (err) {
        console.error(`${Icons.Error} ${err}`);
      } else if (results.length == 0) {
        console.warn(`${Icons.Warn} No results found in database.`);
      } else {
        new MetricSet(results).writeToCSV({ filename: `metrics-${search.id}.csv` });
        console.info(`${Icons.Success} Saved ${results.length} metrics to CSV: metrics-${search.id}.csv`);
      }
    });
  }
};
