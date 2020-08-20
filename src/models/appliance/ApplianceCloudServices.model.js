// ApplianceCloudServices.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class ApplianceCloudServices extends BaseObject {
  constructor(applianceCloudServices = {}) {
    super();
    Object.keys(applianceCloudServices).forEach((key) => this[key] = applianceCloudServices[key]);
  }
};
