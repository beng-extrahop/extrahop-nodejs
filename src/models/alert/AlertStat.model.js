// AlertStat.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class AlertStat extends BaseObject {
  constructor(alertStat = {}) {
    super();
    Object.keys(alertStat).forEach((key) => this[key] = alertStat[key]);
  }
};
