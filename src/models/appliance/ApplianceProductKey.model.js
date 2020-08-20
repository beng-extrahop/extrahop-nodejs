// ApplianceProductKey.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class ApplianceProductKey extends BaseObject {
  constructor(applianceProductKey = {}) {
    super();
    Object.keys(applianceProductKey).forEach((key) => this[key] = applianceProductKey[key]);
  }
};
