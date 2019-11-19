// Search.model.js

const BaseObject = require('../../models/_base/BaseObject.model');
const SearchFilter = require('../../models/_search/SearchFilter.model');

module.exports = class Search extends BaseObject {
  constructor(search = {}) {
    super();
    this.filter = !search.filter || search.filter.custom ? search.filter : new SearchFilter(search.filter);
    this.limit = search.limit;
    this.offset = search.offset;
    this.from = search.from;
    this.until = search.until;
    this.active_from = search.active_from;
    this.active_until = search.active_until;
  }
};
