// DashboardSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Dashboard = require('./Dashboard.model');

module.exports = class DashboardSet extends BaseObjectSet {
  constructor(dashboards = []) {
    super();
    dashboards.forEach((dashboard) => this.push(new Dashboard(dashboard)));
  }

  writeToCSV({ filename = `dashboards-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
