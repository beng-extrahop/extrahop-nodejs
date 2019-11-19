// Network.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Network extends BaseObject {
  constructor(network = {}) {
    super(network);
    /* TODO */
    Object.keys(network).forEach(key => (this[key] = network[key]));
  }
};
