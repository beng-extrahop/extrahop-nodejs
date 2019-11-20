'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// BaseCtrl.controller.js

var Utils = require('../../utils/BaseUtil.util.js');

var _require = require('../../constants/Global.constants'),
    Config = _require.Config,
    Icons = _require.Icons;

var moment = require('moment-timezone');

module.exports = function () {
  function BaseCtrl(appliance) {
    _classCallCheck(this, BaseCtrl);

    this.appliance = appliance;
    this.utils = Utils;
    this.csvPath = [Config.DATA_DIR, Config.CSV_DIR].join('/');
    this.dbPath = [Config.DATA_DIR, Config.DB_DIR].join('/');
  }

  _createClass(BaseCtrl, [{
    key: 'toString',
    value: function toString() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return JSON.stringify(this, null, config.format ? 2 : null);
    }
  }, {
    key: 'print',
    value: function print() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      console.info(this.toString(options));
    }
  }, {
    key: 'printSuccess',
    value: function printSuccess(method, type, count) {
      if (method === 'GET') {
        console.info(Icons.Success + ' Retrieved ' + count + ' ' + type + ' from ' + this.appliance.host);
      } else if (method === 'POST') {
        console.info(Icons.Success + ' Posted ' + count + ' ' + type + ' to ' + this.appliance.host);
      } else if (method === 'PATCH') {
        console.info(Icons.Info + ' Modified ' + type + ' on ' + this.appliance.host);
      } else if (method === 'PATCH') {
        console.info(Icons.Info + ' Updated ' + type + ' on ' + this.appliance.host);
      } else if (method === 'DELETE') {
        console.info(Icons.Warn + ' Deleted ' + type + ' from ' + this.appliance.host);
      }
    }
  }, {
    key: 'printError',
    value: function printError(method, type, message) {
      if (message) {
        console.info(Icons.Error + ' Error: ' + message + ' to ' + method + ' ' + type);
      } else if (method === 'GET') {
        console.info(Icons.Error + ' Error retrieving ' + type + ' from ' + this.appliance.host);
      } else if (method === 'POST') {
        console.info(Icons.Error + ' Error posting ' + type + ' to ' + this.appliance.host);
      } else if (method === 'PATCH') {
        console.info(Icons.Error + ' Error modifying ' + type + ' on ' + this.appliance.host);
      } else if (method === 'PATCH') {
        console.info(Icons.Error + ' Error updating ' + type + ' on ' + this.appliance.host);
      } else if (method === 'DELETE') {
        console.info(Icons.Error + ' Error deleting ' + type + ' from ' + this.appliance.host);
      }
    }
  }, {
    key: 'printWarning',
    value: function printWarning(method, type) {
      if (method === 'GET') {
        console.info(Icons.Warn + ' Warning: retrieving ' + type + ' from ' + this.appliance.host);
      } else if (method === 'POST') {
        console.info(Icons.Warn + ' Warning: posting ' + type + ' to ' + this.appliance.host);
      } else if (method === 'PATCH') {
        console.info(Icons.Warn + ' Warning: modifying ' + type + ' on ' + this.appliance.host);
      } else if (method === 'PATCH') {
        console.info(Icons.Warn + ' Warning: updating ' + type + ' on ' + this.appliance.host);
      } else if (method === 'DELETE') {
        console.info(Icons.Warn + ' Warning: deleting ' + type + ' from ' + this.appliance.host);
      }
    }

    // -------------------------------------
    // Utility Functions
    // -------------------------------------

  }, {
    key: 'filter',
    value: function filter() {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _Object$keys = Object.keys(params),
          _Object$keys2 = _slicedToArray(_Object$keys, 1),
          key = _Object$keys2[0];

      return results.filter(function (result) {
        return result[key] === params[key];
      });
    }
  }, {
    key: 'parse',
    value: function parse() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var subkey = arguments[1];

      var parseData = data[subkey] || data;

      Object.keys(parseData).forEach(function (key) {
        if (key.includes('timestamp')) {
          parseData[key + '_fmt'] = moment(parseData[key]).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        }

        if (parseData[key] instanceof Object) {
          parseData[key] = parseData[key].value;
        }

        if (parseData[key] instanceof Array) {
          parseData[key] = parseData[key].length === 1 ? parseData[key][0] : parseData[key].join(',');
        }
      });

      // Object.keys(parseData).forEach(key => {
      //   if ( key === 'server' || key === 'client' ) {
      //     const discoveryId = parseData[key];

      //     if ( cache.some(item => item.startsWith(discoveryId)) ) {
      //       parseData[key] = cache.find(item => item.startsWith(discoveryId)).split(':')[1];
      //       console.log('Found server in cache:', discoveryId, parseData[key])
      //       return;
      //     }

      //     const getDevice = this.appliance.getDevices('discovery_id', discoveryId, 1);

      //     if ( getDevice.success ) {
      //       const deviceName = getDevice.data[0].display_name;
      //       console.log('Adding discovery ID to cache:', discoveryId, deviceName)

      //       cache.push(`${discoveryId}:${deviceName}`);
      //       parseData[key] = deviceName;
      //     }
      //   }
      // });

      return Object.assign(data, subkey ? _defineProperty({}, subkey, parseData) : parseData);
    }
  }, {
    key: 'process',
    value: function process() {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = arguments[1];
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (options.suppress) {
        return results.data;
      }

      var data = results.data;
      var method = results.method,
          success = results.success;

      var count = data.length;

      if (['PATCH', 'PUT', 'DELETE'].includes(method)) {
        if (!success) {
          this.printError(method, type);
        } else {
          this.printSuccess(method, type);
        }
      } else if (['GET', 'POST'].includes(method)) {
        if (!success) {
          this.printSuccess(method, type, count);
          return results.data;
        }

        data = options.subkey ? results.data[options.subkey] : results.data;

        if ((data || []).length === 0) {
          this.printWarning(method, type);
        } else {
          this.printSuccess(method, type, count);
        }

        return results.data;
      }

      return null;
    }
  }]);

  return BaseCtrl;
}();
//# sourceMappingURL=BaseCtrl.controller.js.map