// Metric.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const MetricSet = require('../models/metric/MetricSet.model');
const MetricSearch = require('../models/metric/MetricSearch.model');
const Utils = require('../utils/BaseUtil.util.js');
const { Config, Icons } = require('../constants/Global.constants');

const Database = require('nedb');

module.exports = class MetricCtrl extends BaseCtrl {
  constructor(appliance = {}) {
    super(appliance);
  }

  // -------------------------------------
  // Save Functions
  // -------------------------------------

  saveToCSV(search = {}) {
    let offset = 0, limit = 10000;

    search.db.find({}).exec(function (err, results) {
      if ( err ) {
        console.error(`${Icons.Error} ${err}`);
      }
      else if ( results.length == 0 ) {
        console.warn(`${Icons.Warn} No results found in database.`);
      }
      else {
        (new MetricSet(results)).writeToCSV({ filename: `metrics-${search.id}.csv` });
        console.info(`${Icons.Success} Saved ${results.length} metrics to CSV: metrics-${search.id}.csv`);
      }
    });
  }

  // -------------------------------------
  // Search Functions
  // -------------------------------------

  search(params = {}) {
    const search = this.searchInit(new MetricSearch(params));
    const db = new Database({ filename: `${Config.DB_DIR}/metrics-${search.id}.db`, autoload: true });

    this.printSearchInfo(search);

    let metrics = search.metrics;
    let count = 0, pageAt = 0, numPages = this.getPageCount(search.total, search.limit);

    while ( metrics && metrics.length > 0 ) {
      // metrics = metrics.map(metric => this.parse(metric, '_source'));
      db.insert(metrics);

      console.info(`[${++pageAt}/${numPages}] Processed ${(count += metrics.length)} results, awaiting next page...`);
      metrics = this.searchNext(search.xid);
    }

    if ( count == search.total ) {
      console.info(`\n${Icons.Success} Committed ${count}/${search.total} results to DB: metrics-${search.id}.db`);
    } else {
      console.info(`\n${Icons.Warn} Committed ${count}/${search.total} metrics to DB: metrics-${search.id}.db`);
    }

    return Object.assign(search, { db, metrics });
  }

  searchInit(search = {}) {
    const searchId = Utils.generateId();
    const getMetrics = this.postMetricsSearch(search);

    return Object.assign(search, getMetrics, { id: searchId })
  }

  searchNext(xid) {
    const getMetrics = this.getNextMetrics(xid);

    return getMetrics.data ? getMetrics.data.stats : [];
  }

  // -------------------------------------
  // Utility Functions
  // -------------------------------------

  printSearchInfo(search = {}) {
    console.info(`-------------------------- METRIC SEARCH INFO --------------------------------`);
    console.info(`- Search ID (local): ${search.id}`);
    console.info(`- Search timestamp: ${search.clock}`);
    console.info(`- Search types: ${search.metric_category || 'any'}`);
    console.info(`- Search results: ${search.stats.length}`);
    console.info(`- Search from: ${new Date(search.from)}`);
    console.info(`- Search until: ${new Date(search.until)}`);
    console.info(`-------------------------------------------------------------------------------\n`);
  }

  getPageCount(total = 1, limit = 1) {
    return (total % limit) == 0 ? total / limit : Math.floor(total / limit) + 1;
  }

  // -------------------------------------
  // API Functions
  // -------------------------------------

  postMetricsSearch(search) {
    return this.process(this.appliance.postMetrics(search), 'metrics');
  }

  getNextMetrics(searchXid) {
    return this.process(this.appliance.getNextMetrics(searchXid), 'metrics');
  }

  postMetricsTotalSearch(search) {
    return this.process(this.appliance.postMetricsTotal(search), 'metrics');
  }

  postMetricsTotalByObjectSearch(search) {
    return this.process(this.appliance.postMetricsTotalByObject(search), 'metrics');
  }
}
