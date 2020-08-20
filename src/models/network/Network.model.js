// Network.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Network extends BaseObject {
  constructor(network = {}) {
    super();
    Object.keys(network).forEach((key) => this[key] = network[key]);
  }
};
