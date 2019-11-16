// DashboardSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Dashboard = require('../../models/dashboard/Dashboard.model');
const DashboardSet = require('../../models/dashboard/Dashboard.model');

module.exports = class DashboardSet extends BaseObjectSet {

  writeToCSV({ filename = `dashboards-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }

}
