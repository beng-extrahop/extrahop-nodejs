'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// RecordSearch.model.js

var Search = require('../../models/_search/Search.model');

module.exports = function (_Search) {
  _inherits(RecordSearch, _Search);

  function RecordSearch(_ref) {
    var types = _ref.types,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 1000 : _ref$limit,
        from = _ref.from,
        until = _ref.until,
        filter = _ref.filter,
        offset = _ref.offset,
        sort = _ref.sort,
        _ref$context_ttl = _ref.context_ttl,
        context_ttl = _ref$context_ttl === undefined ? 300000 : _ref$context_ttl;

    _classCallCheck(this, RecordSearch);

    var _this = _possibleConstructorReturn(this, (RecordSearch.__proto__ || Object.getPrototypeOf(RecordSearch)).call(this, { filter: filter, limit: limit, offset: offset, from: from, until: until }));

    _this.types = types;
    _this.sort = sort;
    _this.context_ttl = context_ttl;
    return _this;
  }

  return RecordSearch;
}(Search);
//# sourceMappingURL=RecordSearch.model.js.map