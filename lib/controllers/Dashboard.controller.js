'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Dashboard.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Dashboard = require('../models/dashboard/Dashboard.model');
var DashboardSet = require('../models/dashboard/DashboardSet.model');
var DashboardSharing = require('../models/dashboard/DashboardSharing.model');
var ReportSet = require('../models/report/ReportSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(DashboardCtrl, _BaseCtrl);

  function DashboardCtrl() {
    _classCallCheck(this, DashboardCtrl);

    return _possibleConstructorReturn(this, (DashboardCtrl.__proto__ || Object.getPrototypeOf(DashboardCtrl)).apply(this, arguments));
  }

  _createClass(DashboardCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get() {
      var dashboard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return dashboard.id ? new Dashboard(this.getDashboard(dashboard)) : new (Function.prototype.bind.apply(DashboardSet, [null].concat(_toConsumableArray(this.getDashboards()))))();
    }
  }, {
    key: 'getSharing',
    value: function getSharing() {
      var dashboard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!dashboard.id) {
        return this.printError('GET', 'dashboard sharing', 'Function parameter { "id": dashboardId } is required');
      }

      return new DashboardSharing(this.getDashboardSharing(dashboard));
    }
  }, {
    key: 'getReports',
    value: function getReports(dashboard) {
      if (!dashboard.id) {
        return this.printError('GET', 'dashboard reports', 'Function parameter { "id": dashboardId } is required');
      }

      return new (Function.prototype.bind.apply(ReportSet, [null].concat(_toConsumableArray(this.getDashboardReports(dashboard)))))();
    }
  }, {
    key: 'create',
    value: function create(data) {
      if (!data) {
        return this.printError('POST', 'dashboards', 'Function parameter { Dashboard } is required');
      }

      return this.postDashboard(new Dashboard(data));
    }
  }, {
    key: 'update',
    value: function update(dashboard, data) {
      if (!dashboard.id) {
        return this.printError('PATCH', 'dashboards', 'Function parameter { "id": dashboardId } is required');
      }

      return this.patchDashboard(dashboard, data);
    }
  }, {
    key: 'updateSharing',
    value: function updateSharing(dashboard, sharing) {
      if (!dashboard.id) {
        return this.printError('PATCH', 'dashboard sharing', 'Function parameter { "id": dashboardId } is required');
      }

      return this.patchDashboardSharing(dashboard, sharing);
    }
  }, {
    key: 'delete',
    value: function _delete(dashboard) {
      if (!dashboard.id) {
        return this.printError('DELETE', 'dashboards', 'Function parameter { "id": dashboardId } is required');
      }

      return this.deleteDashboard(dashboard);
    }

    // -------------------------------------
    // Modify Dashboards
    // -------------------------------------

  }, {
    key: 'transferOwnership',
    value: function transferOwnership(dashboard, username) {
      return this.update(dashboard, { owner: username });
    }
  }, {
    key: 'makePublic',
    value: function makePublic(dashboard) {
      return this.addAnyoneView(dashboard);
    }
  }, {
    key: 'makePrivate',
    value: function makePrivate(dashboard) {
      return this.removeAnyone(dashboard);
    }

    // -------------------------------------
    // Anyone Sharing
    // -------------------------------------

  }, {
    key: 'updateAnyoneSharing',
    value: function updateAnyoneSharing(dashboard, permission) {
      return this.updateSharing(dashboard, { anyone: permission });
    }
  }, {
    key: 'addAnyoneView',
    value: function addAnyoneView(dashboard) {
      return this.updateAnyoneSharing(dashboard, 'viewer');
    }
  }, {
    key: 'addAnyoneEdit',
    value: function addAnyoneEdit(dashboard) {
      return this.updateAnyoneSharing(dashboard, 'editor');
    }
  }, {
    key: 'removeAnyone',
    value: function removeAnyone(dashboard) {
      return this.updateAnyoneSharing(dashboard, null);
    }

    // -------------------------------------
    // User Sharing
    // -------------------------------------

  }, {
    key: 'updateUserSharing',
    value: function updateUserSharing(dashboard, username, permission) {
      return this.updateSharing(dashboard, { users: _defineProperty({}, username, permission) });
    }
  }, {
    key: 'addUserView',
    value: function addUserView(dashboard, username) {
      return this.updateUserSharing(dashboard, username, 'viewer');
    }
  }, {
    key: 'addUserEdit',
    value: function addUserEdit(dashboard, username) {
      return this.updateUserSharing(dashboard, username, 'editor');
    }
  }, {
    key: 'removeUser',
    value: function removeUser(dashboard, username) {
      return this.updateUserSharing(dashboard, username, null);
    }

    // -------------------------------------
    // Group Sharing
    // -------------------------------------

  }, {
    key: 'updateGroupSharing',
    value: function updateGroupSharing(dashboard, group, permission) {
      return this.updateSharing(dashboard, { groups: _defineProperty({}, group.id, permission) });
    }
  }, {
    key: 'addGroupView',
    value: function addGroupView(dashboard, group) {
      return this.updateGroupSharing(dashboard, group, 'viewer');
    }
  }, {
    key: 'addGroupEdit',
    value: function addGroupEdit(dashboard, group) {
      return this.updateGroupSharing(dashboard, group, 'editor');
    }
  }, {
    key: 'removeGroup',
    value: function removeGroup(dashboard, group) {
      return this.updateGroupSharing(dashboard, group, null);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getDashboards',
    value: function getDashboards() {
      return this.process(this.appliance.getDashboards(), 'dashboards').map(function (x) {
        return new Dashboard(x);
      });
    }
  }, {
    key: 'getDashboard',
    value: function getDashboard(dashboard) {
      return this.process(this.appliance.getDashboard(dashboard.id), 'dashboard');
    }
  }, {
    key: 'deleteDashboard',
    value: function deleteDashboard(dashboard) {
      return this.process(this.appliance.deleteDashboard(dashboard.id), 'dashboard');
    }
  }, {
    key: 'patchDashboard',
    value: function patchDashboard(dashboard, data) {
      return this.process(this.appliance.patchDashboard(dashboard.id, data), 'dashboard');
    }

    // -------------------------------------
    // Report Functions
    // -------------------------------------

  }, {
    key: 'getDashboardReports',
    value: function getDashboardReports(dashboard) {
      return this.process(this.appliance.getDashboardReports(dashboard.id), 'dashboard reports');
    }

    // -------------------------------------
    // Sharing Functions
    // -------------------------------------

  }, {
    key: 'getDashboardSharing',
    value: function getDashboardSharing(dashboard) {
      return this.process(this.appliance.getDashboardSharing(dashboard.id), 'dashboard sharing');
    }
  }, {
    key: 'patchDashboardSharing',
    value: function patchDashboardSharing(dashboard, sharing) {
      return this.process(this.appliance.patchDashboardSharing(dashboard.id, sharing), 'dashboard sharing');
    }
  }, {
    key: 'putDashboardSharing',
    value: function putDashboardSharing(dashboard, sharing) {
      return this.process(this.appliance.putDashboardSharing(dashboard.id, sharing), 'dashboard sharing');
    }
  }]);

  return DashboardCtrl;
}(BaseCtrl);
//# sourceMappingURL=Dashboard.controller.js.map