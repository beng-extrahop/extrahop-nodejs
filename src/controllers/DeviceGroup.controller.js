// DeviceGroup.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const DeviceGroup = require('../models/deviceGroup/DeviceGroup.model')
const DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model')
const Strings = require('../constants/Global.constants');

module.exports = class DeviceGroupCtrl extends BaseCtrl {

	constructor(appliance) {
    super(appliance);
	}

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(deviceGroup) {
    return deviceGroup ? new DeviceGroup(this.getAlert(deviceGroup)) : new DeviceGroupSet(...this.getDeviceGroups());
  }


  // -------------------------------------
  // Get DeviceGroups
  // -------------------------------------


	findAll() {
    return this.process(this.appliance.getDeviceGroups(), 'device group');
	}

	findById(id, filter = 'equals') {
		return this.find({ 'id': id }, filter);
	}

	findByName(name, filter = 'equals') {
		return this.find({ 'name': name }, filter);
	}

	findByTag(tag, filter = 'equals') {
		return this.find({ 'value': tag }, filter);
	}

	findByType(type, filter = 'equals') {
		return this.find({ 'field': 'type', 'value': type }, filter);
	}

	findBy(property, filter = 'equals') {
		return this.find(property, filter);
	}

	find(criteria, filter) {
		let deviceGroups = this.appliance.getDeviceGroups().data;

		if ( !deviceGroups || deviceGroups.length == 0 ) {
			console.info(`No device groups found on ${this.appliance.hostname}...`);
			return [];
		}
		else if ( !criteria || criteria === null ) {
			console.info(`Retrieving all device groups from ${this.appliance.hostname}...`);
			return deviceGroups.map(deviceGroup => new DeviceGroup(deviceGroup));
		}

		for ( let key in criteria ) {
			console.info(`\nRetrieving device groups where '${key}' ${filter} '${criteria[key]}'`);
		}

		const isMatch = function(deviceGroup, key, value, filter) {
			switch (Strings.Search.Filters.indexOf(filter)) {
				case 0:
					return !!deviceGroup[key] && deviceGroup[key] == value;
				case 1:
					return !!deviceGroup[key] && deviceGroup[key].includes(value);
				case 2:
					return !!deviceGroup[key] && deviceGroup[key].startsWith(value);
				case 3:
					return !!deviceGroup[key] && deviceGroup[key].endsWith(value);
				default:
					return false;
			}
		}

		let results = [];

		deviceGroups.forEach(function(deviceGroup) {
			for ( let key in criteria ) {
				if ( !isMatch(deviceGroup, key, criteria[key], filter) ) {
					break;
				}
			}

			results.push(new DeviceGroup(deviceGroup));
		});

		console.info(`Found ${results.length} device groups. Processing updates...\n`);
		return results;
	}

  // -------------------------------------
  // Edit DeviceGroup
  // -------------------------------------

	enable(deviceGroup, skip = true) {
		if ( deviceGroup.disabled || !skip ) {
			deviceGroup.disabled = false;
			return this.patchDeviceGroup(deviceGroup, { 'disabled': deviceGroup.disabled });
		}
	}

	disable(deviceGroup, skip = true) {
		if ( !deviceGroup.disabled || !skip ) {
			deviceGroup.disabled = true;
			return this.patchDeviceGroup(deviceGroup, { 'disabled': deviceGroup.disabled });
		}
	}

	toggle(deviceGroup) {
		return this.patchDeviceGroup(deviceGroup, { 'disabled': !deviceGroup.disabled });
	}

  // -------------------------------------
  // API Functions
  // -------------------------------------

	getDeviceGroup(deviceGroupID) {
    return this.process(this.appliance.getDeviceGroup(deviceGroupID), 'device group');
	}

	getDeviceGroups() {
    return this.process(this.appliance.getDeviceGroups(), 'device groups');
	}

	postDeviceGroup(deviceGroup) {
    return this.process(this.appliance.postDeviceGroup(deviceGroup), 'device group');
	}

	deleteDeviceGroup(deviceGroupID) {
    return this.process(this.appliance.postDeviceGroup(deviceGroupID), 'device group');
	}

	patchDeviceGroup(deviceGroup, payload) {
    return this.process(this.appliance.patchDeviceGroup(deviceGroup.id, payload), 'device group');
	}

	getDeviceGroupDevices(deviceGroupID) {
    return this.process(this.appliance.getDeviceGroupDevices(deviceGroupID), 'device group devices');
	}

	postDeviceGroupDevice(deviceGroupID, deviceID) {
    return this.process(this.appliance.postDeviceGroupDevice(deviceGroupID, deviceID), 'device group devices');
	}
}
