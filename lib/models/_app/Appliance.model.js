'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Appliance.model.js

var BaseObject = require('../../models/_base/BaseObject.model');
var Request = require('../../models/_http/Request.model');

var _require = require('../../constants/Global.constants'),
    Icons = _require.Icons;

var ActivityGroupCtrl = require('../../controllers/ActivityGroup.controller');
var ActivityMapCtrl = require('../../controllers/ActivityMap.controller');
var AlertCtrl = require('../../controllers/Alert.controller');
var AnalysisPriorityCtrl = require('../../controllers/AnalysisPriority.controller');
var ApikeyCtrl = require('../../controllers/Apikey.controller');
var ApplianceCtrl = require('../../controllers/Appliance.controller');
var ApplicationCtrl = require('../../controllers/Application.controller');
var AuditLogCtrl = require('../../controllers/AuditLog.controller');
var BundleCtrl = require('../../controllers/Bundle.controller');
var CustomizationCtrl = require('../../controllers/Customization.controller');
var CustomDeviceCtrl = require('../../controllers/CustomDevice.controller');
var DashboardCtrl = require('../../controllers/Dashboard.controller');
var DeviceCtrl = require('../../controllers/Device.controller');
var DeviceGroupCtrl = require('../../controllers/DeviceGroup.controller');
var LicenseCtrl = require('../../controllers/License.controller');
var MetricCtrl = require('../../controllers/Metric.controller');
var RecordCtrl = require('../../controllers/Record.controller');
var SoftwareCtrl = require('../../controllers/Software.controller');
var TriggerCtrl = require('../../controllers/Trigger.controller');

