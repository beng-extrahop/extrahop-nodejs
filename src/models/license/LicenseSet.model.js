// LicenseSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const License = require('./License.model');

module.exports = class LicenseSet extends BaseObjectSet {
  constructor(licenses = []) {
    super();
    licenses.forEach((license) => this.push(new License(license)));
  }

  writeToCSV({ filename = `licenses-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
