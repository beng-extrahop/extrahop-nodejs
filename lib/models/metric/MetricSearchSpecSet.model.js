'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// MetricSearchSpecs.model.js

var BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
var MetricSearchSpec = require('../../models/metric/MetricSearchSpec.model');

module.exports = function (_BaseObjectSet) {
  _inherits(MetricSearchSpecSet, _BaseObjectSet);

  function MetricSearchSpecSet() {
    var metricSearchSpecs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, MetricSearchSpecSet);

    var _this = _possibleConstructorReturn(this, (MetricSearchSpecSet.__proto__ || Object.getPrototypeOf(MetricSearchSpecSet)).call(this, metricSearchSpecs));

    metricSearchSpecs.forEach(function (metricSearchSpec) {
      return _this.push(new MetricSearchSpec(metricSearchSpec));
    });
    return _this;
  }

  return MetricSearchSpecSet;
}(BaseObjectSet);
//# sourceMappingURL=MetricSearchSpecSet.model.js.map