// Appliance.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Appliance = require('../models/appliance/Appliance.model');
const ApplianceSet = require('../models/appliance/ApplianceSet.model');
const ApplianceConnection = require('../models/appliance/ApplianceConnection.model');
const ApplianceCloudServices = require('../models/appliance/ApplianceCloudServices.model');
const ApplianceProductKey = require('../models/appliance/ApplianceProductKey.model');

module.exports = class ApplianceCtrl extends BaseCtrl {

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(appliance) {
    return appliance ? new Appliance(this.getAppliance(appliance)) : new ApplianceSet(...this.getAppliances());
  }

  getCloudServices(appliance) {
    return new ApplianceCloudServices(this.getApplianceCloudServices(appliance));
  }

  getProductKey(appliance) {
    return new ApplianceProductKey(this.getProductKey(appliance));
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
    return this.process(this.appliance.getAppliances(), 'appliances');
  }

  getAppliance(appliance) {
    return this.process(this.appliance.getAppliance(appliance.id), 'appliance');
  }

  postAppliance(connection) {
    return this.process(this.appliance.postAppliance(connection), 'appliance connection');
  }

  getApplianceCloudServices(appliance) {
    return this.process(this.appliance.getApplianceCloudServices(appliance.id), 'appliance cloud services');
  }

  getApplianceProductKey(appliance) {
    return this.process(this.appliance.getApplianceProductKey(appliance.id), 'appliance product key');
  }
};
