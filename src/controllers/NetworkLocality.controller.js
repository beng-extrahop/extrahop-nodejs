// NetworkLocality.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const NetworkLocality = require('../models/networkLocality/NetworkLocality.model');
const NetworkLocalitySet = require('../models/networkLocality/NetworkLocalitySet.model');

module.exports = class NetworkLocalityCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(networkLocality) {
    return networkLocality ? new NetworkLocality(this.getNetworkLocality(networkLocality)) : new NetworkLocalitySet(this.getNetworkLocalities());
  }

  create(data) {
    return this.postNetworkLocality(this.build(data));
  }

  update(networkLocality, data) {
    return this.patchNetworkLocality(networkLocality, data);
  }

  delete(networkLocality) {
    return this.deleteNetworkLocality(networkLocality);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getNetworkLocalities() {
    return this.process(this.appliance.getNetworkLocalities(), 'network localities');
  }

  getNetworkLocality(networkLocality) {
    return this.process(this.appliance.getNetworkLocality(networkLocality.id), 'network locality');
  }

  postNetworkLocality(networkLocality) {
    return this.process(this.appliance.postNetworkLocality(networkLocality), 'network locality');
  }

  deleteNetworkLocality(id) {
    return this.process(this.appliance.deleteNetworkLocality(id), 'network locality');
  }
};
