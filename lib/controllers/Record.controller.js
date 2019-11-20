'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Record.controller.js

var Database = require('nedb');
var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var RecordSet = require('../models/record/RecordSet.model');
var RecordSearch = require('../models/record/RecordSearch.model');

var _require = require('../constants/Global.constants'),
    Config = _require.Config,
    Icons = _require.Icons;

var Utils = require('../utils/BaseUtil.util.js');

module.exports = function (_BaseCtrl) {
  _inherits(RecordCtrl, _BaseCtrl);

  function RecordCtrl() {
    _classCallCheck(this, RecordCtrl);

    return _possibleConstructorReturn(this, (RecordCtrl.__proto__ || Object.getPrototypeOf(RecordCtrl)).apply(this, arguments));
  }

  _createClass(RecordCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(cursor, contextTtl) {
      return this.appliance.getRecordsCursor(cursor, contextTtl);
    }
  }, {
    key: 'search',
    value: function search(searchFilter) {
      return this.appliance.postRecordsSearch(searchFilter);
    }
  }, {
    key: 'searchInit',
    value: function searchInit() {
      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return Object.assign(search, this.postRecordsSearch(search).data, { id: Utils.generateId() });
    }
  }, {
    key: 'searchNext',
    value: function searchNext(cursor, contextTtl) {
      return (this.postRecordsCursor(cursor, contextTtl).data || { records: [] }).records;
    }
  }, {
    key: 'store',
    value: function store(searchFilter) {
      return this.storeSearch(searchFilter);
    }

    // -------------------------------------
    // Save Functions
    // -------------------------------------

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
          var records = new (Function.prototype.bind.apply(RecordSet, [null].concat(_toConsumableArray(results))))();
          console.log(records.slice(0, 1));
          records.writeToCSV('records-' + search.id + '.csv');
          console.info(Icons.Success + ' Saved ' + results.length + ' records to CSV: records-' + search.id + '.csv');
        }
      });
    }

    // -------------------------------------
    // Search Functions
    // -------------------------------------

  }, {
    key: 'storeSearch',
    value: function storeSearch() {
      var _this2 = this;

      var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var search = this.searchInit(new RecordSearch(this.parseSearchFilter(searchFilter)));
      var db = new Database({ filename: Config.DB_DIR + '/records-' + search.id + '.db', autoload: true });

      this.printSearchInfo(search);

      var numPages = this.getPageCount(search);
      var records = search.records,
          pageAt = 0,
          count = 0;

      while (records && records.length > 0) {
        records = records.map(function (record) {
          return _this2.parse(record, '_source');
        });
        db.insert(records);

        console.info('[' + ++pageAt + '/' + numPages + '] Processed ' + (count += records.length) + ' results, awaiting next page...');
        records = this.searchNext(search.cursor, search.context_ttl);
      }

      if (count === search.total) {
        console.info('\n' + Icons.Success + ' Committed ' + count + '/' + search.total + ' results to DB: records-' + search.id + '.db');
      } else {
        console.info('\n' + Icons.Warn + ' Committed ' + count + '/' + search.total + ' records to DB: records-' + search.id + '.db');
      }

      return Object.assign(search, { db: db, records: records });
    }

    // -------------------------------------
    // Utility Functions
    // -------------------------------------

  }, {
    key: 'parseSearchFilter',
    value: function parseSearchFilter() {
      var _this3 = this;

      var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!searchFilter.filter.rules) {
        return searchFilter;
      }

      searchFilter.filter.rules.forEach(function (rule) {
        if (!['server', 'client', 'device'].includes(rule.field)) {
          return;
        }

        var deviceName = rule.value || rule.operand;

        if (deviceName.startsWith('*')) {
          var devices = _this3.appliance.devices().getByName(deviceName.replace('*', ''));

          if (devices.length > 0) {
            console.log('Substituting discovery id for name:', rule.value, '=>', devices[0].discovery_id);
            rule.operand = { type: 'device', value: devices[0].discovery_id };
            delete rule.value;
          }
        }
      });

      console.log(JSON.stringify(searchFilter, null, 2));
      return searchFilter;
    }
  }, {
    key: 'printSearchInfo',
    value: function printSearchInfo() {
      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      console.info('------------------------------ SEARCH INFO ------------------------------------');
      console.info('- Search ID (local): ' + search.id);
      console.info('- Search timestamp: ' + Utils.parseId(search.id));
      console.info('- Search types: ' + (search.types || 'any'));
      console.info('- Search limit: ' + search.limit);
      console.info('- Search results: ' + search.total);
      console.info('- Search from: ' + new Date(search.from));
      console.info('- Search until: ' + new Date(search.until));
      console.info('-------------------------------------------------------------------------------\n');
    }
  }, {
    key: 'getPageCount',
    value: function getPageCount(search) {
      var _search$total = search.total,
          total = _search$total === undefined ? 0 : _search$total,
          _search$limit = search.limit,
          limit = _search$limit === undefined ? 0 : _search$limit;

      return total % limit === 0 ? total / limit : Math.floor(total / limit) + 1;
    }

    // -------------------------------------
    // API Functions
    // -------------------------------------

  }, {
    key: 'getRecordsCursor',
    value: function getRecordsCursor(cursor, contextTtl) {
      return this.appliance.getRecordsCursor(cursor, contextTtl);
    }
  }, {
    key: 'postRecordsCursor',
    value: function postRecordsCursor(cursor, contextTtl) {
      return this.appliance.postRecordsCursor({ cursor: cursor }, contextTtl);
    }
  }, {
    key: 'postRecordsSearch',
    value: function postRecordsSearch(search) {
      return this.appliance.postRecordsSearch(search);
    }
  }]);

  return RecordCtrl;
}(BaseCtrl);
//# sourceMappingURL=Record.controller.js.map