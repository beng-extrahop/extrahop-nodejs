// AlertStat.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class AlertStat extends BaseObject {
  constructor(alertStat = {}) {
    super();

    /* TODO */
    Object.keys(alertStat).forEach(key => (this[key] = alertStat[key]));
  }
};
