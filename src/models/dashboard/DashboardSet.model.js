// DashboardSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Dashboard = require('./Dashboard.model');

module.exports = class DashboardSet extends BaseObjectSet {
  constructor(dashboards = []) {
    super(Array.from(dashboards).map((dashboard) => new Dashboard(dashboard)));
  }
};
