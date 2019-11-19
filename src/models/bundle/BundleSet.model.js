// BundleSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Bundle = require('../../models/bundle/Bundle.model');

module.exports = class BundleSet extends BaseObjectSet {
  constructor(...bundles) {
    super(...bundles.map(bundle => new Bundle(bundle)));
  }

  writeToCSV({ filename = `bundles-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
