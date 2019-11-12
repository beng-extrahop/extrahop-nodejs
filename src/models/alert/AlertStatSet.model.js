// AlertStatSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const AlertStat = require('../../models/alert/AlertStat.model');

module.exports = class AlertStatSet extends BaseObjectSet {
  constructor(alertStats = []) {
    super(alertStats);
    alertStats.forEach(alertStat => this.push(new AlertStat(alertStat)));
  }

  writeToCSV({ filename = `alertStats-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}
