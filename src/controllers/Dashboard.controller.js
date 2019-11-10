// Dashboard.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const DashboardSet = require('../models/dashboards/DashboardSet.model');
const Strings = require('../constants/String.constants');

module.exports = class DashboardCtrl extends BaseCtrl {
	constructor(appliance) {
		super(appliance);
	}

  // -------------------------------------
  // Get Dashboards
  // -------------------------------------

	findAll() {
		return this.find(null);
	}

	findByAuthor(username, filter = 'equals') {
		return this.find({'author': username}, filter);
	}

	findById(id, filter = 'equals') {
		return this.find({'id': id}, filter);
	}

	findByName(username, filter = 'equals') {
		return this.find({'name': username}, filter);
	}

	findByOwner(username, filter = 'equals') {
		return this.find({'owner': username}, filter);
	}

	findByType(type, filter = 'equals') {
		return this.find({'type': type}, filter);
	}

	find(criteria, filter) {
		let dashboards = this.appliance.getDashboards().data;

		if ( !dashboards || dashboards.length == 0 ) {
			console.log(`No dashboards found on ${this.appliance.hostname}...`);
			return new DashboardSet([]);
		}
		else if ( !criteria || criteria === null ) {
			console.log(`Retrieving all dashboards from ${this.appliance.hostname}...`);
			return new DashboardSet(dashboards.slice(-3));
		}

		const [ key, value ] = [ Object.keys(criteria)[0], Object.values(criteria)[0] ];

		const isMatch = function(dashboard, key, value, filter) {
			switch (Strings.Search.Filters.indexOf(filter)) {
				case 0:
					return !!dashboard[key] && dashboard[key] == value;
				case 1:
					return !!dashboard[key] && dashboard[key].includes(value);
				case 2:
					return !!dashboard[key] && dashboard[key].startsWith(value);
				case 3:
					return !!dashboard[key] && dashboard[key].endsWith(value);
				default:
					return false;
			}
		}

      let results = [];
		console.log(`Retrieving dashboards with '${key}' ${filter} '${value}'...`);

		dashboards.forEach(function(dashboard) {
			if ( isMatch(dashboard, key, value, filter) ) {
				results.push(dashboard);
			}
		});

		console.log(`Found ${results.length} dashboards. Ready to update...\n`);
		return new DashboardSet(results);
	}


	// -------------------------------------
	// Get Dashboards
	// -------------------------------------

	getDashboards() {
		return new DashboardSet(this.process(this.appliance.getDashboards(), 'dashboards'));
	}

	getDashboardSharing(dashboard) {
		return this.appliance.getDashboardSharing(dashboard.id);
	}

  // -------------------------------------
  // Modify Dashboards
  // -------------------------------------

	transferOwnership(dashboard, owner, index = 0) {
		let request = this.patchDashboard(dashboard.id, {'owner': owner});
		console.log(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Transferred ownership of ${dashboard.name} from '${dashboard.owner}' to '${owner}'`);
	}

	updateAuthor(dashboard, author, index = 0) {
		let request = this.patchDashboard(dashboard.id, {'author': author});
		console.log(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Updating author of ${dashboard.name} from '${dashboard.author}' to '${author}'`);
	}

	makePublic(dashboard, index = 0) {
		let request = this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Anyone]: 'viewer'});
		console.log(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Update ${dashboard.name} viewing to public (ID: ${dashboard.id})`);
	}

	makePrivate(dashboard, index = 0) {
		let request = this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Anyone]: null});
		console.log(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Update ${dashboard.name} viewing to private (ID: ${dashboard.id})`);
	}

	delete(dashboard, index = 0) {
		let request = this.deleteDashboard(dashboard.id);
		console.log(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Deleted ${dashboard.name} (ID: ${dashboard.id})`);
	}

  // -------------------------------------
  // Dashboard Sharing - Groups
  // -------------------------------------

	addGroupView(dashboard, group) {
		return this.addGroup(dashboard, group, 'viewer');
	}

	addGroupEdit(dashboard, group) {
		return this.addGroup(dashboard, group, 'editor');
	}

	addGroup(dashboard, group, permission) {
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Groups]: { [group]: permission }});
	}

	removeGroup(dashboard, group) {
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Groups]: { [group]: null }});
	}

	addGroups(dashboard, groups) {
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Groups]: groups});
	}

	removeGroups(dashboard, groups) {
		groups = groups.reduce((map, group) => { map[group] = null; return map; }, {});
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Groups]: groups});
	}

	removeAllGroups(dashboard) {
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Groups]: {}});
	}

  // -------------------------------------
  // Share Dashboard - Users
  // -------------------------------------

	addViewUser(dashboard, username, index = 0) {
		let request = this.addUser(dashboard, username, 'viewer');
		console.log(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Add viewer '${username}' to ${dashboard.name} (ID: ${dashboard.id})`);
	}

	addViewUsers(dashboard, usernames) {
		usernames.forEach((username, index) => this.addViewUser(dashboard, username, index));
	}

	addEditUser(dashboard, username) {
    // console.log(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Add editor '${username}' to ${dashboard.name} (ID: ${dashboard.id})`);
		return this.addUser(dashboard, username, 'editor');
	}

	addUser(dashboard, username, permission) {
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Users]: { [username]: permission }});
	}

	removeUser(dashboard, user) {
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Users]: { [user]: null }});
	}

	addUsers(dashboard, userMap) {
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Users]: userMap});
	}

	removeUsers(dashboard, userList) {
		const userMap = userList.reduce((map, user) => { map[user] = null; return map; }, {});
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Users]: userMap});
	}

	removeAllUsers(dashboard) {
		return this.patchDashboardSharing(dashboard.id, {[Strings.Dashboard.Sharing.Users]: {}});
	}

  // -------------------------------------
  // API Functions
  // -------------------------------------

	deleteDashboard(dashboard) {
		return this.appliance.deleteDashboard(dashboard);
	}

	patchDashboard(dashboard, payload) {
		return this.appliance.patchDashboard(dashboard, payload);
	}

	patchDashboardSharing(dashboard, payload = {}) {
		return this.appliance.patchDashboardSharing(dashboard, payload);
	}

	putDashboardSharing(dashboard, payload = {}) {
		return this.appliance.putDashboardSharing(dashboard, payload);
	}
}
