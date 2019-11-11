// DeviceSearch.model.js

const Search = require('../../models/_search/Search.model');

module.exports = class DeviceSearch extends Search {
  constructor({ filter, limit, offset, activeFrom, activeUntil }) {
    super(filter, limit, offset);
    this.active_from = activeFrom;
    this.active_until = activeUntil;
  }
}
