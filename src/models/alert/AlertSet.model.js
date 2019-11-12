// AlertSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Alert = require('../../models/alert/Alert.model');

module.exports = class AlertSet extends BaseObjectSet {
  constructor(alerts = []) {
    super(alerts);
    alerts.forEach(alert => this.push(new Alert(alert)));
  }

  writeToCSV({ filename = `alerts-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}
