// NetworkSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Network = require('./Network.model');

module.exports = class NetworkSet extends BaseObjectSet {
  constructor(networks = []) {
    super();
    networks.forEach((network) => this.push(new Network(network)));
  }

  writeToCSV({ filename = `networks-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
