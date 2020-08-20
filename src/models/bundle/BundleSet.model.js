// BundleSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Bundle = require('./Bundle.model');

module.exports = class BundleSet extends BaseObjectSet {
  constructor(bundles = []) {
    super();
    bundles.forEach((bundle) => this.push(new Bundle(bundle)));
  }

  writeToCSV({ filename = `bundles-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
