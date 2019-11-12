// DeviceGroupSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const EmailGroup = require('../../models/emailGroup/EmailGroup.model');

module.exports = class DeviceGroupSet extends BaseObjectSet {
  constructor(emailGroups = []) {
    super(emailGroups);
    emailGroups.forEach(emailGroup => this.push(new EmailGroup(emailGroup)));
  }

  writeToCSV({ filename = `emailGroups-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}
