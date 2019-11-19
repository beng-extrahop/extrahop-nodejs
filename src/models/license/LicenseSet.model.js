// LicenseSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const License = require('../../models/license/License.model');

module.exports = class LicenseSet extends BaseObjectSet {
  constructor(...licenses) {
    super(...licenses.map(license => new License(license)));
  }

  writeToCSV({ filename = `licenses-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
