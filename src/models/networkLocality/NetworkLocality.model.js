// NetworkLocality.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class NetworkLocality extends BaseObject {
  constructor(networkLocality = {}) {
    super();
    Object.keys(networkLocality).forEach((key) => this[key] = networkLocality[key]);
  }
};
