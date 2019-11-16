// DashboardSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Dashboard = require('../../models/dashboard/Dashboard.model');

module.exports = class DashboardSet extends BaseObjectSet {

  constructor(...dashboards) {
    super(...dashboards.map(dashboard => new Dashboard(dashboard)));
  }

  writeToCSV({ filename = `dashboards-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }

}