module.exports = function (_BaseObject) {
  _inherits(Appliance, _BaseObject);

  function Appliance() {
    var appliance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Appliance);

    var _this = _possibleConstructorReturn(this, (Appliance.__proto__ || Object.getPrototypeOf(Appliance)).call(this));

    _this.host = appliance.host || appliance.hostname;
    _this.hostname = _this.host;
    _this.apikey = appliance.apikey;
    _this.type = appliance.type;

    _this.request = new Request(_this.hostname, _this.apikey);

    var getExtrahop = _this.getExtrahop();

    if (!getExtrahop.success) {
      var _ret;

      _this.active = false;
      return _ret = console.warn(Icons.Warn + ' Connection to ' + _this.hostname + ' failed'), _possibleConstructorReturn(_this, _ret);
    }

    console.info(Icons.Info + ' Connected to ' + _this.hostname);

    Object.keys(getExtrahop.data).forEach(function (key) {
      _this[key] = getExtrahop.data[key];
    });

    _this.name = _this.display_host;

    var getAppliance = (_this.getAppliances().data || []).find(function (x) {
      return x.hostname === _this.hostname;
    });

    if (getAppliance == null) {
      var _ret2;

      return _ret2 = console.warn(Icons.Warn + ' Error populating appliance data from ' + _this.hostname), _possibleConstructorReturn(_this, _ret2);
    }

    Object.keys(getAppliance).forEach(function (key) {
      _this[key] = getAppliance[key];
    });

    if (_this.host !== _this.hostname) {
      console.warn(Icons.Warn + ' Hostname mismatch. Configured: ' + _this.host + ', Retrieved: ' + _this.hostname);
    }
    return _this;
  }
  // -------------------------------------
  // Controllers
  // -------------------------------------

  _createClass(Appliance, [{
    key: 'activityGroups',
    value: function activityGroups() {
      return new ActivityGroupCtrl(this);
    }
  }, {
    key: 'activityMaps',
    value: function activityMaps() {
      return new ActivityMapCtrl(this);
    }
  }, {
    key: 'alerts',
    value: function alerts() {
      return new AlertCtrl(this);
    }
  }, {
    key: 'analysisPriority',
    value: function analysisPriority() {
      return new AnalysisPriorityCtrl(this);
    }
  }, {
    key: 'apikeys',
    value: function apikeys() {
      return new ApikeyCtrl(this);
    }
  }, {
    key: 'appliances',
    value: function appliances() {
      return new ApplianceCtrl(this);
    }
  }, {
    key: 'applications',
    value: function applications() {
      return new ApplicationCtrl(this);
    }
  }, {
    key: 'auditLog',
    value: function auditLog() {
      return new AuditLogCtrl(this);
    }
  }, {
    key: 'bundles',
    value: function bundles() {
      return new BundleCtrl(this);
    }
  }, {
    key: 'customizations',
    value: function customizations() {
      return new CustomizationCtrl(this);
    }
  }, {
    key: 'customDevices',
    value: function customDevices() {
      return new CustomDeviceCtrl(this);
    }
  }, {
    key: 'dashboards',
    value: function dashboards() {
      return new DashboardCtrl(this);
    }
  }, {
    key: 'devices',
    value: function devices() {
      return new DeviceCtrl(this);
    }
  }, {
    key: 'deviceGroups',
    value: function deviceGroups() {
      return new DeviceGroupCtrl(this);
    }
  }, {
    key: 'license',
    value: function license() {
      return new LicenseCtrl(this);
    }
  }, {
    key: 'metrics',
    value: function metrics() {
      return new MetricCtrl(this);
    }
  }, {
    key: 'records',
    value: function records() {
      return new RecordCtrl(this);
    }
  }, {
    key: 'software',
    value: function software() {
      return new SoftwareCtrl(this);
    }
  }, {
    key: 'triggers',
    value: function triggers() {
      return new TriggerCtrl(this);
    }

    // -------------------------------------
    // API: Activity Groups
    // -------------------------------------

  }, {
    key: 'getActivityGroups',
    value: function getActivityGroups() {
      return this.request.get('/activitygroups');
    }
  }, {
    key: 'getActivityGroupDashboards',
    value: function getActivityGroupDashboards(activityGroupId) {
      return this.request.get('/activitygroups/' + activityGroupId + '/dashboards');
    }

    // -------------------------------------
    // API: Activity Maps
    // -------------------------------------

  }, {
    key: 'getActivityMaps',
    value: function getActivityMaps() {
      return this.request.get('/activitymaps');
    }
  }, {
    key: 'postActivityMaps',
    value: function postActivityMaps(payload) {
      return this.request.post('/activitymaps', payload);
    }
  }, {
    key: 'postActivityMapsQuery',
    value: function postActivityMapsQuery(payload) {
      return this.request.post('/activitymaps/query', payload);
    }
  }, {
    key: 'deleteActivityMap',
    value: function deleteActivityMap(activityMapId) {
      return this.request.delete('/activitymaps/' + activityMapId);
    }
  }, {
    key: 'getActivityMap',
    value: function getActivityMap(activityMapId) {
      return this.request.get('/activitymaps/' + activityMapId);
    }
  }, {
    key: 'patchActivityMap',
    value: function patchActivityMap(activityMapId, payload) {
      return this.request.patch('/activitymaps/' + activityMapId, payload);
    }
  }, {
    key: 'postActivityMapQuery',
    value: function postActivityMapQuery(activityMapId, payload) {
      return this.request.post('/activitymaps/' + activityMapId + '/query', payload);
    }
  }, {
    key: 'getActivityMapSharing',
    value: function getActivityMapSharing(activityMapId) {
      return this.request.get('/activitymaps/' + activityMapId + '/sharing');
    }
  }, {
    key: 'patchActivityMapSharing',
    value: function patchActivityMapSharing(activityMapId, payload) {
      return this.request.patch('/activitymaps/' + activityMapId + '/sharing', payload);
    }
  }, {
    key: 'putActivityMapSharing',
    value: function putActivityMapSharing(activityMapId, payload) {
      return this.request.put('/activitymaps/' + activityMapId + '/sharing', payload);
    }

    // -------------------------------------
    // API: Alerts
    // -------------------------------------

  }, {
    key: 'getAlerts',
    value: function getAlerts() {
      return this.request.get('/alerts');
    }
  }, {
    key: 'postAlert',
    value: function postAlert(payload) {
      return this.request.post('/alerts', payload);
    }
  }, {
    key: 'deleteAlert',
    value: function deleteAlert(alertId) {
      return this.request.delete('/alerts/' + alertId);
    }
  }, {
    key: 'getAlert',
    value: function getAlert(alertId) {
      return this.request.get('/alerts/' + alertId);
    }
  }, {
    key: 'patchAlert',
    value: function patchAlert(alertId, payload) {
      return this.request.patch('/alerts/' + alertId, payload);
    }
  }, {
    key: 'getAlertApplications',
    value: function getAlertApplications(alertId) {
      return this.request.get('/alerts/' + alertId + '/applications');
    }
  }, {
    key: 'postAlertApplications',
    value: function postAlertApplications(alertId, payload) {
      return this.request.post('/alerts/' + alertId + '/applications', payload);
    }
  }, {
    key: 'deleteAlertApplication',
    value: function deleteAlertApplication(alertId, applicationId) {
      return this.request.delete('/alerts/' + alertId + '/applications/' + applicationId);
    }
  }, {
    key: 'postAlertApplication',
    value: function postAlertApplication(alertId, applicationId) {
      return this.request.post('/alerts/' + alertId + '/applications/' + applicationId);
    }
  }, {
    key: 'getAlertDeviceGroups',
    value: function getAlertDeviceGroups(alertId) {
      return this.request.get('/alerts/' + alertId + '/devicegroups');
    }
  }, {
    key: 'postAlertDeviceGroups',
    value: function postAlertDeviceGroups(alertId, payload) {
      return this.request.post('/alerts/' + alertId + '/devicegroups', payload);
    }
  }, {
    key: 'deleteAlertDeviceGroup',
    value: function deleteAlertDeviceGroup(alertId, deviceGroupId) {
      return this.request.delete('/alerts/' + alertId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'postAlertDeviceGroup',
    value: function postAlertDeviceGroup(alertId, deviceGroupId) {
      return this.request.post('/alerts/' + alertId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'getAlertDevices',
    value: function getAlertDevices(alertId) {
      return this.request.get('/alerts/' + alertId + '/devices');
    }
  }, {
    key: 'postAlertDevices',
    value: function postAlertDevices(alertId, payload) {
      return this.request.post('/alerts/' + alertId + '/devices', payload);
    }
  }, {
    key: 'deleteAlertDevice',
    value: function deleteAlertDevice(alertId, deviceId) {
      return this.request.delete('/alerts/' + alertId + '/devices/' + deviceId);
    }
  }, {
    key: 'postAlertDevice',
    value: function postAlertDevice(alertId, deviceId) {
      return this.request.post('/alerts/' + alertId + '/devices/' + deviceId);
    }
  }, {
    key: 'getAlertEmailGroups',
    value: function getAlertEmailGroups(alertId) {
      return this.request.get('/alerts/' + alertId + '/emailgroups');
    }
  }, {
    key: 'postAlertEmailGroups',
    value: function postAlertEmailGroups(alertId, payload) {
      return this.request.post('/alerts/' + alertId + '/emailgroups', payload);
    }
  }, {
    key: 'deleteAlertEmailGroup',
    value: function deleteAlertEmailGroup(alertId, emailGroupId) {
      return this.request.delete('/alerts/' + alertId + '/emailgroups/' + emailGroupId);
    }
  }, {
    key: 'postAlertEmailGroup',
    value: function postAlertEmailGroup(alertId, emailGroupId) {
      return this.request.post('/alerts/' + alertId + '/emailgroups/' + emailGroupId);
    }
  }, {
    key: 'getAlertExclusionIntervals',
    value: function getAlertExclusionIntervals(alertId) {
      return this.request.get('/alerts/' + alertId + '/exclusionintervals');
    }
  }, {
    key: 'postAlertExclusionIntervals',
    value: function postAlertExclusionIntervals(alertId, payload) {
      return this.request.post('/alerts/' + alertId + '/exclusionintervals', payload);
    }
  }, {
    key: 'deleteAlertExclusionInterval',
    value: function deleteAlertExclusionInterval(alertId, exclusionIntervalId) {
      return this.request.delete('/alerts/' + alertId + '/exclusionintervals/' + exclusionIntervalId);
    }
  }, {
    key: 'postAlertExclusionInterval',
    value: function postAlertExclusionInterval(alertId, exclusionIntervalId) {
      return this.request.post('/alerts/' + alertId + '/exclusionintervals/' + exclusionIntervalId);
    }
  }, {
    key: 'getAlertNetworks',
    value: function getAlertNetworks(alertId) {
      return this.request.get('/alerts/' + alertId + '/networks');
    }
  }, {
    key: 'postAlertNetworks',
    value: function postAlertNetworks(alertId, payload) {
      return this.request.post('/alerts/' + alertId + '/networks', payload);
    }
  }, {
    key: 'deleteAlertNetwork',
    value: function deleteAlertNetwork(alertId, networkId) {
      return this.request.delete('/alerts/' + alertId + '/networks/' + networkId);
    }
  }, {
    key: 'postAlertNetwork',
    value: function postAlertNetwork(alertId, networkId) {
      return this.request.post('/alerts/' + alertId + '/networks/' + networkId);
    }
  }, {
    key: 'getAlertStats',
    value: function getAlertStats(alertId) {
      return this.request.get('/alerts/' + alertId + '/stats');
    }

    // -------------------------------------
    // API: Analysis Priority
    // -------------------------------------

  }, {
    key: 'getAnalysisPriority',
    value: function getAnalysisPriority(applianceId) {
      return this.request.get('/analysispriority/config/' + applianceId);
    }
  }, {
    key: 'putAnalysisPriority',
    value: function putAnalysisPriority(applianceId, payload) {
      return this.request.put('/analysispriority/config/' + applianceId, payload);
    }
  }, {
    key: 'getAnalysisPriorityManager',
    value: function getAnalysisPriorityManager(applianceId) {
      return this.request.get('/analysispriority/' + applianceId + '/manager');
    }
  }, {
    key: 'patchAnalysisPriorityManager',
    value: function patchAnalysisPriorityManager(applianceId, payload) {
      return this.request.patch('/analysispriority/' + applianceId + '/manager', payload);
    }

    // -------------------------------------
    // API: API
    // -------------------------------------

  }, {
    key: 'getApikeys',
    value: function getApikeys() {
      return this.request.get('/apikeys');
    }
  }, {
    key: 'getApikey',
    value: function getApikey(keyId) {
      return this.request.get('/apikeys/' + keyId);
    }
  }, {
    key: 'postApikeys',
    value: function postApikeys(payload) {
      return this.request.post('/apikeys', payload);
    }

    // -------------------------------------
    // API: Appliances
    // -------------------------------------

  }, {
    key: 'getAppliances',
    value: function getAppliances() {
      return this.request.get('/appliances');
    }
  }, {
    key: 'getAppliance',
    value: function getAppliance(applianceId) {
      return this.request.get('/appliances/' + applianceId);
    }
  }, {
    key: 'postAppliance',
    value: function postAppliance(payload) {
      return this.request.post('/appliances', payload);
    }
  }, {
    key: 'getApplianceCloudServices',
    value: function getApplianceCloudServices(applianceId) {
      return this.request.get('/appliances/' + applianceId + '/cloudservices');
    }
  }, {
    key: 'getApplianceProductKey',
    value: function getApplianceProductKey(applianceId) {
      return this.request.get('/appliances/' + applianceId + '/productkey');
    }

    // -------------------------------------
    // API: Applications
    // -------------------------------------

  }, {
    key: 'getApplications',
    value: function getApplications(_ref) {
      var active_from = _ref.active_from,
          active_until = _ref.active_until,
          limit = _ref.limit,
          offset = _ref.offset,
          searchType = _ref.searchType,
          value = _ref.value;

      return this.request.get('/applications', { active_from: active_from, active_until: active_until, limit: limit, offset: offset, searchType: searchType, value: value });
    }
  }, {
    key: 'getApplication',
    value: function getApplication(applicationId) {
      return this.request.get('/applications/' + applicationId);
    }
  }, {
    key: 'postApplication',
    value: function postApplication(applicationId, payload) {
      return this.request.post('/applications/' + applicationId, payload);
    }
  }, {
    key: 'patchApplication',
    value: function patchApplication(applicationId, payload) {
      return this.request.patch('/applications/' + applicationId, payload);
    }
  }, {
    key: 'getApplicationActivity',
    value: function getApplicationActivity(applicationId) {
      return this.request.get('/applications/' + applicationId + '/activity');
    }
  }, {
    key: 'getApplicationAlerts',
    value: function getApplicationAlerts(applicationId) {
      return this.request.get('/applications/' + applicationId + '/alerts');
    }
  }, {
    key: 'postApplicationAlerts',
    value: function postApplicationAlerts(applicationId, payload) {
      return this.request.post('/applications/' + applicationId + '/alerts', payload);
    }
  }, {
    key: 'deleteApplicationAlert',
    value: function deleteApplicationAlert(applicationId, alertId) {
      return this.request.delete('/applications/' + applicationId + '/alerts/' + alertId);
    }
  }, {
    key: 'postApplicationAlert',
    value: function postApplicationAlert(applicationId, alertId) {
      return this.request.post('/applications/' + applicationId + '/alerts/' + alertId);
    }
  }, {
    key: 'getApplicationDashboards',
    value: function getApplicationDashboards(applicationId) {
      return this.request.get('/applications/' + applicationId + '/dashboards');
    }
  }, {
    key: 'getApplicationFlexGrids',
    value: function getApplicationFlexGrids(applicationId) {
      return this.request.get('/applications/' + applicationId + '/flexgrids');
    }
  }, {
    key: 'postApplicationFlexGrids',
    value: function postApplicationFlexGrids(applicationId, payload) {
      return this.request.post('/applications/' + applicationId + '/flexgrids', payload);
    }
  }, {
    key: 'deleteApplicationFlexGrid',
    value: function deleteApplicationFlexGrid(applicationId, flexGridId) {
      return this.request.delete('/applications/' + applicationId + '/flexgrids/' + flexGridId);
    }
  }, {
    key: 'postApplicationFlexGrid',
    value: function postApplicationFlexGrid(applicationId, flexGridId) {
      return this.request.post('/applications/' + applicationId + '/flexgrids/' + flexGridId);
    }
  }, {
    key: 'getApplicationGeomaps',
    value: function getApplicationGeomaps(applicationId) {
      return this.request.get('/applications/' + applicationId + '/geomaps');
    }
  }, {
    key: 'postApplicationGeomaps',
    value: function postApplicationGeomaps(applicationId, payload) {
      return this.request.post('/applications/' + applicationId + '/geomaps', payload);
    }
  }, {
    key: 'deleteApplicationGeomap',
    value: function deleteApplicationGeomap(applicationId, geomapId) {
      return this.request.delete('/applications/' + applicationId + '/geomaps/' + geomapId);
    }
  }, {
    key: 'postApplicationGeomap',
    value: function postApplicationGeomap(applicationId, geomapId) {
      return this.request.post('/applications/' + applicationId + '/geomaps/' + geomapId);
    }
  }, {
    key: 'getApplicationPages',
    value: function getApplicationPages(applicationId) {
      return this.request.get('/applications/' + applicationId + '/pages');
    }
  }, {
    key: 'postApplicationPages',
    value: function postApplicationPages(applicationId, payload) {
      return this.request.post('/applications/' + applicationId + '/pages', payload);
    }
  }, {
    key: 'deleteApplicationPage',
    value: function deleteApplicationPage(applicationId, pageId) {
      return this.request.delete('/applications/' + applicationId + '/pages/' + pageId);
    }
  }, {
    key: 'postApplicationPage',
    value: function postApplicationPage(applicationId, pageId) {
      return this.request.post('/applications/' + applicationId + '/pages/' + pageId);
    }

    // -------------------------------------
    // API: Audit Log
    // -------------------------------------

  }, {
    key: 'getAuditLog',
    value: function getAuditLog(limit, offset) {
      return this.request.get('/auditlog', { limit: limit, offset: offset });
    }

    // -------------------------------------
    // API: Bundles
    // -------------------------------------

  }, {
    key: 'getBundles',
    value: function getBundles() {
      return this.request.get('/bundles');
    }
  }, {
    key: 'postBundle',
    value: function postBundle(payload) {
      return this.request.post('/bundles', payload);
    }
  }, {
    key: 'deleteBundle',
    value: function deleteBundle(bundleId) {
      return this.request.delete('/bundles/' + bundleId);
    }
  }, {
    key: 'getBundle',
    value: function getBundle(bundleId) {
      return this.request.get('/bundles/' + bundleId);
    }
  }, {
    key: 'postBundleApply',
    value: function postBundleApply(bundleId, payload) {
      return this.request.post('/bundles/' + bundleId + '/apply', payload);
    }

    // -------------------------------------
    // API: Custom Devices
    // -------------------------------------

  }, {
    key: 'getCustomDevices',
    value: function getCustomDevices(params) {
      return this.request.get('/customdevices', params);
    }
  }, {
    key: 'postCustomDevice',
    value: function postCustomDevice(payload) {
      return this.request.post('/customdevices', payload);
    }
  }, {
    key: 'deleteCustomDevice',
    value: function deleteCustomDevice(customDeviceId) {
      return this.request.delete('/customdevices/' + customDeviceId);
    }
  }, {
    key: 'getCustomDevice',
    value: function getCustomDevice(customDeviceId, criteria) {
      return this.request.get('/customdevices/' + customDeviceId, { include_criteria: criteria });
    }
  }, {
    key: 'patchCustomDevice',
    value: function patchCustomDevice(customDeviceId, payload) {
      return this.request.patch('/customdevices/' + customDeviceId, payload);
    }
  }, {
    key: 'getCustomDeviceCriteria',
    value: function getCustomDeviceCriteria(customDeviceId) {
      return this.request.get('/customdevices/' + customDeviceId + '/criteria');
    }
  }, {
    key: 'postCustomDeviceCriteria',
    value: function postCustomDeviceCriteria(customDeviceId, payload) {
      return this.request.post('/customdevices/' + customDeviceId + '/criteria', payload);
    }
  }, {
    key: 'deleteCustomDeviceCriteria',
    value: function deleteCustomDeviceCriteria(customDeviceId, criteriaId) {
      return this.request.delete('/customdevices/' + customDeviceId + '/criteria/' + criteriaId);
    }
  }, {
    key: 'getCustomDeviceCriterion',
    value: function getCustomDeviceCriterion(customDeviceId, criteriaId) {
      return this.request.get('/customdevices/' + customDeviceId + '/criteria/' + criteriaId);
    }

    // -------------------------------------
    // API: Customizations
    // -------------------------------------

  }, {
    key: 'getCustomizations',
    value: function getCustomizations() {
      return this.request.get('/customizations');
    }
  }, {
    key: 'postCustomization',
    value: function postCustomization(payload) {
      return this.request.post('/customizations', payload);
    }
  }, {
    key: 'getCustomizationsStatus',
    value: function getCustomizationsStatus() {
      return this.request.get('/customizations/status');
    }
  }, {
    key: 'deleteCustomization',
    value: function deleteCustomization(customizationId) {
      return this.request.delete('/customizations/' + customizationId);
    }
  }, {
    key: 'getCustomization',
    value: function getCustomization(customizationId) {
      return this.request.get('/customizations/' + customizationId);
    }
  }, {
    key: 'postCustomizationApply',
    value: function postCustomizationApply(customizationId) {
      return this.request.post('/customizations/' + customizationId + '/apply');
    }
  }, {
    key: 'postCustomizationDownload',
    value: function postCustomizationDownload(customizationId) {
      return this.request.post('/customizations/' + customizationId + '/download');
    }

    // -------------------------------------
    // API: Dashboards
    // -------------------------------------

  }, {
    key: 'getDashboards',
    value: function getDashboards() {
      return this.request.get('/dashboards');
    }
  }, {
    key: 'deleteDashboard',
    value: function deleteDashboard(dashboardId) {
      return this.request.delete('/dashboards/' + dashboardId);
    }
  }, {
    key: 'getDashboard',
    value: function getDashboard(dashboardId) {
      return this.request.get('/dashboards/' + dashboardId);
    }
  }, {
    key: 'patchDashboard',
    value: function patchDashboard(dashboardId, payload) {
      return this.request.patch('/dashboards/' + dashboardId, payload);
    }
  }, {
    key: 'getDashboardReports',
    value: function getDashboardReports(dashboardId) {
      return this.request.get('/dashboards/' + dashboardId + '/reports');
    }
  }, {
    key: 'getDashboardSharing',
    value: function getDashboardSharing(dashboardId) {
      return this.request.get('/dashboards/' + dashboardId + '/sharing');
    }
  }, {
    key: 'patchDashboardSharing',
    value: function patchDashboardSharing(dashboardId, payload) {
      return this.request.patch('/dashboards/' + dashboardId + '/sharing', payload);
    }
  }, {
    key: 'putDashboardSharing',
    value: function putDashboardSharing(dashboardId, payload) {
      return this.request.put('/dashboards/' + dashboardId + '/sharing', payload);
    }

    // -------------------------------------
    // API: Devices
    // -------------------------------------

  }, {
    key: 'getDevices',
    value: function getDevices(_ref2) {
      var search_type = _ref2.search_type,
          value = _ref2.value,
          limit = _ref2.limit,
          offset = _ref2.offset,
          active_from = _ref2.active_from,
          active_until = _ref2.active_until;

      return this.request.get('/devices', { search_type: search_type, value: value, limit: limit, offset: offset, active_from: active_from, active_until: active_until });
    }
  }, {
    key: 'postDeviceSearch',
    value: function postDeviceSearch(payload) {
      return this.request.post('/devices/search', payload);
    }
  }, {
    key: 'getDevice',
    value: function getDevice(deviceId) {
      return this.request.get('/devices/' + deviceId);
    }
  }, {
    key: 'patchDevice',
    value: function patchDevice(deviceId, payload) {
      return this.request.patch('/devices/' + deviceId, payload);
    }
  }, {
    key: 'getDeviceActivity',
    value: function getDeviceActivity(deviceId) {
      return this.request.get('/devices/' + deviceId + '/activity');
    }
  }, {
    key: 'getDeviceAlerts',
    value: function getDeviceAlerts(deviceId, criteria) {
      return this.request.get('/devices/' + deviceId + '/alerts', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postDeviceAlerts',
    value: function postDeviceAlerts(deviceId, payload) {
      return this.request.post('/devices/' + deviceId + '/alerts', payload);
    }
  }, {
    key: 'deleteDeviceAlert',
    value: function deleteDeviceAlert(deviceId, alertId) {
      return this.request.delete('/devices/' + deviceId + '/alerts/' + alertId);
    }
  }, {
    key: 'postDeviceAlert',
    value: function postDeviceAlert(deviceId, alertId) {
      return this.request.post('/devices/' + deviceId + '/alerts/' + alertId);
    }
  }, {
    key: 'getDeviceDashboards',
    value: function getDeviceDashboards(deviceId) {
      return this.request.get('/devices/' + deviceId + '/dashboards');
    }
  }, {
    key: 'getDeviceDeviceGroups',
    value: function getDeviceDeviceGroups(deviceId) {
      return this.request.get('/devices/' + deviceId + '/devicegroups');
    }
  }, {
    key: 'postDeviceDeviceGroups',
    value: function postDeviceDeviceGroups(deviceId, payload) {
      return this.request.post('/devices/' + deviceId + '/devicegroups', payload);
    }
  }, {
    key: 'deleteDeviceDeviceGroup',
    value: function deleteDeviceDeviceGroup(deviceId, deviceGroupId) {
      return this.request.delete('/devices/' + deviceId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'postDeviceDeviceGroup',
    value: function postDeviceDeviceGroup(deviceId, deviceGroupId) {
      return this.request.post('/devices/' + deviceId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'getDeviceFlexGrids',
    value: function getDeviceFlexGrids(deviceId) {
      return this.request.get('/devices/' + deviceId + '/flexgrids');
    }
  }, {
    key: 'postDeviceFlexGrids',
    value: function postDeviceFlexGrids(deviceId, payload) {
      return this.request.post('/devices/' + deviceId + '/flexgrids', payload);
    }
  }, {
    key: 'deleteDeviceFlexGrid',
    value: function deleteDeviceFlexGrid(deviceId, flexGridId) {
      return this.request.delete('/devices/' + deviceId + '/flexgrids/' + flexGridId);
    }
  }, {
    key: 'postDeviceFlexGrid',
    value: function postDeviceFlexGrid(deviceId, flexGridId) {
      return this.request.post('/devices/' + deviceId + '/flexgrids/' + flexGridId);
    }
  }, {
    key: 'getDeviceGeomaps',
    value: function getDeviceGeomaps(deviceId, criteria) {
      return this.request.get('/devices/' + deviceId + '/geomaps', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postDeviceGeomaps',
    value: function postDeviceGeomaps(deviceId, payload) {
      return this.request.post('/devices/' + deviceId + '/geomaps', payload);
    }
  }, {
    key: 'deleteDeviceGeomap',
    value: function deleteDeviceGeomap(deviceId, geomapId) {
      return this.request.delete('/devices/' + deviceId + '/geomaps/' + geomapId);
    }
  }, {
    key: 'postDeviceGeomap',
    value: function postDeviceGeomap(deviceId, geomapId) {
      return this.request.post('/devices/' + deviceId + '/geomaps/' + geomapId);
    }
  }, {
    key: 'getDevicePages',
    value: function getDevicePages(deviceId, criteria) {
      return this.request.get('/devices/' + deviceId + '/pages', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postDevicePages',
    value: function postDevicePages(deviceId, payload) {
      return this.request.post('/devices/' + deviceId + '/pages', payload);
    }
  }, {
    key: 'deleteDevicePage',
    value: function deleteDevicePage(deviceId, pageId) {
      return this.request.delete('/devices/' + deviceId + '/pages/' + pageId);
    }
  }, {
    key: 'postDevicePage',
    value: function postDevicePage(deviceId, pageId) {
      return this.request.post('/devices/' + deviceId + '/pages/' + pageId);
    }
  }, {
    key: 'getDeviceTags',
    value: function getDeviceTags(deviceId) {
      return this.request.get('/devices/' + deviceId + '/tags');
    }
  }, {
    key: 'postDeviceTags',
    value: function postDeviceTags(deviceId, payload) {
      return this.request.post('/devices/' + deviceId + '/tags', payload);
    }
  }, {
    key: 'deleteDeviceTag',
    value: function deleteDeviceTag(deviceId, tagId) {
      return this.request.delete('/devices/' + deviceId + '/tags/' + tagId);
    }
  }, {
    key: 'postDeviceTag',
    value: function postDeviceTag(deviceId, tagId) {
      return this.request.post('/devices/' + deviceId + '/tags/' + tagId);
    }
  }, {
    key: 'getDeviceTriggers',
    value: function getDeviceTriggers(deviceId, criteria) {
      return this.request.get('/devices/' + deviceId + '/triggers', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postDeviceTriggers',
    value: function postDeviceTriggers(deviceId, payload) {
      return this.request.post('/devices/' + deviceId + '/triggers', payload);
    }
  }, {
    key: 'deleteDeviceTrigger',
    value: function deleteDeviceTrigger(deviceId, triggerId) {
      return this.request.delete('/devices/' + deviceId + '/triggers/' + triggerId);
    }
  }, {
    key: 'postDeviceTrigger',
    value: function postDeviceTrigger(deviceId, triggerId) {
      return this.request.post('/devices/' + deviceId + '/triggers/' + triggerId);
    }

    // -------------------------------------
    // API: Device Groups
    // -------------------------------------

  }, {
    key: 'getDeviceGroups',
    value: function getDeviceGroups(since, all, name) {
      return this.request.get('/devicegroups', { since: since, all: all, name: name });
    }
  }, {
    key: 'postDeviceGroup',
    value: function postDeviceGroup(payload) {
      return this.request.post('/devicegroups', payload);
    }
  }, {
    key: 'deleteDeviceGroup',
    value: function deleteDeviceGroup(deviceGroupId) {
      return this.request.delete('/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'getDeviceGroup',
    value: function getDeviceGroup(deviceGroupId) {
      return this.request.get('/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'patchDeviceGroup',
    value: function patchDeviceGroup(deviceGroupId, payload) {
      return this.request.patch('/devicegroups/' + deviceGroupId, payload);
    }
  }, {
    key: 'getDeviceGroupAlerts',
    value: function getDeviceGroupAlerts(deviceGroupId, criteria) {
      return this.request.get('/devicegroups/' + deviceGroupId + '/alerts', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postDeviceGroupAlerts',
    value: function postDeviceGroupAlerts(deviceGroupId, payload) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/alerts', payload);
    }
  }, {
    key: 'deleteDeviceGroupAlert',
    value: function deleteDeviceGroupAlert(deviceGroupId, alertId) {
      return this.request.delete('/devicegroups/' + deviceGroupId + '/alerts/' + alertId);
    }
  }, {
    key: 'postDeviceGroupAlert',
    value: function postDeviceGroupAlert(deviceGroupId, alertId) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/alerts/' + alertId);
    }
  }, {
    key: 'getDeviceGroupDashboards',
    value: function getDeviceGroupDashboards(deviceGroupId) {
      return this.request.get('/devicegroups/' + deviceGroupId + '/dashboards');
    }
  }, {
    key: 'getDeviceGroupDevices',
    value: function getDeviceGroupDevices(deviceGroupId, _ref3) {
      var active_from = _ref3.active_from,
          active_until = _ref3.active_until,
          limit = _ref3.limit,
          offset = _ref3.offset;

      return this.request.get('/devicegroups/' + deviceGroupId + '/devices', { active_from: active_from, active_until: active_until, limit: limit, offset: offset });
    }
  }, {
    key: 'postDeviceGroupDevices',
    value: function postDeviceGroupDevices(deviceGroupId, payload) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/devices', payload);
    }
  }, {
    key: 'deleteDeviceGroupDevice',
    value: function deleteDeviceGroupDevice(deviceGroupId, deviceId) {
      return this.request.delete('/devicegroups/' + deviceGroupId + '/devices/' + deviceId);
    }
  }, {
    key: 'postDeviceGroupDevice',
    value: function postDeviceGroupDevice(deviceGroupId, deviceId) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/devices/' + deviceId);
    }
  }, {
    key: 'getDeviceGroupFlexGrids',
    value: function getDeviceGroupFlexGrids(deviceGroupId) {
      return this.request.get('/devicegroups/' + deviceGroupId + '/flexgrids');
    }
  }, {
    key: 'postDeviceGroupFlexGrids',
    value: function postDeviceGroupFlexGrids(deviceGroupId, payload) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/flexgrids', payload);
    }
  }, {
    key: 'deleteDeviceGroupFlexGrid',
    value: function deleteDeviceGroupFlexGrid(deviceGroupId, flexGridId) {
      return this.request.delete('/devicegroups/' + deviceGroupId + '/flexgrids/' + flexGridId);
    }
  }, {
    key: 'postDeviceGroupFlexGrid',
    value: function postDeviceGroupFlexGrid(deviceGroupId, flexGridId) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/flexgrids/' + flexGridId);
    }
  }, {
    key: 'getDeviceGroupGeomaps',
    value: function getDeviceGroupGeomaps(deviceGroupId, criteria) {
      return this.request.get('/devicegroups/' + deviceGroupId + '/geomaps', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postDeviceGroupGeomaps',
    value: function postDeviceGroupGeomaps(deviceGroupId, payload) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/geomaps', payload);
    }
  }, {
    key: 'deleteDeviceGroupGeomap',
    value: function deleteDeviceGroupGeomap(deviceGroupId, geomapId) {
      return this.request.delete('/devicegroups/' + deviceGroupId + '/geomaps/' + geomapId);
    }
  }, {
    key: 'postDeviceGroupGeomap',
    value: function postDeviceGroupGeomap(deviceGroupId, geomapId) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/geomaps/' + geomapId);
    }
  }, {
    key: 'getDeviceGroupPages',
    value: function getDeviceGroupPages(deviceGroupId, criteria) {
      return this.request.get('/devicegroups/' + deviceGroupId + '/pages', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postDeviceGroupPages',
    value: function postDeviceGroupPages(deviceGroupId, payload) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/pages', payload);
    }
  }, {
    key: 'deleteDeviceGroupPage',
    value: function deleteDeviceGroupPage(deviceGroupId, pageId) {
      return this.request.delete('/devicegroups/' + deviceGroupId + '/pages/' + pageId);
    }
  }, {
    key: 'postDeviceGroupPage',
    value: function postDeviceGroupPage(deviceGroupId, pageId) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/pages/' + pageId);
    }
  }, {
    key: 'getDeviceGroupTags',
    value: function getDeviceGroupTags(deviceGroupId) {
      return this.request.get('/devicegroups/' + deviceGroupId + '/tags');
    }
  }, {
    key: 'postDeviceGroupTags',
    value: function postDeviceGroupTags(deviceGroupId, payload) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/tags', payload);
    }
  }, {
    key: 'deleteDeviceGroupTag',
    value: function deleteDeviceGroupTag(deviceGroupId, tagId) {
      return this.request.delete('/devicegroups/' + deviceGroupId + '/tags/' + tagId);
    }
  }, {
    key: 'postDeviceGroupTag',
    value: function postDeviceGroupTag(deviceGroupId, tagId) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/tags/' + tagId);
    }
  }, {
    key: 'getDeviceGroupTriggers',
    value: function getDeviceGroupTriggers(deviceGroupId, criteria) {
      return this.request.get('/devicegroups/' + deviceGroupId + '/triggers', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postDeviceGroupTriggers',
    value: function postDeviceGroupTriggers(deviceGroupId, payload) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/triggers', payload);
    }
  }, {
    key: 'deleteDeviceGroupTrigger',
    value: function deleteDeviceGroupTrigger(deviceGroupId, triggerId) {
      return this.request.delete('/devicegroups/' + deviceGroupId + '/triggers/' + triggerId);
    }
  }, {
    key: 'postDeviceGroupTrigger',
    value: function postDeviceGroupTrigger(deviceGroupId, triggerId) {
      return this.request.post('/devicegroups/' + deviceGroupId + '/triggers/' + triggerId);
    }

    // -------------------------------------
    // API: Email Groups
    // -------------------------------------

  }, {
    key: 'getEmailGroups',
    value: function getEmailGroups() {
      return this.request.get('/emailgroups');
    }
  }, {
    key: 'postEmailGroup',
    value: function postEmailGroup(payload) {
      return this.request.post('/emailgroups', payload);
    }
  }, {
    key: 'deleteEmailGroup',
    value: function deleteEmailGroup(emailGroupId) {
      return this.request.delete('/emailgroups/' + emailGroupId);
    }
  }, {
    key: 'getEmailGroup',
    value: function getEmailGroup(emailGroupId) {
      return this.request.get('/emailgroups/' + emailGroupId);
    }
  }, {
    key: 'patchEmailGroup',
    value: function patchEmailGroup(emailGroupId, payload) {
      return this.request.patch('/emailgroups/' + emailGroupId, payload);
    }

    // -------------------------------------
    // API: Exclusion Intervals
    // -------------------------------------

  }, {
    key: 'getExclusionIntervals',
    value: function getExclusionIntervals() {
      return this.request.get('/exclusionintervals');
    }
  }, {
    key: 'postExclusionInterval',
    value: function postExclusionInterval(payload) {
      return this.request.post('/exclusionintervals', payload);
    }
  }, {
    key: 'deleteExclusionInterval',
    value: function deleteExclusionInterval(exclusionIntervalId) {
      return this.request.delete('/exclusionintervals/' + exclusionIntervalId);
    }
  }, {
    key: 'getExclusionInterval',
    value: function getExclusionInterval(exclusionIntervalId) {
      return this.request.get('/exclusionintervals/' + exclusionIntervalId);
    }
  }, {
    key: 'patchExclusionInterval',
    value: function patchExclusionInterval(exclusionIntervalId, payload) {
      return this.request.patch('/exclusionintervals/' + exclusionIntervalId, payload);
    }

    // -------------------------------------
    // API: Extrahop
    // -------------------------------------

  }, {
    key: 'getExtrahop',
    value: function getExtrahop() {
      return this.request.get('/extrahop');
    }
  }, {
    key: 'getExtrahopIdrac',
    value: function getExtrahopIdrac() {
      return this.request.get('/extrahop/idrac');
    }
  }, {
    key: 'getExtrahopPlatform',
    value: function getExtrahopPlatform() {
      return this.request.get('/extrahop/platform');
    }
  }, {
    key: 'getExtrahopProcesses',
    value: function getExtrahopProcesses() {
      return this.request.get('/extrahop/processes');
    }
  }, {
    key: 'postExtrahopProcessRestart',
    value: function postExtrahopProcessRestart(processId) {
      return this.request.post('/extrahop/processes/' + processId + '/restart');
    }
  }, {
    key: 'postExtrahopSSLCert',
    value: function postExtrahopSSLCert() {
      return this.request.post('/extrahop/sslcert');
    }
  }, {
    key: 'putExtrahopSSLCert',
    value: function putExtrahopSSLCert(payload) {
      return this.request.put('/extrahop/sslcert', payload);
    }
  }, {
    key: 'getExtrahopVersion',
    value: function getExtrahopVersion() {
      return this.request.get('/extrahop/version');
    }

    // -------------------------------------
    // API: Flex Grids
    // -------------------------------------

  }, {
    key: 'getFlexGrids',
    value: function getFlexGrids() {
      return this.request.get('/flexgrids');
    }
  }, {
    key: 'getFlexGridApplications',
    value: function getFlexGridApplications(flexGridId) {
      return this.request.get('/flexgrids/' + flexGridId + '/applications');
    }
  }, {
    key: 'postFlexGridApplications',
    value: function postFlexGridApplications(flexGridId, payload) {
      return this.request.post('/flexgrids/' + flexGridId + '/applications', payload);
    }
  }, {
    key: 'deleteFlexGridApplication',
    value: function deleteFlexGridApplication(flexGridId, applicationId) {
      return this.request.delete('/flexgrids/' + flexGridId + '/applications/' + applicationId);
    }
  }, {
    key: 'postFlexGridApplication',
    value: function postFlexGridApplication(flexGridId, applicationId) {
      return this.request.post('/flexgrids/' + flexGridId + '/applications/' + applicationId);
    }
  }, {
    key: 'getFlexGridDeviceGroups',
    value: function getFlexGridDeviceGroups(flexGridId) {
      return this.request.get('/flexgrids/' + flexGridId + '/devicegroups');
    }
  }, {
    key: 'postFlexGridDeviceGroups',
    value: function postFlexGridDeviceGroups(flexGridId, payload) {
      return this.request.post('/flexgrids/' + flexGridId + '/devicegroups', payload);
    }
  }, {
    key: 'deleteFlexGridDeviceGroup',
    value: function deleteFlexGridDeviceGroup(flexGridId, deviceGroupId) {
      return this.request.delete('/flexgrids/' + flexGridId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'postFlexGridDeviceGroup',
    value: function postFlexGridDeviceGroup(flexGridId, deviceGroupId) {
      return this.request.post('/flexgrids/' + flexGridId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'getFlexGridDevices',
    value: function getFlexGridDevices(flexGridId) {
      return this.request.get('/flexgrids/' + flexGridId + '/devices');
    }
  }, {
    key: 'postFlexGridDevices',
    value: function postFlexGridDevices(flexGridId, payload) {
      return this.request.post('/flexgrids/' + flexGridId + '/devices', payload);
    }
  }, {
    key: 'deleteFlexGridDevice',
    value: function deleteFlexGridDevice(flexGridId, deviceId) {
      return this.request.delete('/flexgrids/' + flexGridId + '/devices/' + deviceId);
    }
  }, {
    key: 'postFlexGridDevice',
    value: function postFlexGridDevice(flexGridId, deviceId) {
      return this.request.post('/flexgrids/' + flexGridId + '/devices/' + deviceId);
    }

    // -------------------------------------
    // API: Geomaps
    // -------------------------------------

  }, {
    key: 'getGeomaps',
    value: function getGeomaps() {
      return this.request.get('/geomaps');
    }
  }, {
    key: 'postGeomaps',
    value: function postGeomaps(payload) {
      return this.request.post('/geomaps', payload);
    }
  }, {
    key: 'deleteGeomap',
    value: function deleteGeomap(geomapId) {
      return this.request.delete('/geomaps/' + geomapId);
    }
  }, {
    key: 'getGeomap',
    value: function getGeomap(geomapId) {
      return this.request.get('/geomaps/' + geomapId);
    }
  }, {
    key: 'patchGeomap',
    value: function patchGeomap(geomapId, payload) {
      return this.request.patch('/geomaps/' + geomapId, payload);
    }
  }, {
    key: 'getGeomapApplications',
    value: function getGeomapApplications(geomapId) {
      return this.request.get('/geomaps/' + geomapId + '/applications');
    }
  }, {
    key: 'postGeomapApplications',
    value: function postGeomapApplications(geomapId, payload) {
      return this.request.post('/geomaps/' + geomapId + '/applications', payload);
    }
  }, {
    key: 'deleteGeomapApplication',
    value: function deleteGeomapApplication(geomapId, applicationId) {
      return this.request.delete('/geomaps/' + geomapId + '/applications/' + applicationId);
    }
  }, {
    key: 'postGeomapApplication',
    value: function postGeomapApplication(geomapId, applicationId) {
      return this.request.post('/geomaps/' + geomapId + '/applications/' + applicationId);
    }
  }, {
    key: 'getGeomapDeviceGroups',
    value: function getGeomapDeviceGroups(geomapId) {
      return this.request.get('/geomaps/' + geomapId + '/devicegroups');
    }
  }, {
    key: 'postGeomapDeviceGroups',
    value: function postGeomapDeviceGroups(geomapId, payload) {
      return this.request.post('/geomaps/' + geomapId + '/devicegroups', payload);
    }
  }, {
    key: 'deleteGeomapDeviceGroup',
    value: function deleteGeomapDeviceGroup(geomapId, deviceGroupId) {
      return this.request.delete('/geomaps/' + geomapId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'postGeomapDeviceGroup',
    value: function postGeomapDeviceGroup(geomapId, deviceGroupId) {
      return this.request.post('/geomaps/' + geomapId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'getGeomapDevices',
    value: function getGeomapDevices(geomapId) {
      return this.request.get('/geomaps/' + geomapId + '/devices');
    }
  }, {
    key: 'postGeomapDevices',
    value: function postGeomapDevices(geomapId, payload) {
      return this.request.post('/geomaps/' + geomapId + '/devices', payload);
    }
  }, {
    key: 'deleteGeomapDevice',
    value: function deleteGeomapDevice(geomapId, deviceId) {
      return this.request.delete('/geomaps/' + geomapId + '/devices/' + deviceId);
    }
  }, {
    key: 'postGeomapDevice',
    value: function postGeomapDevice(geomapId, deviceId) {
      return this.request.post('/geomaps/' + geomapId + '/devices/' + deviceId);
    }

    // -------------------------------------
    // API: License
    // -------------------------------------

  }, {
    key: 'getLicense',
    value: function getLicense() {
      return this.request.get('/license');
    }
  }, {
    key: 'putLicense',
    value: function putLicense(payload) {
      return this.request.put('/license', payload);
    }
  }, {
    key: 'getLicenseProductKey',
    value: function getLicenseProductKey() {
      return this.request.get('/license/productkey');
    }
  }, {
    key: 'putLicenseProductKey',
    value: function putLicenseProductKey(payload) {
      return this.request.put('/license/productkey', payload);
    }

    // -------------------------------------
    // API: Metrics
    // -------------------------------------

  }, {
    key: 'postMetrics',
    value: function postMetrics(payload) {
      return this.request.post('/metrics', payload);
    }
  }, {
    key: 'postMetricSeach',
    value: function postMetricSeach(payload) {
      return this.postMetrics(payload);
    }
  }, {
    key: 'postMetricsSeach',
    value: function postMetricsSeach(payload) {
      return this.postMetrics(payload);
    }
  }, {
    key: 'getMetricsNext',
    value: function getMetricsNext(xid) {
      return this.request.get('/metrics/next/' + xid);
    }
  }, {
    key: 'getNextMetrics',
    value: function getNextMetrics(xid) {
      return this.getMetricsNext(xid);
    }
  }, {
    key: 'postMetricsTotal',
    value: function postMetricsTotal(payload) {
      return this.request.post('/metrics/total', payload);
    }
  }, {
    key: 'postMetricsTotalByObject',
    value: function postMetricsTotalByObject(payload) {
      return this.request.post('/metrics/totalbyobject', payload);
    }

    // -------------------------------------
    // API: Networks
    // -------------------------------------

  }, {
    key: 'getNetworks',
    value: function getNetworks() {
      return this.request.get('/networks');
    }
  }, {
    key: 'getNetwork',
    value: function getNetwork(networkId) {
      return this.request.get('/networks/' + networkId);
    }
  }, {
    key: 'patchNetwork',
    value: function patchNetwork(networkId, payload) {
      return this.request.patch('/networks/' + networkId, payload);
    }
  }, {
    key: 'getNetworkAlerts',
    value: function getNetworkAlerts(networkId, criteria) {
      return this.request.get('/networks/' + networkId + '/alerts', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postNetworkAlerts',
    value: function postNetworkAlerts(networkId, payload) {
      return this.request.post('/networks/' + networkId + '/alerts', payload);
    }
  }, {
    key: 'deleteNetworkAlert',
    value: function deleteNetworkAlert(networkId, alertId) {
      return this.request.delete('/networks/' + networkId + '/alerts/' + alertId);
    }
  }, {
    key: 'postNetworkAlert',
    value: function postNetworkAlert(networkId, alertId) {
      return this.request.post('/networks/' + networkId + '/alerts/' + alertId);
    }
  }, {
    key: 'getNetworkPages',
    value: function getNetworkPages(networkId, criteria) {
      return this.request.get('/networks/' + networkId + '/pages', { direct_assignments_only: criteria });
    }
  }, {
    key: 'postNetworkPages',
    value: function postNetworkPages(networkId, payload) {
      return this.request.post('/networks/' + networkId + '/pages', payload);
    }
  }, {
    key: 'deleteNetworkPage',
    value: function deleteNetworkPage(networkId, pageId) {
      return this.request.delete('/networks/' + networkId + '/pages/' + pageId);
    }
  }, {
    key: 'postNetworkPage',
    value: function postNetworkPage(networkId, pageId) {
      return this.request.post('/networks/' + networkId + '/pages/' + pageId);
    }
  }, {
    key: 'getNetworkVlans',
    value: function getNetworkVlans(networkId) {
      return this.request.get('/networks/' + networkId + '/vlans');
    }

    // -------------------------------------
    // API: Network Locality Entry
    // -------------------------------------

  }, {
    key: 'getNetworkLocalities',
    value: function getNetworkLocalities() {
      return this.request.get('/networklocality');
    }
  }, {
    key: 'postNetworkLocality',
    value: function postNetworkLocality(payload) {
      return this.request.post('/networklocality', payload);
    }
  }, {
    key: 'deleteNetworkLocality',
    value: function deleteNetworkLocality(networkLocalityId) {
      return this.request.delete('/networklocality/' + networkLocalityId);
    }
  }, {
    key: 'getNetworkLocality',
    value: function getNetworkLocality(networkLocalityId) {
      return this.request.get('/networklocality/' + networkLocalityId);
    }
  }, {
    key: 'patchNetworkLocality',
    value: function patchNetworkLocality(networkLocalityId, payload) {
      return this.request.patch('/networklocality/' + networkLocalityId, payload);
    }

    // -------------------------------------
    // API: Nodes
    // -------------------------------------

  }, {
    key: 'getNodes',
    value: function getNodes() {
      return this.request.get('/nodes');
    }
  }, {
    key: 'getNode',
    value: function getNode(nodeId) {
      return this.request.get('/nodes/' + nodeId);
    }
  }, {
    key: 'patchNode',
    value: function patchNode(nodeId, payload) {
      return this.request.patch('/nodes/' + nodeId, payload);
    }

    // -------------------------------------
    // API: Packet Captures
    // -------------------------------------

  }, {
    key: 'getPacketCaptures',
    value: function getPacketCaptures() {
      return this.request.get('/packetcaptures');
    }
  }, {
    key: 'deletePacketCapture',
    value: function deletePacketCapture(packetCaptureId) {
      return this.request.delete('/packetcaptures/' + packetCaptureId);
    }
  }, {
    key: 'getPacketCapture',
    value: function getPacketCapture(packetCaptureId) {
      return this.request.get('/packetcaptures/' + packetCaptureId);
    }

    // -------------------------------------
    // API: Pages
    // -------------------------------------

  }, {
    key: 'getPages',
    value: function getPages() {
      return this.request.get('/pages');
    }
  }, {
    key: 'postPages',
    value: function postPages(payload) {
      return this.request.post('/pages', payload);
    }
  }, {
    key: 'deletePage',
    value: function deletePage(pageId) {
      return this.request.delete('/pages/' + pageId);
    }
  }, {
    key: 'getPage',
    value: function getPage(pageId) {
      return this.request.get('/pages/' + pageId);
    }
  }, {
    key: 'patchPage',
    value: function patchPage(pageId, payload) {
      return this.request.patch('/pages/' + pageId, payload);
    }
  }, {
    key: 'getPageApplications',
    value: function getPageApplications(pageId) {
      return this.request.get('/pages/' + pageId + '/applications');
    }
  }, {
    key: 'postPageApplications',
    value: function postPageApplications(pageId, payload) {
      return this.request.post('/pages/' + pageId + '/applications', payload);
    }
  }, {
    key: 'deletePageApplication',
    value: function deletePageApplication(pageId, applicationId) {
      return this.request.delete('/pages/' + pageId + '/applications/' + applicationId);
    }
  }, {
    key: 'postPageApplication',
    value: function postPageApplication(pageId, applicationId) {
      return this.request.post('/pages/' + pageId + '/applications/' + applicationId);
    }
  }, {
    key: 'getPageDeviceGroups',
    value: function getPageDeviceGroups(pageId) {
      return this.request.get('/pages/' + pageId + '/devicegroups');
    }
  }, {
    key: 'postPageDeviceGroups',
    value: function postPageDeviceGroups(pageId, payload) {
      return this.request.post('/pages/' + pageId + '/devicegroups', payload);
    }
  }, {
    key: 'deletePageDeviceGroup',
    value: function deletePageDeviceGroup(pageId, deviceGroupId) {
      return this.request.delete('/pages/' + pageId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'postPageDeviceGroup',
    value: function postPageDeviceGroup(pageId, deviceGroupId) {
      return this.request.post('/pages/' + pageId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'getPageDevices',
    value: function getPageDevices(pageId) {
      return this.request.get('/pages/' + pageId + '/devices');
    }
  }, {
    key: 'postPageDevices',
    value: function postPageDevices(pageId, payload) {
      return this.request.post('/pages/' + pageId + '/devices', payload);
    }
  }, {
    key: 'deletePageDevice',
    value: function deletePageDevice(pageId, deviceId) {
      return this.request.delete('/pages/' + pageId + '/devices/' + deviceId);
    }
  }, {
    key: 'postPageDevice',
    value: function postPageDevice(pageId, deviceId) {
      return this.request.post('/pages/' + pageId + '/devices/' + deviceId);
    }
  }, {
    key: 'getPageNetworks',
    value: function getPageNetworks(pageId) {
      return this.request.get('/pages/' + pageId + '/networks');
    }
  }, {
    key: 'postPageNetworks',
    value: function postPageNetworks(pageId, payload) {
      return this.request.post('/pages/' + pageId + '/networks', payload);
    }
  }, {
    key: 'deletePageNetwork',
    value: function deletePageNetwork(pageId, networkId) {
      return this.request.delete('/pages/' + pageId + '/networks/' + networkId);
    }
  }, {
    key: 'postPageNetwork',
    value: function postPageNetwork(pageId, networkId) {
      return this.request.post('/pages/' + pageId + '/networks/' + networkId);
    }

    // -------------------------------------
    // API: Record Logs
    // -------------------------------------

  }, {
    key: 'postRecordsCursor',
    value: function postRecordsCursor(payload, contextTtl) {
      return this.request.post('/records/cursor?context_ttl=' + contextTtl, payload);
    }
  }, {
    key: 'getRecordsCursor',
    value: function getRecordsCursor(cursor, contextTtl) {
      return this.request.get('/records/cursor/' + cursor + '?context_ttl=' + contextTtl);
    }
  }, {
    key: 'postRecordsSearch',
    value: function postRecordsSearch(payload) {
      return this.request.post('/records/search', payload);
    }
  }, {
    key: 'postRecordSearch',
    value: function postRecordSearch(payload) {
      return this.postRecordsSearch(payload);
    }

    // -------------------------------------
    // API: Reports
    // -------------------------------------

  }, {
    key: 'getReports',
    value: function getReports() {
      return this.request.get('/reports');
    }
  }, {
    key: 'postReport',
    value: function postReport(payload) {
      return this.request.post('/reports', payload);
    }
  }, {
    key: 'deleteReport',
    value: function deleteReport(reportId) {
      return this.request.delete('/reports/' + reportId);
    }
  }, {
    key: 'getReport',
    value: function getReport(reportId) {
      return this.request.get('/reports/' + reportId);
    }
  }, {
    key: 'patchReport',
    value: function patchReport(reportId, payload) {
      return this.request.patch('/reports/' + reportId, payload);
    }
  }, {
    key: 'getReportContents',
    value: function getReportContents(reportId) {
      return this.request.get('/reports/' + reportId + '/contents');
    }
  }, {
    key: 'putReportContents',
    value: function putReportContents(reportId, payload) {
      return this.request.put('/reports/' + reportId + '/contents', payload);
    }
  }, {
    key: 'getReportEmailGroups',
    value: function getReportEmailGroups(reportId) {
      return this.request.get('/reports/' + reportId + '/emailgroups');
    }
  }, {
    key: 'postReportEmailGroups',
    value: function postReportEmailGroups(reportId, payload) {
      return this.request.post('/reports/' + reportId + '/emailgroups', payload);
    }
  }, {
    key: 'deleteReportEmailGroup',
    value: function deleteReportEmailGroup(reportId, emailGroupId) {
      return this.request.delete('/reports/' + reportId + '/emailgroups/' + emailGroupId);
    }
  }, {
    key: 'postReportEmailGroup',
    value: function postReportEmailGroup(reportId, emailGroupId) {
      return this.request.post('/reports/' + reportId + '/emailgroups/' + emailGroupId);
    }
  }, {
    key: 'postReportQueue',
    value: function postReportQueue(reportId) {
      return this.request.post('/reports/' + reportId + '/queue');
    }

    // -------------------------------------
    // API: Running Config
    // -------------------------------------

  }, {
    key: 'getRunningConfig',
    value: function getRunningConfig(section) {
      return this.request.get('/runningconfig', { section: section });
    }
  }, {
    key: 'putRunningConfig',
    value: function putRunningConfig(payload) {
      return this.request.put('/runningconfig', payload);
    }
  }, {
    key: 'postRunningConfigSave',
    value: function postRunningConfigSave() {
      return this.request.post('/runningconfig/save');
    }
  }, {
    key: 'getRunningConfigSaved',
    value: function getRunningConfigSaved() {
      return this.request.get('/runningconfig/saved');
    }

    // -------------------------------------
    // API: Software
    // -------------------------------------

  }, {
    key: 'getSoftwares',
    value: function getSoftwares() {
      return this.request.get('/software');
    }
  }, {
    key: 'getSoftware',
    value: function getSoftware(softwareId) {
      return this.request.get('/software/' + softwareId);
    }

    // -------------------------------------
    // API: SSL Decrypt Keys
    // -------------------------------------

  }, {
    key: 'getSslDecryptKeys',
    value: function getSslDecryptKeys() {
      return this.request.get('/ssldecryptkeys');
    }
  }, {
    key: 'postSslDecryptKey',
    value: function postSslDecryptKey(payload) {
      return this.request.post('/ssldecryptkeys', payload);
    }
  }, {
    key: 'deleteSslDecryptKey',
    value: function deleteSslDecryptKey(sslDecryptKeyId) {
      return this.request.delete('/ssldecryptkeys/' + sslDecryptKeyId);
    }
  }, {
    key: 'getSslDecryptKey',
    value: function getSslDecryptKey(sslDecryptKeyId) {
      return this.request.get('/ssldecryptkeys/' + sslDecryptKeyId);
    }
  }, {
    key: 'patchSslDecryptKey',
    value: function patchSslDecryptKey(sslDecryptKeyId, payload) {
      return this.request.patch('/ssldecryptkeys/' + sslDecryptKeyId, payload);
    }
  }, {
    key: 'getSslDecryptKeyProtocols',
    value: function getSslDecryptKeyProtocols(sslDecryptKeyId) {
      return this.request.get('/ssldecrpytkeys/' + sslDecryptKeyId + '/protocols');
    }
  }, {
    key: 'postSslDecryptKeyProtocols',
    value: function postSslDecryptKeyProtocols(sslDecryptKeyId, payload) {
      return this.request.post('/ssldecrpytkeys/' + sslDecryptKeyId + '/protocols', payload);
    }
  }, {
    key: 'deleteSslDecryptKeyProtocol',
    value: function deleteSslDecryptKeyProtocol(sslDecryptKeyId, protocolId) {
      return this.request.delete('/ssldecrpytkeys/' + sslDecryptKeyId + '/protocols/' + protocolId);
    }

    // -------------------------------------
    // API: Support Packs
    // -------------------------------------

  }, {
    key: 'getSupportPacks',
    value: function getSupportPacks() {
      return this.request.get('/supportpacks');
    }
  }, {
    key: 'postSupportPackExecute',
    value: function postSupportPackExecute() {
      return this.request.post('/supportpacks/execute');
    }
  }, {
    key: 'getSupportPackQueue',
    value: function getSupportPackQueue(queueId) {
      return this.request.get(('/supportpacks/queue/' + encodeURIComponent)(queueId));
    }
  }, {
    key: 'getSupportPack',
    value: function getSupportPack(filename) {
      return this.request.get(('/supportpacks/' + encodeURIComponent)(filename));
    }

    // -------------------------------------
    // API: Tags
    // -------------------------------------

  }, {
    key: 'getTags',
    value: function getTags() {
      return this.request.get('/tags');
    }
  }, {
    key: 'postTag',
    value: function postTag(payload) {
      return this.request.post('/tags', payload);
    }
  }, {
    key: 'deleteTag',
    value: function deleteTag(tagId) {
      return this.request.delete('/tags/' + tagId);
    }
  }, {
    key: 'getTag',
    value: function getTag(tagId) {
      return this.request.get('/tags/' + tagId);
    }
  }, {
    key: 'patchTag',
    value: function patchTag(tagId, payload) {
      return this.request.patch('/tags/' + tagId, payload);
    }
  }, {
    key: 'getTagDevices',
    value: function getTagDevices(tagId) {
      return this.request.get('/tags/' + tagId + '/devices');
    }
  }, {
    key: 'postTagDevices',
    value: function postTagDevices(tagId, payload) {
      return this.request.post('/tags/' + tagId + '/devices', payload);
    }
  }, {
    key: 'deleteTagDevice',
    value: function deleteTagDevice(tagId, deviceId) {
      return this.request.delete('/tags/' + tagId + '/devices/' + deviceId);
    }
  }, {
    key: 'postTagDevice',
    value: function postTagDevice(tagId, deviceId) {
      return this.request.post('/tags/' + tagId + '/devices/' + deviceId);
    }

    // -------------------------------------
    // API: Triggers
    // -------------------------------------

  }, {
    key: 'getTriggers',
    value: function getTriggers() {
      return this.request.get('/triggers');
    }
  }, {
    key: 'postTrigger',
    value: function postTrigger(payload) {
      return this.request.post('/triggers', payload);
    }
  }, {
    key: 'deleteTrigger',
    value: function deleteTrigger(triggerId) {
      return this.request.delete('/triggers/' + triggerId);
    }
  }, {
    key: 'getTrigger',
    value: function getTrigger(triggerId) {
      return this.request.get('/triggers/' + triggerId);
    }
  }, {
    key: 'patchTrigger',
    value: function patchTrigger(triggerId, payload) {
      return this.request.patch('/triggers/' + triggerId, payload);
    }
  }, {
    key: 'getTriggerDeviceGroups',
    value: function getTriggerDeviceGroups(triggerId) {
      return this.request.get('/triggers/' + triggerId + '/devicegroups');
    }
  }, {
    key: 'postTriggerDeviceGroups',
    value: function postTriggerDeviceGroups(triggerId, payload) {
      return this.request.post('/triggers/' + triggerId + '/devicegroups', payload);
    }
  }, {
    key: 'deleteTriggerDeviceGroup',
    value: function deleteTriggerDeviceGroup(triggerId, deviceGroupId) {
      return this.request.delete('/triggers/' + triggerId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'postTriggerDeviceGroup',
    value: function postTriggerDeviceGroup(triggerId, deviceGroupId) {
      return this.request.post('/triggers/' + triggerId + '/devicegroups/' + deviceGroupId);
    }
  }, {
    key: 'getTriggerDevices',
    value: function getTriggerDevices(triggerId) {
      return this.request.get('/triggers/' + triggerId + '/devices');
    }
  }, {
    key: 'postTriggerDevices',
    value: function postTriggerDevices(triggerId, payload) {
      return this.request.post('/triggers/' + triggerId + '/devices', payload);
    }
  }, {
    key: 'deleteTriggerDevice',
    value: function deleteTriggerDevice(triggerId, deviceId) {
      return this.request.delete('/triggers/' + triggerId + '/devices/' + deviceId);
    }
  }, {
    key: 'postTriggerDevice',
    value: function postTriggerDevice(triggerId, deviceId) {
      return this.request.post('/triggers/' + triggerId + '/devices/' + deviceId);
    }

    // -------------------------------------
    // API: Users
    // -------------------------------------

  }, {
    key: 'getUsers',
    value: function getUsers() {
      return this.request.get('/users');
    }
  }, {
    key: 'postUser',
    value: function postUser(payload) {
      return this.request.post('/users', payload);
    }
  }, {
    key: 'deleteUser',
    value: function deleteUser(user) {
      return this.request.delete('/users/' + user);
    }
  }, {
    key: 'getUser',
    value: function getUser(user) {
      return this.request.get('/users/' + user);
    }
  }, {
    key: 'patchUser',
    value: function patchUser(user, payload) {
      return this.request.patch('/users/' + user, payload);
    }
  }, {
    key: 'getUserApiKeys',
    value: function getUserApiKeys(user) {
      return this.request.get('/users/' + user + '/apikeys');
    }
  }, {
    key: 'getUserApiKey',
    value: function getUserApiKey(user, keyId) {
      return this.request.get('/users/' + user + '/apikeys/' + keyId);
    }

    // -------------------------------------
    // API: User Groups
    // -------------------------------------

  }, {
    key: 'getUserGroups',
    value: function getUserGroups() {
      return this.request.get('/usergroups');
    }
  }, {
    key: 'postUserGroupsRefresh',
    value: function postUserGroupsRefresh() {
      return this.request.post('/usergroups/refresh');
    }
  }, {
    key: 'getUserGroup',
    value: function getUserGroup(userGroupId) {
      return this.request.get('/usergroups/' + userGroupId);
    }
  }, {
    key: 'patchUserGroup',
    value: function patchUserGroup(userGroupId, payload) {
      return this.request.patch('/usergroups/' + userGroupId, payload);
    }
  }, {
    key: 'deleteUserGroupAssociations',
    value: function deleteUserGroupAssociations(userGroupId) {
      return this.request.delete('/usergroups/' + userGroupId);
    }
  }, {
    key: 'getUserGroupMembers',
    value: function getUserGroupMembers(userGroupId) {
      return this.request.get('/usergroups/' + userGroupId + '/members');
    }
  }, {
    key: 'postUserGroupRefresh',
    value: function postUserGroupRefresh(userGroupId) {
      return this.request.post('/usergroups/' + userGroupId + '/refresh');
    }

    // -------------------------------------
    // API: VLANs
    // -------------------------------------

  }, {
    key: 'getVlans',
    value: function getVlans() {
      return this.request.get('/vlans');
    }
  }, {
    key: 'getVlan',
    value: function getVlan(vlanId) {
      return this.request.get('/vlans/' + vlanId);
    }
  }, {
    key: 'patchVlan',
    value: function patchVlan(vlanId, payload) {
      return this.request.patch('/vlans/' + vlanId, payload);
    }

    // -------------------------------------
    // API: Whitelist
    // -------------------------------------

  }, {
    key: 'deleteWhitelistDevice',
    value: function deleteWhitelistDevice(deviceId) {
      return this.request.delete('/whitelist/device/' + deviceId);
    }
  }, {
    key: 'postWhitelistDevice',
    value: function postWhitelistDevice(deviceId) {
      return this.request.post('/whitelist/device/' + deviceId);
    }
  }, {
    key: 'getWhitelistsDevices',
    value: function getWhitelistsDevices() {
      return this.request.get('/whitelist/devices');
    }
  }, {
    key: 'postWhitelistDevices',
    value: function postWhitelistDevices(payload) {
      return this.request.post('/whitelist/devices', payload);
    }
  }]);

  return Appliance;
}(BaseObject);
//# sourceMappingURL=Appliance.model.js.map