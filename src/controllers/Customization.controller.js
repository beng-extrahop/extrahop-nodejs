// Customization.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Customization = require('../models/customization/Customization.model');
const CustomizationSet = require('../models/customization/CustomizationSet.model');
const CustomizationStatus = require('../models/customization/CustomizationStatus.model');

const OBJECT_NAME = 'customization';

module.exports = class CustomizationCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(customization) {
    return customization
      ? new Customization(this.getCustomization(customization))
      : new CustomizationSet(this.getCustomizations());
  }

  getStatus() {
    return new CustomizationStatus(this.getCustomizationStatus());
  }

  delete(customization) {
    return this.deleteCustomization(customization);
  }

  backup(name) {
    return this.postCustomization(name);
  }

  restore(customization) {
    return this.postCustomizationApply(customization);
  }

  save(customization) {
    return this.postCustomizationDownload(customization);
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getCustomizations() {
    return this.process(this.appliance.getCustomizations(), OBJECT_NAME);
  }

  getCustomization(customization) {
    return this.process(this.appliance.getCustomization(customization.id), OBJECT_NAME);
  }

  postCustomization(name) {
    return this.process(this.appliance.postCustomization({ name }), OBJECT_NAME);
  }

  deleteCustomization(customization) {
    return this.process(this.appliance.deleteCustomization(customization.id), OBJECT_NAME);
  }

  // -------------------------------------
  // Status
  // -------------------------------------

  getCustomizationStatus() {
    return this.process(this.appliance.getCustomizationStatus(), `${OBJECT_NAME} status`);
  }

  // -------------------------------------
  // Apply
  // -------------------------------------

  postCustomizationApply(customization) {
    return this.process(this.appliance.postCustomizationApply(customization.id), OBJECT_NAME);
  }

  // -------------------------------------
  // Download
  // -------------------------------------

  postCustomizationDownload(customization) {
    return this.process(this.appliance.postCustomizationDownload(customization.id), OBJECT_NAME);
  }
};
