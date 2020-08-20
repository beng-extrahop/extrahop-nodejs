// DeviceGroupSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const EmailGroup = require('./EmailGroup.model');

module.exports = class DeviceGroupSet extends BaseObjectSet {
  constructor(emailGroups = []) {
    super();
    emailGroups.forEach((emailGroup) => this.push(new EmailGroup(emailGroup)));
  }

  writeToCSV({ filename = `emailGroups-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
