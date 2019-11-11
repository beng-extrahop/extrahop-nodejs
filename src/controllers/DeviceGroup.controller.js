// DeviceGroup.controller.js

const DeviceGroup = require('../models/deviceGroup/DeviceGroup.model')
const Strings = require('../constants/Global.constants');

module.exports = class DeviceGroupCtrl {
	constructor(appliance) {
		this.appliance = appliance;
	}

  // -------------------------------------
  // Get DeviceGroups
  // -------------------------------------

	findAll() {
		return this.appliance.getDeviceGroups();
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
			console.log(`No device groups found on ${this.appliance.hostname}...`);
			return [];
		}
		else if ( !criteria || criteria === null ) {
			console.log(`Retrieving all device groups from ${this.appliance.hostname}...`);
			return deviceGroups.map(deviceGroup => new DeviceGroup(deviceGroup));
		}

		for ( let key in criteria ) {
			console.log(`\nRetrieving device groups where '${key}' ${filter} '${criteria[key]}'`);
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

		console.log(`Found ${results.length} device groups. Processing updates...\n`);
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
		return this.appliance.getDeviceGroup(deviceGroupID);
	}

	getDeviceGroups() {
		return this.appliance.getDeviceGroups();
	}

	postDeviceGroup(deviceGroup) {
		return this.appliance.postDeviceGroup(deviceGroup);
	}

	deleteDeviceGroup(deviceGroupID) {
		return this.appliance.postDeviceGroup(deviceGroupID);
	}

	patchDeviceGroup(deviceGroup, payload) {
		return this.appliance.patchDeviceGroup(deviceGroup.id, payload);
	}

	getDeviceGroupDevices(deviceGroupID) {
		return this.appliance.getDeviceGroupDevices(deviceGroupID);
	}

	postDeviceGroupDevice(deviceGroupID, deviceID) {
			return this.appliance.postDeviceGroupDevice(deviceGroupID, deviceID);
	}
}
