'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// EnvironmentSet.model.js

var BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
var Environment = require('../../models/_app/Environment.model');

module.exports = function (_BaseObjectSet) {
  _inherits(EnvironmentSet, _BaseObjectSet);

  function EnvironmentSet() {
    var _ref;

    _classCallCheck(this, EnvironmentSet);

    for (var _len = arguments.length, environments = Array(_len), _key = 0; _key < _len; _key++) {
      environments[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = EnvironmentSet.__proto__ || Object.getPrototypeOf(EnvironmentSet)).call.apply(_ref, [this].concat(_toConsumableArray(environments.map(function (environment) {
      return new Environment(environment);
    })))));
  }

  _createClass(EnvironmentSet, [{
    key: 'getEnvironment',
    value: function getEnvironment(name) {
      return this.find(function (environment) {
        return environment.name === name;
      });
    }
  }]);

  return EnvironmentSet;
}(BaseObjectSet);
//# sourceMappingURL=EnvironmentSet.model.js.map