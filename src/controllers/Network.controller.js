// Network.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Network = require('../models/network/Network.model');
const NetworkSet = require('../models/network/NetworkSet.model');

module.exports = class NetworkCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(network) {
    return network
      ? new Network(this.getNetwork(network))
      : new NetworkSet(this.getNetworks());
  }

  update(network, data) {
    return this.patchNetwork(network, data);
  }

  getAlerts(network) {
    return this.getNetworkAlerts(network);
  }

  addAlerts(network, data) {
    return this.patchNetworkAlerts(network, data);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getNetworks() {
    return this.process(this.appliance.getNetworks(), 'networks');
  }

  getNetwork(network) {
    return this.process(this.appliance.getNetwork(network.id), 'network');
  }

  patchNetwork(network, data) {
    return this.process(this.appliance.patchNetwork(network, data), 'network');
  }

  getNetworkAlerts(network) {
    return this.process(this.appliance.getNetworkAlerts(network.id), 'network alerts');
  }

  postNetworkAlerts(network, data) {
    return this.process(this.appliance.postNetworkAlerts(network, data), 'network alerts');
  }

  getNetworkVlans(network) {
    return this.process(this.appliance.getNetworkVlans(network.id), 'network VLANs');
  }
};
