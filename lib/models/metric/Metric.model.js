'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Metric.model.js

var BaseObject = require('../../models/_base/BaseObject.model');
var MetricStatSet = require('../../models/metric/MetricStatSet.model');

module.exports = function (_BaseObject) {
  _inherits(Metric, _BaseObject);

  function Metric() {
    var metric = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Metric);

    var _this = _possibleConstructorReturn(this, (Metric.__proto__ || Object.getPrototypeOf(Metric)).call(this, metric));

    _this.stats = new MetricStatSet(metric.stats);
    _this.cycle = metric.cycle;
    _this.node_id = metric.node_id;
    _this.clock = metric.clock;
    _this.from = metric.from;
    _this.until = metric.until;
    return _this;
  }

  return Metric;
}(BaseObject);
//# sourceMappingURL=Metric.model.js.map