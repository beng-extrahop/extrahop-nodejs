// Appliance.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Appliance = require('../models/appliance/Appliance.model');
const ApplianceSet = require('../models/appliance/ApplianceSet.model');
const ApplianceConnection = require('../models/appliance/ApplianceConnection.model');
const ApplianceCloudServices = require('../models/appliance/ApplianceCloudServices.model');
const ApplianceProductKey = require('../models/appliance/ApplianceProductKey.model');

const OBJECT_NAME = 'appliance';

module.exports = class ApplianceCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(appliance) {
    return appliance
      ? new Appliance(this.getAppliance(appliance))
      : new ApplianceSet(Array.from(this.getAppliances()));
  }

  getCloudServices(appliance) {
    return new ApplianceCloudServices(this.getApplianceCloudServices(appliance));
  }

  getProductKey(appliance) {
    return new ApplianceProductKey(this.getApplianceProductKey(appliance));
  }

  connect(data) {
    return this.postAppliance(this.build(data));
  }

  build(data) {
    return new ApplianceConnection(data);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getAppliances() {
    return this.process(this.appliance.getAppliances(), OBJECT_NAME);
  }

  getAppliance(appliance) {
    return this.process(this.appliance.getAppliance(appliance.id), OBJECT_NAME);
  }

  postAppliance(connection) {
    return this.process(this.appliance.postAppliance(connection), `${OBJECT_NAME} connection`);
  }

  getApplianceCloudServices(appliance) {
    return this.process(this.appliance.getApplianceCloudServices(appliance.id), `${OBJECT_NAME} cloud service`);
  }

  getApplianceProductKey(appliance) {
    return this.process(this.appliance.getApplianceProductKey(appliance.id), `${OBJECT_NAME} product key`);
  }
};
