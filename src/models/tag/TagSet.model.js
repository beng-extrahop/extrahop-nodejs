// TagSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Tag = require('../../models/tag/Tag.model');

module.exports = class TagSet extends BaseObjectSet {
  constructor(tags = []) {
    super(tags);
    tags.forEach(tag => this.push(new Tag(tag)));
  }

  writeToCSV({ filename = `tags-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}
