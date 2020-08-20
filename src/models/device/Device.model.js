// Device.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Device extends BaseObject {
  constructor(device = {}) {
    super();
    Object.keys(device).forEach((key) => this[key] = device[key]);
  }
};
