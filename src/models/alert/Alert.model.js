// Alert.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Alert extends BaseObject {
  constructor(alert = {}) {
    super();
    Object.keys(alert).forEach((key) => this[key] = alert[key]);
  }
};
