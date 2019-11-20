'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// MetricSearch.model.js

var Search = require('../../models/_search/Search.model');
var MetricSearchSpecSet = require('../../models/metric/MetricSearchSpecSet.model');

module.exports = function (_Search) {
  _inherits(MetricSearch, _Search);

  function MetricSearch(_ref) {
    var cycle = _ref.cycle,
        from = _ref.from,
        until = _ref.until,
        metric_category = _ref.metric_category,
        metric_specs = _ref.metric_specs,
        object_ids = _ref.object_ids,
        object_type = _ref.object_type;

    _classCallCheck(this, MetricSearch);

    var _this = _possibleConstructorReturn(this, (MetricSearch.__proto__ || Object.getPrototypeOf(MetricSearch)).call(this, { from: from, until: until }));

    _this.cycle = cycle;
    _this.metric_category = metric_category;
    _this.metric_specs = new MetricSearchSpecSet(metric_specs);
    _this.object_ids = object_ids;
    _this.object_type = object_type;
    return _this;
  }

  return MetricSearch;
}(Search);
//# sourceMappingURL=MetricSearch.model.js.map