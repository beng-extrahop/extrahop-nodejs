// ExclusionInterval.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class ExclusionInterval extends BaseObject {
  constructor(exclusionInterval = {}) {
    super(exclusionInterval);
    /* TODO */
    Object.keys(exclusionInterval).forEach(key => this[key] = exclusionInterval[key]);
  }
}
