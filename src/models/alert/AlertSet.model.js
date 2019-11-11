// AlertSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Alert = require('../../models/alert/Alert.model');

module.exports = class AlertSet extends BaseObjectSet {
  constructor(alerts = []) {
    super();
    alerts.forEach(alert => this.push(new Alert(alert)));
  }
}
