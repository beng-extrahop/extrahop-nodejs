// DashboardSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');

module.exports = class DashboardSet extends BaseObjectSet {
  writeToCSV({ filename = `dashboards-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
