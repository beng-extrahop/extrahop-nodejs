// ApplianceConnection.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class ApplianceConnection extends BaseObject {
  constructor(applianceConnection = {}) {
    super();
    Object.keys(applianceConnection).forEach((key) => this[key] = applianceConnection[key]);
  }
};
