// Tag.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Tag extends BaseObject {
  constructor(tag = {}) {
    super(tag);
    this.id = tag.id;
    this.name = tag.name;
    this.mod_time = tag.mod_time;
  }
};
