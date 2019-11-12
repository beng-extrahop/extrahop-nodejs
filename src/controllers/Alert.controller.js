// Alert.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const Alert = require('../models/alert/Alert.model')
const Strings = require('../constants/Global.constants');

module.exports = class AlertCtrl extends BaseCtrl {
	constructor(appliance) {
		super(appliance);
	}

  // -------------------------------------
  // Default Search
  // -------------------------------------

	findByName(name, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.Name, name, limit, offset, activeFrom, activeUntil);
	}

	findByDiscoveryId(discoveryId, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.DiscoveryId, discoveryId, limit, offset, activeFrom, activeUntil);
	}

	findByIpAddress(ip, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.IpAddress, ip, limit, offset, activeFrom, activeUntil);
	}

	findByMacAddress(mac, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.MacAddress, mac, limit, offset, activeFrom, activeUntil);
	}

	findByVendor(vendor, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.Vendor, vendor, limit, offset, activeFrom, activeUntil);
	}

	findByType(type, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.Type, type, limit, offset, activeFrom, activeUntil);
	}

	findByTag(tag, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.Tag, tag, limit, offset, activeFrom, activeUntil);
	}

	findByActivity(activity, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.Activity, activity, limit, offset, activeFrom, activeUntil);
	}

	findByNode(node, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.Node, node, limit, offset, activeFrom, activeUntil);
	}

	findByVlan(vlan, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.Vlan, vlan, limit, offset, activeFrom, activeUntil);
	}

	findByDiscoverTime(discoverTime, limit, offset, activeFrom, activeUntil) {
		return this.find(Strings.Search.Types.DiscoverTime, discoverTime, limit, offset, activeFrom, activeUntil);
	}

  // -------------------------------------
  // Custom Search
  // -------------------------------------

	findById(id, filter, limit, offset, activeFrom, activeUntil) {
		return this.findCustom({'id': id}, filter, limit, offset, activeFrom, activeUntil);
	}

	findByParentId(parentId, filter, limit, offset, activeFrom, activeUntil) {
		return this.findCustom({'parent_id': parentId}, filter, limit, offset, activeFrom, activeUntil);
	}

  // -------------------------------------
  // Global Search
  // -------------------------------------

  findAll(limit = -1, offset, activeFrom, activeUntil) {
    return this.find(Strings.Search.Types.Any, undefined, limit, offset, activeFrom, activeUntil);
  }

  findAllCustom(limit = -1, offset, activeFrom, activeUntil) {
    return this.find('type', 'custom', limit, offset, activeFrom, activeUntil);
  }

	find(searchType, value, limit, offset, activeFrom, activeUntil) {
		if ( searchType === 'any' ) {
			console.info(`Searching '${this.appliance.hostname}' for all alerts...`);
		} else {
			console.info(`Searching '${this.appliance.hostname}' for alerts with query '?searchType=${searchType}&value=${value}'`);
		}

		let getAlerts = this.appliance.getAlerts(searchType, value, limit, offset, activeFrom, activeUntil);

		if ( !getAlerts || !getAlerts.success ) {
			console.info(`Error retrieving alerts from ${this.appliance.hostname}`);
			return;
		}
		else if ( getAlerts.success && getAlerts.data.length === 0 ) {
			console.info(`No alerts found on ${this.appliance.hostname}`);
			return [];
		}

		console.info(`Found ${getAlerts.data.length} alerts matching search.\n`);
		return getAlerts.data.map(alert => new Alert(alert));
	}

	findCustom(criteria, filter, limit, offset, activeFrom, activeUntil) {
		let alerts = this.appliance.alerts.findAll(criteria, filter, limit, offset, activeFrom, activeUntil);

		for ( let key in criteria ) {
			console.info(`Retrieving alerts where '${key}' ${filter} '${criteria[key]}'`);
		}

		const isMatch = function(alert, key, value, filter) {
			switch (Strings.Filters.indexOf(filter)) {
				case 0:
					return !!alert[key] && alert[key] == value;
				case 1:
					return !!alert[key] && alert[key].includes(value);
				case 2:
					return !!alert[key] && alert[key].startsWith(value);
				case 3:
					return !!alert[key] && alert[key].endsWith(value);
				default:
					return false;
			}
		}

		let results = [];

		alerts.data.forEach(function(alert) {
			for ( let key in criteria ) {
				if ( !isMatch(alert, key, criteria[key], filter) ) {
					return;
				}
			}
			results.push(new Alert(alert));
		});

		console.info(`Found ${results.length} alerts. Processing updates...\n`);
		return results.length > 1 ? results : results[0];
	}

  // -------------------------------------
  // Edit Alert
  // -------------------------------------

	enable(alert, skip = true) {
		if ( alert.disabled || !skip ) {
			alert.disabled = false;
			return this.patchAlert(alert, { 'disabled': alert.disabled });
		}
	}

	disable(alert, skip = true) {
		if ( !alert.disabled || !skip ) {
			alert.disabled = true;
			return this.patchAlert(alert, { 'disabled': alert.disabled });
		}
	}

	toggle(alert) {
		return this.patchAlert(alert, { 'disabled': !alert.disabled });
	}

  // -------------------------------------
  // API Functions
  // -------------------------------------

	patchAlert(alert, payload) {
		return this.appliance.patchAlert(alert.id, payload);
	}

	putAlert(alert) {
		return this.appliance.putAlert(alert);
	}
}
