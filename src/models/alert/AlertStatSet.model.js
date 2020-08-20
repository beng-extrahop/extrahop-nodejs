// AlertStatSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const AlertStat = require('./AlertStat.model');

module.exports = class AlertStatSet extends BaseObjectSet {
  constructor(alertStats = []) {
    super();
    alertStats.forEach((alertStat) => this.push(new AlertStat(alertStat)));
  }

  writeToCSV({ filename = `alertStats-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
