'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Search.model.js

var BaseObject = require('../../models/_base/BaseObject.model');
var SearchFilter = require('../../models/_search/SearchFilter.model');

module.exports = function (_BaseObject) {
  _inherits(Search, _BaseObject);

  function Search() {
    var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

    _this.filter = !search.filter || search.filter.custom ? search.filter : new SearchFilter(search.filter);
    _this.limit = search.limit;
    _this.offset = search.offset;
    _this.from = search.from;
    _this.until = search.until;
    return _this;
  }

  return Search;
}(BaseObject);
//# sourceMappingURL=Search.model.js.map