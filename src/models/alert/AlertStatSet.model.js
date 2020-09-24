// AlertStatSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const AlertStat = require('./AlertStat.model');

module.exports = class AlertStatSet extends BaseObjectSet {
  constructor(alertStats = []) {
    super(Array.from(alertStats).map((alertStat) => new AlertStat(alertStat)));
  }
};
