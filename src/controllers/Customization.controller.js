// Customization.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Customization = require('../models/customization/Customization.model');
const CustomizationSet = require('../models/customization/CustomizationSet.model');
const CustomizationStatus = require('../models/customization/CustomizationStatus.model');

module.exports = class CustomizationCtrl extends BaseCtrl {
	constructor(appliance) {
		super(appliance);
	}

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(customization) {
    return customization ? new Customization(this.getCustomization(customization)) : new CustomizationSet(this.getCustomizations());
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
  // Base Functions
  // -------------------------------------

  getCustomizations() {
    return this.process(this.appliance.getCustomizations(), 'customizations');
  }

  getCustomization(customization) {
    return this.process(this.appliance.getCustomization(customization.id), 'customization');
  }

  postCustomization(name) {
    return this.process(this.appliance.postCustomization({ name }), 'customization');
  }

  deleteCustomization(customization) {
    return this.process(this.appliance.deleteCustomization(customization.id), 'customization');
  }

  // -------------------------------------
  // Status Functions
  // -------------------------------------

  getCustomizationStatus() {
    return this.process(this.appliance.getCustomizationStatus(), 'customization status');
  }

  // -------------------------------------
  // Apply Functions
  // -------------------------------------

  postCustomizationApply(customization) {
    return this.process(this.appliance.postCustomizationApply(customization.id), 'customization apply');
  }

  // -------------------------------------
  // Download Functions
  // -------------------------------------

  postCustomizationDownload(customization) {
    return this.process(this.appliance.postCustomizationDownload(customization.id), 'customization download');
  }
}
