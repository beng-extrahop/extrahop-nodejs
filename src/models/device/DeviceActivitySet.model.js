// DeviceActivitySet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const DeviceActivity = require('./DeviceActivity.model');

module.exports = class DeviceActivitySet extends BaseObjectSet {
  constructor(deviceActivities = []) {
    super(Array.from(deviceActivities).map((deviceActivity) => new DeviceActivity(deviceActivity)));
  }
};
