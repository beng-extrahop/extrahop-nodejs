// ApplianceConnection.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class ApplianceConnection extends BaseObject {
  constructor(applianceConnection = {}) {
    super(applianceConnection);
    /* TODO */
    Object.keys(applianceConnection).forEach(key => this[key] = applianceConnection[key]);
  }
}
