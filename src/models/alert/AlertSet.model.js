// AlertSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Alert = require('./Alert.model');

module.exports = class AlertSet extends BaseObjectSet {
  constructor(alerts = []) {
    super(Array.from(alerts).map((alert) => new Alert(alert)));
  }
};
