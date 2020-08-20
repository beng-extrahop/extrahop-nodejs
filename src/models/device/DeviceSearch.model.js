// DeviceSearch.model.js

const Search = require('../_search/Search.model');

module.exports = class DeviceSearch extends Search {
  constructor({
    filter, limit, offset, active_from, active_until,
  }) {
    super({ filter, limit, offset });
    this.active_from = active_from;
    this.active_until = active_until;
  }
};
