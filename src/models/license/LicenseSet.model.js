// LicenseSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const License = require('./License.model');

module.exports = class LicenseSet extends BaseObjectSet {
  constructor(licenses = []) {
    super(Array.from(licenses).map((license) => new License(license)));
  }
};
