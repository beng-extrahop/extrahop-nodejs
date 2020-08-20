// CustomDevice.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class CustomDevice extends BaseObject {
  constructor(customDevice = {}) {
    super();
    Object.keys(customDevice).forEach((key) => this[key] = customDevice[key]);
  }
};
