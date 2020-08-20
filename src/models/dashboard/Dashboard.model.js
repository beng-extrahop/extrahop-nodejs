// Dashboard.dashboard.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Dashboard extends BaseObject {
  constructor(dashboard = {}) {
    super();
    Object.keys(dashboard).forEach((key) => this[key] = dashboard[key]);
  }
};
