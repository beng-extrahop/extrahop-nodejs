// NetworkSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Network = require('./Network.model');

module.exports = class NetworkSet extends BaseObjectSet {
  constructor(networks = []) {
    super(Array.from(networks).map((network) => new Network(network)));
  }
};
