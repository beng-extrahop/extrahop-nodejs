// Tag.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Tag extends BaseObject {
  constructor(tag = {}) {
    super();
    Object.keys(tag).forEach((key) => this[key] = tag[key]);
  }
};
