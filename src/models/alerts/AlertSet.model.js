// AlertSet.model.js

const BaseObjectSet = require('../../models/base/BaseObjectSet.model');
const Alert = require('../../models/customDevices/Alert.model');

module.exports = class AlertSet extends BaseObjectSet {
  constructor(alerts = []) {
    super();
    alerts.forEach(alert => this.push(new Alert(alert)));
  }
}
