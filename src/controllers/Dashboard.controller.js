// Dashboard.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Dashboard = require('../models/dashboard/Dashboard.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');
const Strings = require('../constants/Global.constants');

module.exports = class DashboardCtrl extends BaseCtrl {
	constructor(appliance) {
		super(appliance);
	}

  get(dashboard) {
    return dashboard ? new Dashboard(this.getDashboard(dashboard)) : new DashboardSet(this.getDashboards());
  }

  getSharing(dashboard) {
    return this.getDashboardSharing(dashboard);
  }

  create(data) {
    return this.postDashboard(this.build(data));
  }

  update(dashboard, data) {
    return this.patchDashboard(dashboard, data);
  }

  delete(dashboard) {
    return this.deleteDashboard(dashboard);
  }

  build(data) {
    return new Dashboard(data);
  }

  // -------------------------------------
  // Modify Dashboards
  // -------------------------------------

	transferOwnership(dashboard, owner) {
		return this.patchDashboard(dashboard.id, { owner: owner });
	}

	makePublic(dashboard) {
		return this.patchDashboardSharing(dashboard.id, { anyone: 'viewer' });
	}

	makePrivate(dashboard) {
		return this.patchDashboardSharing(dashboard.id, { anyone: null });
	}

  // -------------------------------------
  // Dashboard Sharing
  // -------------------------------------

  updateSharing(dashboard, { anyone, groups, users }) {
    return this.patchDashboardSharing(dashboard, { anyone, groups, users });
  }

  addAnyone(dashboard, username, permission) {
    return this.patchDashboardSharing(dashboard, { anyone: 'viewer' });
  }

  addUser(dashboard, username, permission) {
    return this.patchDashboardSharing(dashboard, { users: { [username]: permission } });
  }

  addGroup(dashboard, group, permission) {
    return this.updateSharing(dashboard, { groups: { [group.id]: permission } });
  }

	addGroupView(dashboard, group) {
		return this.addGroup(dashboard, group, 'viewer');
	}

	addGroupEdit(dashboard, group) {
		return this.addGroup(dashboard, group, 'editor');
	}

	removeGroup(dashboard, group) {
		return this.patchDashboardSharing(dashboard.id, { groups: { [group]: null }});
	}

	removeGroups(dashboard, groups) {
		groups = groups.reduce((map, group) => { map[group] = null; return map; }, {});
		return this.patchDashboardSharing(dashboard.id, { groups: groups});
	}

	removeAllGroups(dashboard) {
		return this.patchDashboardSharing(dashboard.id, { groups: {}});
	}

  // -------------------------------------
  // Share Dashboard - Users
  // -------------------------------------

	addViewUser(dashboard, username) {
		let request = this.addUser(dashboard, username, 'viewer');
		console.info(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Add viewer '${username}' to ${dashboard.name} (ID: ${dashboard.id})`);
	}

	addViewUsers(dashboard, usernames) {
		usernames.forEach((username, index) => this.addViewUser(dashboard, username, index));
	}

	addEditUser(dashboard, username) {
    // console.info(`${index} - ${request.success ? 'SUCCESS' : 'ERROR'} - Add editor '${username}' to ${dashboard.name} (ID: ${dashboard.id})`);
		return this.addUser(dashboard, username, 'editor');
	}

	addUser(dashboard, username, permission) {
		return this.patchDashboardSharing(dashboard.id, { users: { [username]: permission }});
	}

	removeUser(dashboard, user) {
		return this.patchDashboardSharing(dashboard.id, { users: { [user]: null }});
	}

	addUsers(dashboard, userMap) {
		return this.patchDashboardSharing(dashboard.id, { users: userMap});
	}

	removeUsers(dashboard, userList) {
		const userMap = userList.reduce((map, user) => { map[user] = null; return map; }, {});
		return this.patchDashboardSharing(dashboard.id, { users: userMap});
	}

	removeAllUsers(dashboard) {
		return this.patchDashboardSharing(dashboard.id, { users: {}});
	}

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getDashboards() {
    return this.process(this.appliance.getDashboards(), 'dashboards');
  }

  getDashboard(dashboard) {
    return this.process(this.appliance.getDashboard(dashboard.id), 'dashboard');
  }

  deleteDashboard(dashboard) {
    return this.process(this.appliance.deleteDashboard(dashboard.id), 'dashboard');
  }

  patchDashboard(dashboard, data) {
    return this.process(this.appliance.patchDashboard(dashboard.id, data), 'dashboard');
  }

  // -------------------------------------
  // Report Functions
  // -------------------------------------

  getDashboardReports(dashboard) {
    return this.process(this.appliance.getDashboardReports(dashboard.id), 'dashboard reports');
  }

  // -------------------------------------
  // Sharing Functions
  // -------------------------------------

  getDashboardSharing(dashboard) {
    return this.appliance.getDashboardSharing(dashboard.id);
  }

	patchDashboardSharing(dashboard, sharing) {
		return this.appliance.patchDashboardSharing(dashboard.id, sharing);
	}

	putDashboardSharing(dashboard, sharing) {
		return this.appliance.putDashboardSharing(dashboard.id, sharing);
	}
}
