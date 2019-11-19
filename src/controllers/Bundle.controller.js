// Bundle.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Bundle = require('../models/bundle/Bundle.model');
const BundleSet = require('../models/bundle/BundleSet.model');

module.exports = class BundleCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(bundle) {
    return bundle ? new Bundle(this.getBundle(bundle)) : new BundleSet(...this.getBundles());
  }

  create(data) {
    return this.postBundle(this.build(data));
  }

  update(bundle, data) {
    return this.patchBundle(bundle, data);
  }

  delete(bundle) {
    return this.deleteBundle(bundle);
  }

  apply(bundle) {
    return this.postBundleApply(bundle);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getBundles() {
    return this.process(this.appliance.getBundles(), 'bundles');
  }

  getBundle(bundle) {
    return this.process(this.appliance.getBundle(bundle.id), 'bundle');
  }

  postBundle(bundle) {
    return this.process(this.appliance.postBundle(bundle), 'bundle');
  }

  deleteBundle(id) {
    return this.process(this.appliance.deleteBundle(id), 'bundle');
  }

  // -------------------------------------
  // Apply Functions
  // -------------------------------------

  postBundleApply(bundle) {
    return this.process(this.appliance.postBundleApply(bundle.id), 'bundle apply');
  }
};
