// DeviceSearch.model.js

const Search = require('../../models/_search/Search.model');

module.exports = class DeviceSearch extends Search {
  constructor({ filter, limit, offset, active_from, active_until }) {
    super({ filter, limit, offset, active_from, active_until });
  }
}
