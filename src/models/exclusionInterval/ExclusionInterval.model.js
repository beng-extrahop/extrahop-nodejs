// ExclusionInterval.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class ExclusionInterval extends BaseObject {
  constructor(exclusionInterval = {}) {
    super();
    Object.keys(exclusionInterval).forEach((key) => this[key] = exclusionInterval[key]);
  }
};
