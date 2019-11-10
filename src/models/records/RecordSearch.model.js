// RecordSearch.model.js

const Search = require('../../models/search/Search.model');

module.exports = class RecordSearch extends Search {
  constructor({ types, limit = 1000, from = '-30m', until, filter, offset = 0, sort, contextTtl = 300000 }) {
    super({ filter, limit, offset });
    this.from = from;
    this.until = until;
    this.types = types;
    this.sort = sort;
    this.context_ttl = contextTtl;
  }
}
