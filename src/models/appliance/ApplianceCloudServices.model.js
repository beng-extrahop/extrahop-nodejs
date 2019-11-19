// ApplianceCloudServices.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class ApplianceCloudServices extends BaseObject {
  constructor(applianceCloudServices = {}) {
    super(applianceCloudServices);
    /* TODO */
    Object.keys(applianceCloudServices).forEach(key => (this[key] = applianceCloudServices[key]));
  }
};
