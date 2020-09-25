// NetworkLocality.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const NetworkLocality = require('../models/networkLocality/NetworkLocality.model');
const NetworkLocalitySet = require('../models/networkLocality/NetworkLocalitySet.model');

const OBJECT_NAME = 'network locality';

module.exports = class NetworkLocalityCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
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
  // Defaults
  // -------------------------------------

  getNetworkLocalities() {
    return this.process(this.appliance.getNetworkLocalities(), OBJECT_NAME);
  }

  getNetworkLocality(networkLocality) {
    return this.process(this.appliance.getNetworkLocality(networkLocality.id), OBJECT_NAME);
  }

  postNetworkLocality(networkLocality) {
    return this.process(this.appliance.postNetworkLocality(networkLocality), OBJECT_NAME);
  }

  deleteNetworkLocality(id) {
    return this.process(this.appliance.deleteNetworkLocality(id), OBJECT_NAME);
  }
};
