// Search.model.js

const BaseObject = require('../../models/base/BaseObject.model');
const SearchFilter = require('../../models/search/SearchFilter.model');

module.exports = class Search extends BaseObject {
  constructor(search = {}) {
    super(search);
    this.filter = !search.filter || search.filter.custom ? search.filter : new SearchFilter(search.filter);
    this.limit = search.limit;
    this.offset = search.offset;
  }
}
