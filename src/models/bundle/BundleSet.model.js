// BundleSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Bundle = require('./Bundle.model');

module.exports = class BundleSet extends BaseObjectSet {
  constructor(bundles = []) {
    super(Array.from(bundles).map((bundle) => new Bundle(bundle)));
  }
};
