// TagSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Tag = require('./Tag.model');

module.exports = class TagSet extends BaseObjectSet {
  constructor(tags = []) {
    super();
    tags.forEach((tag) => this.push(new Tag(tag)));
  }

  writeToCSV({ filename = `tags-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
