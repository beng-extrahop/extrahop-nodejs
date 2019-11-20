'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// BaseObjectSet.model.js

var Utils = require('../../utils/BaseUtil.util.js');

var _require = require('../../constants/Global.constants'),
    Config = _require.Config;

var _require2 = require('json2csv'),
    parse = _require2.parse;

var fastCSV = require('fast-csv');
var fs = require('fs');

module.exports = function (_Array) {
  _inherits(BaseObjectSet, _Array);

  function BaseObjectSet() {
    _classCallCheck(this, BaseObjectSet);

    return _possibleConstructorReturn(this, (BaseObjectSet.__proto__ || Object.getPrototypeOf(BaseObjectSet)).apply(this, arguments));
  }

  _createClass(BaseObjectSet, [{
    key: 'toString',
    value: function toString() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      return JSON.stringify(this, null, format ? 2 : null);
    }
  }, {
    key: 'print',
    value: function print() {
      this.forEach(function (baseObject) {
        return baseObject.print();
      });
    }
  }, {
    key: 'toCSV',
    value: function toCSV(_ref) {
      var _ref$header = _ref.header,
          header = _ref$header === undefined ? true : _ref$header,
          subkey = _ref.subkey;

      var data = subkey ? this.map(function (obj) {
        return obj[subkey];
      }) : this;
      var fields = Object.keys(data[0]);

      return parse(data, { header: header, fields: fields });
    }
  }, {
    key: 'printCSV',
    value: function printCSV() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      console.info(this.toCSV(options));
    }
  }, {
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
  }, {
    key: 'generateId',
    value: function generateId(params) {
      return Utils.generateId(params);
    }
  }]);

  return BaseObjectSet;
}(Array);
//# sourceMappingURL=BaseObjectSet.model.js.map