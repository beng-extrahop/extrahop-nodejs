'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// BaseObject.model.js

var _require = require('../../constants/Global.constants'),
    Config = _require.Config;

var _require2 = require('json2csv'),
    parse = _require2.parse;

var fastCSV = require('fast-csv');
var fs = require('fs');

module.exports = function () {
  function BaseObject() {
    _classCallCheck(this, BaseObject);
  }

  _createClass(BaseObject, [{
    key: 'toString',
    value: function toString() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$format = _ref.format,
          format = _ref$format === undefined ? true : _ref$format;

      return JSON.stringify(this, null, format ? 2 : null);
    }
  }, {
    key: 'print',
    value: function print() {
      console.info(this.toString());
    }
  }, {
    key: 'toCSV',
    value: function toCSV() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$header = _ref2.header,
          header = _ref2$header === undefined ? true : _ref2$header,
          subkey = _ref2.subkey;

      var data = subkey ? this[subkey] : this;
      var fields = Object.keys(data);

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
    value: function writeToCSV(_ref3) {
      var filename = _ref3.filename,
          subkey = _ref3.subkey;

      var stream = fs.createWriteStream(Config.CSV_DIR + '/' + filename, { encoding: 'utf8' });
      var data = subkey ? this[subkey] : this;

      fastCSV.writeToStream(stream, data, { headers: true }).on('error', function (err) {
        return console.error(err);
      });

      // fastCSV.write([this[subkey] || this], { headers }).pipe(fs.createWriteStream(filename));
    }
  }]);

  return BaseObject;
}();
//# sourceMappingURL=BaseObject.model.js.map