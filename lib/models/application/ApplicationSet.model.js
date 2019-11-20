'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ApplicationSet.model.js

var BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
var Application = require('../../models/application/Application.model');

module.exports = function (_BaseObjectSet) {
  _inherits(ApplicationSet, _BaseObjectSet);

  function ApplicationSet() {
    var _ref;

    _classCallCheck(this, ApplicationSet);

    for (var _len = arguments.length, applications = Array(_len), _key = 0; _key < _len; _key++) {
      applications[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = ApplicationSet.__proto__ || Object.getPrototypeOf(ApplicationSet)).call.apply(_ref, [this].concat(_toConsumableArray(applications.map(function (application) {
      return new Application(application);
    })))));
  }

  _createClass(ApplicationSet, [{
    key: 'writeToCSV',
    value: function writeToCSV(_ref2) {
      var _ref2$filename = _ref2.filename,
          filename = _ref2$filename === undefined ? 'applications-' + this.generateId() + '.csv' : _ref2$filename,
          subkey = _ref2.subkey;

      _get(ApplicationSet.prototype.__proto__ || Object.getPrototypeOf(ApplicationSet.prototype), 'writeToCSV', this).call(this, { filename: filename, subkey: subkey });
    }
  }]);

  return ApplicationSet;
}(BaseObjectSet);
//# sourceMappingURL=ApplicationSet.model.js.map