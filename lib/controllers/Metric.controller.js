'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Metric.controller.js

var Database = require('nedb');
var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var MetricSet = require('../models/metric/MetricSet.model');
var MetricSearch = require('../models/metric/MetricSearch.model');
var Utils = require('../utils/BaseUtil.util.js');

var _require = require('../constants/Global.constants'),
    Config = _require.Config,
    Icons = _require.Icons;

module.exports = function (_BaseCtrl) {
  _inherits(MetricCtrl, _BaseCtrl);

  function MetricCtrl() {
    _classCallCheck(this, MetricCtrl);

    return _possibleConstructorReturn(this, (MetricCtrl.__proto__ || Object.getPrototypeOf(MetricCtrl)).apply(this, arguments));
  }

  _createClass(MetricCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(search) {
      return new (Function.prototype.bind.apply(MetricSet, [null].concat(_toConsumableArray(this.postMetrics(search)))))();
    }
  }, {
    key: 'getNext',
    value: function getNext(search) {
      return new (Function.prototype.bind.apply(MetricSet, [null].concat(_toConsumableArray(this.postMetrics(search)))))();
    }
  }, {
    key: 'total',
    value: function total(search) {
      return this.postMetricsTotal(search);
    }
  }, {
    key: 'totalByObject',
    value: function totalByObject(search) {
      return this.postMetricsTotalByObject(search);
    }

    // -------------------------------------
    // Search Functions
    // -------------------------------------

  }, {
    key: 'search',
    value: function search() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var search = this.searchInit(new MetricSearch(params));
      var db = new Database({
        filename: Config.DB_DIR + '/metrics-' + search.id + '.db',
        autoload: true
      });

      this.printSearchInfo(search);

      var metrics = search.metrics;

      var count = 0;
      var pageAt = 0;
      var numPages = this.getPageCount(search.total, search.limit);

      while (metrics && metrics.length > 0) {

        // metrics = metrics.map(metric => this.parse(metric, '_source'));
        db.insert(metrics);

        console.info('[' + ++pageAt + '/' + numPages + '] Processed ' + (count += metrics.length) + ' results, awaiting next page...');
        metrics = this.searchNext(search);
      }

      if (count === search.total) {
        console.info('\n' + Icons.Success + ' Committed ' + count + '/' + search.total + ' results to DB: metrics-' + search.id + '.db');
      } else {
        console.info('\n' + Icons.Warn + ' Committed ' + count + '/' + search.total + ' metrics to DB: metrics-' + search.id + '.db');
      }

      return Object.assign(search, { db: db, metrics: metrics });
    }
  }, {
    key: 'searchInit',
    value: function searchInit(search) {
      var searchId = Utils.generateId();
      var getMetrics = this.get(search);

      return Object.assign(search, getMetrics, { id: searchId, total: getMetrics.stats.length });
    }
  }, {
    key: 'searchNext',
    value: function searchNext(search) {
      var getMetrics = this.getNext(search);

      return getMetrics.data ? getMetrics.data.stats : [];
    }

    // -------------------------------------
    // API Functions
    // -------------------------------------

  }, {
    key: 'postMetrics',
    value: function postMetrics(search) {
      return this.process(this.appliance.postMetrics(search), 'metrics');
    }
  }, {
    key: 'getMetricsNext',
    value: function getMetricsNext(search) {
      return this.process(this.appliance.getNextMetrics(search.xid), 'metrics');
    }
  }, {
    key: 'postMetricsTotal',
    value: function postMetricsTotal(search) {
      return this.process(this.appliance.postMetricsTotal(search), 'metrics');
    }
  }, {
    key: 'postMetricsTotalByObject',
    value: function postMetricsTotalByObject(search) {
      return this.process(this.appliance.postMetricsTotalByObject(search), 'metrics');
    }

    // -------------------------------------
    // Utility Functions
    // -------------------------------------

  }, {
    key: 'getPageCount',
    value: function getPageCount() {
      var total = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      return total % limit === 0 ? total / limit : Math.floor(total / limit) + 1;
    }
  }, {
    key: 'printSearchInfo',
    value: function printSearchInfo() {
      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      console.info('-------------------------- METRIC SEARCH INFO --------------------------------');
      console.info('- Search ID (local): ' + search.id);
      console.info('- Search timestamp: ' + search.clock);
      console.info('- Search types: ' + (search.metric_category || 'any'));
      console.info('- Search results: ' + search.total);
      console.info('- Search from: ' + new Date(search.from));
      console.info('- Search until: ' + new Date(search.until));
      console.info('-------------------------------------------------------------------------------\n');
    }
  }, {
    key: 'saveToCSV',
    value: function saveToCSV() {
      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      search.db.find({}).exec(function (err, results) {
        if (err) {
          console.error(Icons.Error + ' ' + err);
        } else if (results.length === 0) {
          console.warn(Icons.Warn + ' No results found in database.');
        } else {
          new MetricSet(results).writeToCSV({ filename: 'metrics-' + search.id + '.csv' });
          console.info(Icons.Success + ' Saved ' + results.length + ' metrics to CSV: metrics-' + search.id + '.csv');
        }
      });
    }
  }]);

  return MetricCtrl;
}(BaseCtrl);
//# sourceMappingURL=Metric.controller.js.map