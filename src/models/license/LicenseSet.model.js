// LicenseSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const License = require('../../models/license/License.model');

module.exports = class LicenseSet extends BaseObjectSet {
  constructor(licenses = []) {
    super(licenses);
    licenses.forEach(license => this.push(new License(license)));
  }

  writeToCSV({ filename = `licenses-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}
