// Search.model.js

const BaseObject = require('../_base/BaseObject.model');
const SearchFilter = require('./SearchFilter.model');

module.exports = class Search extends BaseObject {
  constructor(search = {}) {
    super();
    this.filter = !search.filter || search.filter.custom ? search.filter : new SearchFilter(search.filter);
    this.limit = search.limit;
    this.offset = search.offset;
    this.from = search.from;
    this.until = search.until;
  }
};
