// RecordSearch.model.js

const Search = require('../_search/Search.model');

module.exports = class RecordSearch extends Search {
  constructor({
    types, limit = 1000, from, until, filter, offset, sort, context_ttl = 300000,
  }) {
    super({
      filter, limit, offset, from, until,
    });
    this.types = types;
    this.sort = sort;
    this.context_ttl = context_ttl;
  }
};
