// ApplianceProductKey.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class ApplianceProductKey extends BaseObject {
  constructor(applianceProductKey = {}) {
    super(applianceProductKey);
    /* TODO */
    Object.keys(applianceProductKey).forEach(key => this[key] = applianceProductKey[key]);
  }
}
