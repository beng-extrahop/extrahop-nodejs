'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ApplianceSet.model.js

var BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
var Appliance = require('../../models/_app/Appliance.model');

module.exports = function (_BaseObjectSet) {
  _inherits(ApplianceSet, _BaseObjectSet);

  function ApplianceSet() {
    var _ref;

    _classCallCheck(this, ApplianceSet);

    for (var _len = arguments.length, appliances = Array(_len), _key = 0; _key < _len; _key++) {
      appliances[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = ApplianceSet.__proto__ || Object.getPrototypeOf(ApplianceSet)).call.apply(_ref, [this].concat(_toConsumableArray(appliances.map(function (appliance) {
      return new Appliance(appliance);
    })))));
  }

  return ApplianceSet;
}(BaseObjectSet);
//# sourceMappingURL=ApplianceSet.model.js.map