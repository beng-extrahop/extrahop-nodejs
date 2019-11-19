// NetworkSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Network = require('../../models/network/Network.model');

module.exports = class NetworkSet extends BaseObjectSet {
  constructor(...networks) {
    super(...networks.map(network => new Network(network)));
  }

  writeToCSV({ filename = `networks-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
