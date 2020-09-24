// TagSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Tag = require('./Tag.model');

module.exports = class TagSet extends BaseObjectSet {
  constructor(tags = []) {
    super(Array.from(tags).map((tag) => new Tag(tag)));
  }
};
