// DashboardSet.model.js

const BaseObjectSet = require('../../models/base/BaseObjectSet.model');
const Dashboard = require('../../models/dashboards/Dashboard.model');

module.exports = class DashboardSet extends BaseObjectSet {
  constructor(dashboards = []) {
    super();
    dashboards.forEach(dashboard => this.push(new Dashboard(dashboard)));
  }
}
