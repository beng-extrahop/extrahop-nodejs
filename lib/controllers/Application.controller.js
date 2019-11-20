'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Application.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Application = require('../models/application/Application.model');
var ApplicationSet = require('../models/application/ApplicationSet.model');
var ApplicationActivity = require('../models/application/ApplicationActivity.model');
var AlertSet = require('../models/alert/AlertSet.model');
var DashboardSet = require('../models/dashboard/DashboardSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(ApplicationCtrl, _BaseCtrl);

  function ApplicationCtrl() {
    _classCallCheck(this, ApplicationCtrl);

    return _possibleConstructorReturn(this, (ApplicationCtrl.__proto__ || Object.getPrototypeOf(ApplicationCtrl)).apply(this, arguments));
  }

  _createClass(ApplicationCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(application) {
      return application ? new Application(this.getApplication(application)) : new (Function.prototype.bind.apply(ApplicationSet, [null].concat(_toConsumableArray(this.getApplications()))))();
    }
  }, {
    key: 'getActivity',
    value: function getActivity(application) {
      return new ApplicationActivity(this.getApplicationActivity(application));
    }
  }, {
    key: 'getAlerts',
    value: function getAlerts(application) {
      return new (Function.prototype.bind.apply(AlertSet, [null].concat(_toConsumableArray(this.getApplicationAlerts(application)))))();
    }
  }, {
    key: 'getDashboards',
    value: function getDashboards(application) {
      return new (Function.prototype.bind.apply(DashboardSet, [null].concat(_toConsumableArray(this.getApplicationDashboards(application)))))();
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.postApplication(new Application(data));
    }
  }, {
    key: 'update',
    value: function update(application, data) {
      return this.patchApplication(application, data);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getApplications',
    value: function getApplications() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.process(this.appliance.getApplications(params), 'applications');
    }
  }, {
    key: 'getApplication',
    value: function getApplication(application) {
      return this.process(this.appliance.getApplication(application.id), 'application');
    }
  }, {
    key: 'postApplication',
    value: function postApplication(application) {
      return this.process(this.appliance.postApplication(application), 'application');
    }
  }, {
    key: 'patchApplication',
    value: function patchApplication(application, data) {
      return this.process(this.appliance.patchApplication(application.id, data), 'application');
    }

    // -------------------------------------
    // Activity Functions
    // -------------------------------------

  }, {
    key: 'getApplicationActivity',
    value: function getApplicationActivity(application) {
      return this.process(this.appliance.getApplicationActivity(application.id), 'application activity');
    }

    // -------------------------------------
    // Alert Functions
    // -------------------------------------

  }, {
    key: 'getApplicationAlerts',
    value: function getApplicationAlerts(application) {
      return this.process(this.appliance.getApplicationAlerts(application.id), 'application alerts');
    }
  }, {
    key: 'postApplicationAlerts',
    value: function postApplicationAlerts(application) {
      var assign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var unassign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      return this.process(this.appliance.postApplicationAlerts(application.id, { assign: assign, unassign: unassign }), 'application alerts');
    }
  }, {
    key: 'postApplicationAlert',
    value: function postApplicationAlert(application, alert) {
      return this.process(this.appliance.postApplicationAlert(application.id, alert.id), 'application alert');
    }
  }, {
    key: 'deleteApplicationAlert',
    value: function deleteApplicationAlert(application, alert) {
      return this.process(this.appliance.deleteApplicationAlert(application.id, alert.id), 'application alert');
    }

    // -------------------------------------
    // Dashboard Functions
    // -------------------------------------

  }, {
    key: 'getApplicationDashboards',
    value: function getApplicationDashboards(application) {
      return this.process(this.appliance.getApplicationDashboards(application.id), 'application dashboards');
    }
  }]);

  return ApplicationCtrl;
}(BaseCtrl);
//# sourceMappingURL=Application.controller.js.map