// Bundle.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Bundle = require('../models/bundle/Bundle.model');
const BundleSet = require('../models/bundle/BundleSet.model');

const OBJECT_NAME = 'bundle';

module.exports = class BundleCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(bundle) {
    return bundle ? new Bundle(this.getBundle(bundle)) : new BundleSet(this.getBundles());
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
  // Base
  // -------------------------------------

  getBundles() {
    return this.process(this.appliance.getBundles(), OBJECT_NAME);
  }

  getBundle(bundle) {
    return this.process(this.appliance.getBundle(bundle.id), OBJECT_NAME);
  }

  postBundle(bundle) {
    return this.process(this.appliance.postBundle(bundle), OBJECT_NAME);
  }

  deleteBundle(id) {
    return this.process(this.appliance.deleteBundle(id), OBJECT_NAME);
  }

  postBundleApply(bundle) {
    return this.process(this.appliance.postBundleApply(bundle.id), `${OBJECT_NAME} apply`);
  }
};
