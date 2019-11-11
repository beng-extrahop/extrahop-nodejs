// Search.model.js

const SearchFilter = require('../../models/_search/SearchFilter.model');

module.exports = class Search {
  constructor(search = {}) {
    this.filter = !search.filter || search.filter.custom ? search.filter : new SearchFilter(search.filter);
    this.limit = search.limit;
    this.offset = search.offset;
  }
}
