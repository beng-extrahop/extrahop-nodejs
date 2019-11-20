'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// RecordSet.model.js

var BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
var Record = require('../../models/record/Record.model');
var fastCSV = require('fast-csv');
var fs = require('fs');

var _require = require('../../constants/Global.constants'),
    Config = _require.Config;

module.exports = function (_Array) {
  _inherits(RecordSet, _Array);

  function RecordSet() {
    var _ref;

    _classCallCheck(this, RecordSet);

    for (var _len = arguments.length, records = Array(_len), _key = 0; _key < _len; _key++) {
      records[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = RecordSet.__proto__ || Object.getPrototypeOf(RecordSet)).call.apply(_ref, [this].concat(_toConsumableArray(records.map(function (record) {
      return new Record(record);
    })))));
  }

  // writeToCSV({ filename = `records-${this.generateId()}.csv`, subkey = '_source' }) {
  //   super.writeToCSV({ filename, subkey, headers: true });
  // }

  _createClass(RecordSet, [{
    key: 'writeToCSV',
    value: function writeToCSV(_ref2) {
      var filename = _ref2.filename,
          subkey = _ref2.subkey,
          headers = _ref2.headers;

      var stream = fs.createWriteStream(Config.CSV_DIR + '/' + filename, { encoding: 'utf8' });
      var data = subkey ? this.map(function (obj) {
        return obj[subkey];
      }) : this;

      fastCSV.writeToStream(stream, data, { headers: headers }).on('error', function (err) {
        return console.error(err);
      });
    }
  }]);

  return RecordSet;
}(Array);
//# sourceMappingURL=RecordSet.model.js.map