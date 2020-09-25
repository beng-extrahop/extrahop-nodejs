// Network.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Network = require('../models/network/Network.model');
const NetworkSet = require('../models/network/NetworkSet.model');

const OBJECT_NAME = 'network';

module.exports = class NetworkCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(network) {
    return network ? new Network(this.getNetwork(network)) : new NetworkSet(this.getNetworks());
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
  // Defaults
  // -------------------------------------

  getNetworks() {
    return this.process(this.appliance.getNetworks(), OBJECT_NAME);
  }

  getNetwork(network) {
    return this.process(this.appliance.getNetwork(network.id), OBJECT_NAME);
  }

  patchNetwork(network, data) {
    return this.process(this.appliance.patchNetwork(network, data), OBJECT_NAME);
  }

  getNetworkAlerts(network) {
    return this.process(this.appliance.getNetworkAlerts(network.id), `${OBJECT_NAME} alert`);
  }

  postNetworkAlerts(network, data) {
    return this.process(this.appliance.postNetworkAlerts(network, data), `${OBJECT_NAME} alert`);
  }

  getNetworkVlans(network) {
    return this.process(this.appliance.getNetworkVlans(network.id), `${OBJECT_NAME} VLAN`);
  }
};
