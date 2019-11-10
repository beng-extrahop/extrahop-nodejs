// Appliance.model.js

const BaseObject = require('../../models/base/BaseObject.model');
const Request = require('../../models/request/Request.model');
const Icons = require('../../constants/Global.constants').Icons;
const Utils = require('../../utils/BaseUtil.util.js');

const ActivityGroupCtrl = require('../../controllers/ActivityGroup.controller');
const AlertCtrl = require('../../controllers/Alert.controller');
const CustomDeviceCtrl = require('../../controllers/CustomDevice.controller');
const DashboardCtrl = require('../../controllers/Dashboard.controller');
const DeviceCtrl = require('../../controllers/Device.controller');
const DeviceGroupCtrl = require('../../controllers/DeviceGroup.controller');
const RecordCtrl = require('../../controllers/Record.controller');
const TriggerCtrl = require('../../controllers/Trigger.controller');

module.exports = class Appliance extends BaseObject {
  constructor(appliance = {}) {
    super(appliance);
    this.id = appliance.id;
    this.apikey = appliance.apikey;
    this.host = appliance.host || appliance.hostname;
    this.name = appliance.name;
    this.type = appliance.type;
    this.user = appliance.user;

    const getAppliance = this.getAppliances();
    this.active = !!getAppliance.success;

    if ( this.active ) {
      Object.keys(getAppliance.data[0]).forEach(key => this[key] = getAppliance.data[0][key]);
      console.log(`${Icons.Info} Connected to ${this.host}`);
    }
    else {
      console.log(`${Icons.Warn} Error connecting to ${this.host}`);
    }

    // this.active = true;
    // this.id = getAppliance.data[0].id;
    // this.uuid = getAppliance.data[0].uuid;
    // this.hostname = getAppliance.data[0].hostname;
    // this.platform = getAppliance.data[0].platform;
    // this.firmware_version = getAppliance.data[0].firmware_version;
    // this.license_status = getAppliance.data[0].license_status;
    // this.status_message = getAppliance.data[0].status_message;
    // this.connection_type = getAppliance.data[0].connection_type;
    // this.manages_local = getAppliance.data[0].manages_local;
    // this.managed_by_local = getAppliance.data[0].managed_by_local;
    // this.data_access = getAppliance.data[0].data_access;
    // this.fingerprint = getAppliance.data[0].fingerprint;
    // this.add_time = getAppliance.data[0].add_time;
    // this.sync_time = getAppliance.data[0].sync_time;
    // this.analysis_levels_managed = getAppliance.data[0].analysis_levels_managed;
    // this.advanced_analysis_capacity = getAppliance.data[0].advanced_analysis_capacity;
    // this.total_capacity = getAppliance.data[0].total_capacity;
  }

  // -------------------------------------
  // Controllers
  // -------------------------------------

  activityGroups() {
    return new ActivityGroupCtrl(this);
  }

  alerts() {
    return new AlertCtrl(this);
  }

  customDevices() {
    return new CustomDeviceCtrl(this);
  }

  dashboards() {
    return new DashboardCtrl(this);
  }

  devices() {
    return new DeviceCtrl(this);
  }

  deviceGroups() {
    return new DeviceGroupCtrl(this);
  }

  records() {
    return new RecordCtrl(this);
  }

  triggers() {
    return new TriggerCtrl(this);
  }

  // -------------------------------------
  // Activity Groups
  // -------------------------------------

  getActivityGroups() {
    return new Request(this.host, this.apikey).get(`/activitygroups`);
  }

  getActivityGroupDashboards(activityGroupID) {
    return new Request(this.host, this.apikey).get(`/activitygroups/${activityGroupID}/dashboards`);
  }

  // -------------------------------------
  // Activity Maps
  // -------------------------------------

  getActivityMaps() {
    return new Request(this.host, this.apikey).get(`/activitymaps`);
  }

  postActivityMaps(payload) {
    return new Request(this.host, this.apikey).post(`/activitymaps`, payload);
  }

  postActivityMapsQuery(payload) {
    return new Request(this.host, this.apikey).post(`/activitymaps/query`, payload);
  }

  deleteActivityMap(activityMapID) {
    return new Request(this.host, this.apikey).delete(`/activitymaps/${activityMapID}`);
  }

  getActivityMap(activityMapID) {
    return new Request(this.host, this.apikey).get(`/activitymaps/${activityMapID}`);
  }

  patchActivityMap(activityMapID, payload) {
    return new Request(this.host, this.apikey).patch(`/activitymaps/${activityMapID}`, payload);
  }

  postActivityMapQuery(activityMapID, payload) {
    return new Request(this.host, this.apikey).post(`/activitymaps/${activityMapID}/query`, payload);
  }

  getActivityMapSharing(activityMapID) {
    return new Request(this.host, this.apikey).get(`/activitymaps/${activityMapID}/sharing`);
  }

  patchActivityMapSharing(activityMapID, payload) {
    return new Request(this.host, this.apikey).patch(`/activitymaps/${activityMapID}/sharing`, payload);
  }

  putActivityMapSharing(activityMapID, payload) {
    return new Request(this.host, this.apikey).put(`/activitymaps/${activityMapID}/sharing`, payload);
  }

  // -------------------------------------
  // Alerts
  // -------------------------------------

  getAlerts() {
    return new Request(this.host, this.apikey).get(`/alerts`);
  }

  postAlert(payload) {
    return new Request(this.host, this.apikey).post(`/alerts`, payload);
  }

  deleteAlert(alertID) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertID}`);
  }

  getAlert(alertID) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertID}`);
  }

  patchAlert(alertID, payload) {
    return new Request(this.host, this.apikey).patch(`/alerts/${alertID}`, payload);
  }

  getAlertApplications(alertID) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertID}/applications`);
  }

  postAlertApplications(alertID, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/applications`, payload);
  }

  deleteAlertApplication(alertID, appID) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertID}/applications/${appID}`);
  }

  postAlertApplication(alertID, appID) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/applications/${appID}`);
  }

  getAlertDeviceGroups(alertID) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertID}/devicegroups`);
  }

  postAlertDeviceGroups(alertID, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/devicegroups`, payload);
  }

  deleteAlertDeviceGroup(alertID, deviceGroupID) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertID}/devicegroups/${deviceGroupID}`);
  }

  postAlertDeviceGroup(alertID, deviceGroupID) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/devicegroups/${deviceGroupID}`);
  }

  getAlertDevices(alertID) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertID}/devices`);
  }

  postAlertDevices(alertID, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/devices`, payload);
  }

  deleteAlertDevice(alertID, deviceID) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertID}/devices/${deviceID}`);
  }

  postAlertDevice(alertID, deviceID) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/devices/${deviceID}`);
  }

  getAlertEmailGroups(alertID) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertID}/emailgroups`);
  }

  postAlertEmailGroups(alertID, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/emailgroups`, payload);
  }

  deleteAlertEmailGroup(alertID, emailGroupID) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertID}/emailgroups/${emailGroupID}`);
  }

  postAlertEmailGroup(alertID, emailGroupID) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/emailgroups/${emailGroupID}`);
  }

  getAlertExclusionIntervals(alertID) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertID}/exclusionintervals`);
  }

  postAlertExclusionIntervals(alertID, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/exclusionintervals`, payload);
  }

  deleteAlertExclusionInterval(alertID, exclusionIntervalID) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertID}/exclusionintervals/${exclusionIntervalID}`);
  }

  postAlertExclusionInterval(alertID, exclusionIntervalID) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/exclusionintervals/${exclusionIntervalID}`);
  }

  getAlertNetworks(alertID) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertID}/networks`);
  }

  postAlertNetworks(alertID, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/networks`, payload);
  }

  deleteAlertNetwork(alertID, networkID) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertID}/networks/${networkID}`);
  }

  postAlertNetwork(alertID, networkID) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertID}/networks/${networkID}`);
  }

  getAlertStats(alertID) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertID}/stats`);
  }

  // -------------------------------------
  // Analysis Priority
  // -------------------------------------

  getAnalysisPriorityConfig(applianceID = 0) {
    return new Request(this.host, this.apikey).get(`/analysispriority/config/${applianceID}`);
  }

  putAnalysisPriorityConfig(payload, applianceID = 0) {
    return new Request(this.host, this.apikey).put(`/analysispriority/config/${applianceID}`, payload);
  }

  getAnalysisPriorityManager(applianceID = 0) {
    return new Request(this.host, this.apikey).get(`/analysispriority/${applianceID}/manager`);
  }

  patchAnalysisPriorityManager(payload, applianceID = 0) {
    return new Request(this.host, this.apikey).patch(`/analysispriority/${applianceID}/manager`, payload);
  }

  // -------------------------------------
  // API
  // -------------------------------------

  getApiKeys() {
    return new Request(this.host, this.apikey).get(`/apikeys`);
  }

  getApiKey(keyID) {
    return new Request(this.host, this.apikey).get(`/apikeys/${keyID}`);
  }

  postApiKeys(payload) {
    return new Request(this.host, this.apikey).post(`/apikeys`, payload);
  }

  // -------------------------------------
  // Appliances
  // -------------------------------------

  getAppliances() {
    return new Request(this.host, this.apikey).get(`/appliances`);
  }

  getAppliance(applianceID) {
    return new Request(this.host, this.apikey).get(`/appliances/${applianceID}`);
  }

  postAppliance(payload) {
    return new Request(this.host, this.apikey).post(`/appliances`, payload);
  }

  // -------------------------------------
  // Applications
  // -------------------------------------

  getApplications(activeFrom, activeUntil, limit, offset, searchType, value) {
    const queryString = Utils.buildQuery({ activeFrom, activeUntil, limit, offset, searchType, value });
    console.log(`QS: ${ queryString || '' }`);
    return new Request(this.host, this.apikey).get(`/applications${ queryString || '' }`);
  }

  getApplication(appID) {
    return new Request(this.host, this.apikey).get(`/applications/${appID}`);
  }

  postApplication(appID, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}`, payload);
  }

  patchApplication(appID, payload) {
    return new Request(this.host, this.apikey).patch(`/applications/${appID}`, payload);
  }

  getApplicationActivity(appID) {
    return new Request(this.host, this.apikey).get(`/applications/${appID}/activity`);
  }

  getApplicationAlerts(appID) {
    return new Request(this.host, this.apikey).get(`/applications/${appID}/alerts`);
  }

  postApplicationAlerts(appID, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}/alerts`, payload);
  }

  deleteApplicationAlert(appID, alertID) {
    return new Request(this.host, this.apikey).delete(`/applications/${appID}/alerts/${alertID}`);
  }

  postApplicationAlert(appID, alertID) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}/alerts/${alertID}`);
  }

  getApplicationDashboards(appID) {
    return new Request(this.host, this.apikey).get(`/applications/${appID}/dashboards`);
  }

  getApplicationFlexGrids(appID) {
    return new Request(this.host, this.apikey).get(`/applications/${appID}/flexgrids`);
  }

  postApplicationFlexGrids(appID, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}/flexgrids`, payload);
  }

  deleteApplicationFlexGrid(appID, flexGridID) {
    return new Request(this.host, this.apikey).delete(`/applications/${appID}/flexgrids/${flexGridID}`);
  }

  postApplicationFlexGrid(appID, flexGridID) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}/flexgrids/${flexGridID}`);
  }

  getApplicationGeomaps(appID) {
    return new Request(this.host, this.apikey).get(`/applications/${appID}/geomaps`);
  }

  postApplicationGeomaps(appID, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}/geomaps`, payload);
  }

  deleteApplicationGeomap(appID, geomapID) {
    return new Request(this.host, this.apikey).delete(`/applications/${appID}/geomaps/${geomapID}`);
  }

  postApplicationGeomap(appID, geomapID) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}/geomaps/${geomapID}`);
  }

  getApplicationPages(appID) {
    return new Request(this.host, this.apikey).get(`/applications/${appID}/pages`);
  }

  postApplicationPages(appID, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}/pages`, payload);
  }

  deleteApplicationPage(appID, pageID) {
    return new Request(this.host, this.apikey).delete(`/applications/${appID}/pages/${pageID}`);
  }

  postApplicationPage(appID, pageID) {
    return new Request(this.host, this.apikey).post(`/applications/${appID}/pages/${pageID}`);
  }

  // -------------------------------------
  // Audit Log
  // -------------------------------------

  getAuditLog(limit, offset) {
    const queryString = Utils.buildQuery({ limit, offset });
    return new Request(this.host, this.apikey).get(`/auditlog${ queryString || '' }`);
  }

  // -------------------------------------
  // Bundles
  // -------------------------------------

  getBundles() {
    return new Request(this.host, this.apikey).get(`/bundles`);
  }

  postBundle(payload) {
    return new Request(this.host, this.apikey).post(`/bundles`, payload);
  }

  deleteBundle(bundleID) {
    return new Request(this.host, this.apikey).delete(`/bundles/${bundleID}`);
  }

  getBundle(bundleID) {
    return new Request(this.host, this.apikey).get(`/bundles/${bundleID}`);
  }

  postBundleApply(bundleID, payload) {
    return new Request(this.host, this.apikey).post(`/bundles/${bundleID}/apply`, payload);
  }

  // -------------------------------------
  // Custom Devices
  // -------------------------------------

  getCustomDevices() {
    return new Request(this.host, this.apikey).get(`/customdevices`);
  }

  postCustomDevice(payload) {
    return new Request(this.host, this.apikey).post(`/customdevices`, payload);
  }

  deleteCustomDevice(customDeviceID) {
    return new Request(this.host, this.apikey).delete(`/customdevices/${customDeviceID}`);
  }

  getCustomDevice(customDeviceID, includeCriteria) {
    const queryString = Utils.buildQuery({'include_criteria': includeCriteria});
    return new Request(this.host, this.apikey).get(`/customdevices/${customDeviceID}${ queryString || '' }`);
  }

  patchCustomDevice(customDeviceID, payload) {
    return new Request(this.host, this.apikey).patch(`/customdevices/${customDeviceID}`, payload);
  }

  getCustomDeviceCriteria(customDeviceID) {
    return new Request(this.host, this.apikey).get(`/customdevices/${customDeviceID}/criteria`);
  }

  postCustomDeviceCriteria(customDeviceID, payload) {
    return new Request(this.host, this.apikey).post(`/customdevices/${customDeviceID}/criteria`, payload);
  }

  deleteCustomDeviceCriteria(customDeviceID, criteriaID) {
    return new Request(this.host, this.apikey).delete(`/customdevices/${customDeviceID}/criteria/${criteriaID}`);
  }

  getCustomDeviceCriterion(customDeviceID, criteriaID) {
    return new Request(this.host, this.apikey).get(`/customdevices/${customDeviceID}/criteria/${criteriaID}`);
  }

  // -------------------------------------
  // Customizations
  // -------------------------------------

  getCustomizations() {
    return new Request(this.host, this.apikey).get(`/customizations`);
  }

  postCustomization(payload) {
    return new Request(this.host, this.apikey).post(`/customizations`, payload);
  }

  getCustomizationsStatus() {
    return new Request(this.host, this.apikey).get(`/customizations/status`);
  }

  deleteCustomization(customizationID) {
    return new Request(this.host, this.apikey).delete(`/customizations/${customizationID}`);
  }

  getCustomization(customizationID) {
    return new Request(this.host, this.apikey).get(`/customizations/${customizationID}`);
  }

  postCustomizationApply(customizationID) {
    return new Request(this.host, this.apikey).post(`/customizations/${customizationID}/apply`);
  }

  postCustomizationDownload(customizationID) {
    return new Request(this.host, this.apikey).post(`/customizations/${customizationID}/download`);
  }

  // -------------------------------------
  // Dashboards
  // -------------------------------------

  getDashboards() {
    return new Request(this.host, this.apikey).get(`/dashboards`);
  }

  deleteDashboard(dashboardID) {
    return new Request(this.host, this.apikey).delete(`/dashboards/${dashboardID}`);
  }

  getDashboard(dashboardID) {
    return new Request(this.host, this.apikey).get(`/dashboards/${dashboardID}`);
  }

  patchDashboard(dashboardID, payload) {
    return new Request(this.host, this.apikey).patch(`/dashboards/${dashboardID}`, payload);
  }

  getDashboardReports(dashboardID) {
    return new Request(this.host, this.apikey).get(`/dashboards/${dashboardID}/reports`);
  }

  getDashboardSharing(dashboardID) {
    return new Request(this.host, this.apikey).get(`/dashboards/${dashboardID}/sharing`);
  }

  patchDashboardSharing(dashboardID, payload) {
    return new Request(this.host, this.apikey).patch(`/dashboards/${dashboardID}/sharing`, payload);
  }

  putDashboardSharing(dashboardID, payload) {
    return new Request(this.host, this.apikey).put(`/dashboards/${dashboardID}/sharing`, payload);
  }

  // -------------------------------------
  // Devices
  // -------------------------------------

  getDevices(searchType, value, limit, offset, activeFrom, activeUntil) {
    const queryString = Utils.buildQuery({ searchType, value, limit, offset, activeFrom, activeUntil });
    return new Request(this.host, this.apikey).get(`/devices${ queryString || '' }`);
  }

  searchDevices(payload) {
    return new Request(this.host, this.apikey).post(`/devices/search`, payload);
  }

  getDevice(deviceID) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}`);
  }

  patchDevice(deviceID, payload) {
    return new Request(this.host, this.apikey).patch(`/devices/${deviceID}`, payload);
  }

  getDeviceActivity(deviceID) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/activity`);
  }

  getDeviceAlerts(deviceID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/alerts${ queryString || '' }`);
  }

  postDeviceAlerts(deviceID, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/alerts`, payload);
  }

  deleteDeviceAlert(deviceID, alertID) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceID}/alerts/${alertID}`);
  }

  postDeviceAlert(deviceID, alertID) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/alerts/${alertID}`);
  }

  getDeviceDashboards(deviceID) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/dashboards`);
  }

  getDeviceDeviceGroups(deviceID) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/devicegroups`);
  }

  postDeviceDeviceGroups(deviceID, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/devicegroups`, payload);
  }

  deleteDeviceDeviceGroup(deviceID, deviceGroupID) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceID}/devicegroups/${deviceGroupID}`);
  }

  postDeviceDeviceGroup(deviceID, deviceGroupID) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/devicegroups/${deviceGroupID}`);
  }

  getDeviceFlexGrids(deviceID) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/flexgrids`);
  }

  postDeviceFlexGrids(deviceID, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/flexgrids`, payload);
  }

  deleteDeviceFlexGrid(deviceID, flexGridID) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceID}/flexgrids/${flexGridID}`);
  }

  postDeviceFlexGrid(deviceID, flexGridID) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/flexgrids/${flexGridID}`);
  }

  getDeviceGeomaps(deviceID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/geomaps${ queryString || '' }`);
  }

  postDeviceGeomaps(deviceID, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/geomaps`, payload);
  }

  deleteDeviceGeomap(deviceID, geomapID) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceID}/geomaps/${geomapID}`);
  }

  postDeviceGeomap(deviceID, geomapID) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/geomaps/${geomapID}`);
  }

  getDevicePages(deviceID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/pages${ queryString || '' }`);
  }

  postDevicePages(deviceID, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/pages`, payload);
  }

  deleteDevicePage(deviceID, pageID) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceID}/pages/${pageID}`);
  }

  postDevicePage(deviceID, pageID) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/pages/${pageID}`);
  }

  getDeviceTags(deviceID) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/tags`);
  }

  postDeviceTags(deviceID, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/tags`, payload);
  }

  deleteDeviceTag(deviceID, tagID) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceID}/tags/${tagID}`);
  }

  postDeviceTag(deviceID, tagID) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/tags/${tagID}`);
  }

  getDeviceTriggers(deviceID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceID}/triggers${ queryString || '' }`);
  }

  postDeviceTriggers(deviceID, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/triggers`, payload);
  }

  deleteDeviceTrigger(deviceID, triggerID) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceID}/triggers/${triggerID}`);
  }

  postDeviceTrigger(deviceID, triggerID) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceID}/triggers/${triggerID}`);
  }

  // -------------------------------------
  // Device Groups
  // -------------------------------------

  getDeviceGroups(since, all, name) {
    const queryString = Utils.buildQuery({ since, all, name });
    return new Request(this.host, this.apikey).get(`/devicegroups${ queryString || '' }`);
  }

  postDeviceGroup(payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups`, payload);
  }

  deleteDeviceGroup(deviceGroupID) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupID}`);
  }

  getDeviceGroup(deviceGroupID) {
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}`);
  }

  patchDeviceGroup(deviceGroupID, payload) {
    return new Request(this.host, this.apikey).patch(`/devicegroups/${deviceGroupID}`, payload);
  }

  getDeviceGroupAlerts(deviceGroupID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}/alerts${ queryString || '' }`);
  }

  postDeviceGroupAlerts(deviceGroupID, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/alerts`, payload);
  }

  deleteDeviceGroupAlert(deviceGroupID, alertID) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupID}/alerts/${alertID}`);
  }

  postDeviceGroupAlert(deviceGroupID, alertID) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/alerts/${alertID}`);
  }

  getDeviceGroupDashboards(deviceGroupID) {
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}/dashboards`);
  }

  getDeviceGroupDevices(deviceGroupID, activeFrom, activeUntil, limit, offset) {
    const queryString = Utils.buildQuery({ activeFrom, activeUntil, limit, offset });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}/devices${ queryString || '' }`);
  }

  postDeviceGroupDevices(deviceGroupID, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/devices`, payload);
  }

  deleteDeviceGroupDevice(deviceGroupID, deviceID) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupID}/devices/${deviceID}`);
  }

  postDeviceGroupDevice(deviceGroupID, deviceID) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/devices/${deviceID}`);
  }

  getDeviceGroupFlexGrids(deviceGroupID) {
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}/flexgrids`);
  }

  postDeviceGroupFlexGrids(deviceGroupID, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/flexgrids`, payload);
  }

  deleteDeviceGroupFlexGrid(deviceGroupID, flexGridID) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupID}/flexgrids/${flexGridID}`);
  }

  postDeviceGroupFlexGrid(deviceGroupID, flexGridID) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/flexgrids/${flexGridID}`);
  }

  getDeviceGroupGeomaps(deviceGroupID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}/geomaps${ queryString || '' }`);
  }

  postDeviceGroupGeomaps(deviceGroupID, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/geomaps`, payload);
  }

  deleteDeviceGroupGeomap(deviceGroupID, geomapID) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupID}/geomaps/${geomapID}`);
  }

  postDeviceGroupGeomap(deviceGroupID, geomapID) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/geomaps/${geomapID}`);
  }

  getDeviceGroupPages(deviceGroupID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}/pages${ queryString || '' }`);
  }

  postDeviceGroupPages(deviceGroupID, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/pages`, payload);
  }

  deleteDeviceGroupPage(deviceGroupID, pageID) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupID}/pages/${pageID}`);
  }

  postDeviceGroupPage(deviceGroupID, pageID) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/pages/${pageID}`);
  }

  getDeviceGroupTags(deviceGroupID) {
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}/tags`);
  }

  postDeviceGroupTags(deviceGroupID, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/tags`, payload);
  }

  deleteDeviceGroupTag(deviceGroupID, tagID) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupID}/tags/${tagID}`);
  }

  postDeviceGroupTag(deviceGroupID, tagID) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/tags/${tagID}`);
  }

  getDeviceGroupTriggers(deviceGroupID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupID}/triggers${ queryString || '' }`);
  }

  postDeviceGroupTriggers(deviceGroupID, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/triggers`, payload);
  }

  deleteDeviceGroupTrigger(deviceGroupID, triggerID) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupID}/triggers/${triggerID}`);
  }

  postDeviceGroupTrigger(deviceGroupID, triggerID) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupID}/triggers/${triggerID}`);
  }

  // -------------------------------------
  // Email Groups
  // -------------------------------------

  getEmailGroups() {
    return new Request(this.host, this.apikey).get(`/emailgroups`);
  }

  postEmailGroup(payload) {
    return new Request(this.host, this.apikey).post(`/emailgroups`, payload);
  }

  deleteEmailGroup(emailGroupID) {
    return new Request(this.host, this.apikey).delete(`/emailgroups/${emailGroupID}`);
  }

  getEmailGroup(emailGroupID) {
    return new Request(this.host, this.apikey).get(`/emailgroups/${emailGroupID}`);
  }

  patchEmailGroup(emailGroupID, payload) {
    return new Request(this.host, this.apikey).patch(`/emailgroups/${emailGroupID}`, payload);
  }

  // -------------------------------------
  // Exclusion Intervals
  // -------------------------------------

  getExclusionIntervals() {
    return new Request(this.host, this.apikey).get(`/exclusionintervals`);
  }

  postExclusionInterval(payload) {
    return new Request(this.host, this.apikey).post(`/exclusionintervals`, payload);
  }

  deleteExclusionInterval(exclusionIntervalID) {
    return new Request(this.host, this.apikey).delete(`/exclusionintervals/${exclusionIntervalID}`);
  }

  getExclusionInterval(exclusionIntervalID) {
    return new Request(this.host, this.apikey).get(`/exclusionintervals/${exclusionIntervalID}`);
  }

  patchExclusionInterval(exclusionIntervalID, payload) {
    return new Request(this.host, this.apikey).patch(`/exclusionintervals/${exclusionIntervalID}`, payload);
  }

  // -------------------------------------
  // Extrahop
  // -------------------------------------

  getExtrahop() {
    return new Request(this.host, this.apikey).get(`/extrahop`);
  }

  getExtrahopIDrac() {
    return new Request(this.host, this.apikey).get(`/extrahop/idrac`);
  }

  getExtrahopPlatform() {
    return new Request(this.host, this.apikey).get(`/extrahop/platform`);
  }

  getExtrahopProcesses() {
    return new Request(this.host, this.apikey).get(`/extrahop/processes`);
  }

  postExtrahopProcessRestart(processID) {
    return new Request(this.host, this.apikey).post(`/extrahop/processes/${processID}/restart`);
  }

  postExtrahopSSLCert() {
    return new Request(this.host, this.apikey).post(`/extrahop/sslcert`);
  }

  putExtrahopSSLCert(payload) {
    return new Request(this.host, this.apikey).put(`/extrahop/sslcert`, payload);
  }

  getExtrahopVersion() {
    return new Request(this.host, this.apikey).get(`/extrahop/version`);
  }

  // -------------------------------------
  // Flex Grids
  // -------------------------------------

  getFlexGrids() {
    return new Request(this.host, this.apikey).get(`/flexgrids`);
  }

  getFlexGridApplications(flexGridID) {
    return new Request(this.host, this.apikey).get(`/flexgrids/${flexGridID}/applications`);
  }

  postFlexGridApplications(flexGridID, payload) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridID}/applications`, payload);
  }

  deleteFlexGridApplication(flexGridID, appID) {
    return new Request(this.host, this.apikey).delete(`/flexgrids/${flexGridID}/applications/${appID}`);
  }

  postFlexGridApplication(flexGridID, appID) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridID}/applications/${appID}`);
  }

  getFlexGridDeviceGroups(flexGridID) {
    return new Request(this.host, this.apikey).get(`/flexgrids/${flexGridID}/devicegroups`);
  }

  postFlexGridDeviceGroups(flexGridID, payload) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridID}/devicegroups`, payload);
  }

  deleteFlexGridDeviceGroup(flexGridID, deviceGroupID) {
    return new Request(this.host, this.apikey).delete(`/flexgrids/${flexGridID}/devicegroups/${deviceGroupID}`);
  }

  postFlexGridDeviceGroup(flexGridID, deviceGroupID) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridID}/devicegroups/${deviceGroupID}`);
  }

  getFlexGridDevices(flexGridID) {
    return new Request(this.host, this.apikey).get(`/flexgrids/${flexGridID}/devices`);
  }

  postFlexGridDevices(flexGridID, payload) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridID}/devices`, payload);
  }

  deleteFlexGridDevice(flexGridID, deviceID) {
    return new Request(this.host, this.apikey).delete(`/flexgrids/${flexGridID}/devices/${deviceID}`);
  }

  postFlexGridDevice(flexGridID, deviceID) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridID}/devices/${deviceID}`);
  }

  // -------------------------------------
  // Geomaps
  // -------------------------------------

  getGeomaps() {
    return new Request(this.host, this.apikey).get(`/geomaps`);
  }

  postGeomaps(payload) {
    return new Request(this.host, this.apikey).post(`/geomaps`, payload);
  }

  deleteGeomap(geomapID) {
    return new Request(this.host, this.apikey).delete(`/geomaps/${geomapID}`);
  }

  getGeomap(geomapID) {
    return new Request(this.host, this.apikey).get(`/geomaps/${geomapID}`);
  }

  patchGeomap(geomapID, payload) {
    return new Request(this.host, this.apikey).patch(`/geomaps/${geomapID}`, payload);
  }

  getGeomapApplications(geomapID) {
    return new Request(this.host, this.apikey).get(`/geomaps/${geomapID}/applications`);
  }

  postGeomapApplications(geomapID, payload) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapID}/applications`, payload);
  }

  deleteGeomapApplication(geomapID, appID) {
    return new Request(this.host, this.apikey).delete(`/geomaps/${geomapID}/applications/${appID}`);
  }

  postGeomapApplication(geomapID, appID) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapID}/applications/${appID}`);
  }

  getGeomapDeviceGroups(geomapID) {
    return new Request(this.host, this.apikey).get(`/geomaps/${geomapID}/devicegroups`);
  }

  postGeomapDeviceGroups(geomapID, payload) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapID}/devicegroups`, payload);
  }

  deleteGeomapDeviceGroup(geomapID, deviceGroupID) {
    return new Request(this.host, this.apikey).delete(`/geomaps/${geomapID}/devicegroups/${deviceGroupID}`);
  }

  postGeomapDeviceGroup(geomapID, deviceGroupID) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapID}/devicegroups/${deviceGroupID}`);
  }

  getGeomapDevices(geomapID) {
    return new Request(this.host, this.apikey).get(`/geomaps/${geomapID}/devices`);
  }

  postGeomapDevices(geomapID, payload) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapID}/devices`, payload);
  }

  deleteGeomapDevice(geomapID, deviceID) {
    return new Request(this.host, this.apikey).delete(`/geomaps/${geomapID}/devices/${deviceID}`);
  }

  postGeomapDevice(geomapID, deviceID) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapID}/devices/${deviceID}`);
  }

  // -------------------------------------
  // License
  // -------------------------------------

  getLicense() {
    return new Request(this.host, this.apikey).get(`/license`);
  }

  putLicense(payload) {
    return new Request(this.host, this.apikey).put(`/license`, payload);
  }

  getLicenseProductKey() {
    return new Request(this.host, this.apikey).get(`/license/productkey`);
  }

  putLicenseProductKey(payload) {
    return new Request(this.host, this.apikey).put(`/license/productkey`, payload);
  }

  // -------------------------------------
  // Metrics
  // -------------------------------------

  postMetrics(payload) {
    return new Request(this.host, this.apikey).post(`/metrics`, payload);
  }

  getMetricsNextXID(xID) {
    return new Request(this.host, this.apikey).get(`/metrics/next/${xID}`);
  }

  postMetricsTotal(payload) {
    return new Request(this.host, this.apikey).post(`/metrics/total`, payload);
  }

  postMetricsTotalByObject(payload) {
    return new Request(this.host, this.apikey).post(`/metrics/totalbyobject`, payload);
  }

  // -------------------------------------
  // Networks
  // -------------------------------------

  getNetworks() {
    return new Request(this.host, this.apikey).get(`/networks`);
  }

  getNetwork(networkID) {
    return new Request(this.host, this.apikey).get(`/networks/${networkID}`);
  }

  patchNetwork(networkID, payload) {
    return new Request(this.host, this.apikey).patch(`/networks/${networkID}`, payload);
  }

  getNetworkAlerts(networkID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/networks/${networkID}/alerts${ queryString || '' }`);
  }

  postNetworkAlerts(networkID, payload) {
    return new Request(this.host, this.apikey).post(`/networks/${networkID}/alerts`, payload);
  }

  deleteNetworkAlert(networkID, alertID) {
    return new Request(this.host, this.apikey).delete(`/networks/${networkID}/alerts/${alertID}`);
  }

  postNetworkAlert(networkID, alertID) {
    return new Request(this.host, this.apikey).post(`/networks/${networkID}/alerts/${alertID}`);
  }

  getNetworkPages(networkID, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/networks/${networkID}/pages${ queryString || '' }`);
  }

  postNetworkPages(networkID, payload) {
    return new Request(this.host, this.apikey).post(`/networks/${networkID}/pages`, payload);
  }

  deleteNetworkPage(networkID, pageID) {
    return new Request(this.host, this.apikey).delete(`/networks/${networkID}/pages/${pageID}`);
  }

  postNetworkPage(networkID, pageID) {
    return new Request(this.host, this.apikey).post(`/networks/${networkID}/pages/${pageID}`);
  }

  getNetworkVlans(networkID) {
    return new Request(this.host, this.apikey).get(`/networks/${networkID}/vlans`);
  }

  // -------------------------------------
  // Network Locality Entry
  // -------------------------------------

  getNetworkLocalities() {
    return new Request(this.host, this.apikey).get(`/networklocality`);
  }

  postNetworkLocality(payload) {
    return new Request(this.host, this.apikey).post(`/networklocality`, payload);
  }

  deleteNetworkLocality(networkLocalityID) {
    return new Request(this.host, this.apikey).delete(`/networklocality/${networkLocalityID}`);
  }

  getNetworkLocality(networkLocalityID) {
    return new Request(this.host, this.apikey).get(`/networklocality/${networkLocalityID}`);
  }

  patchNetworkLocality(networkLocalityID, payload) {
    return new Request(this.host, this.apikey).patch(`/networklocality/${networkLocalityID}`, payload);
  }

  // -------------------------------------
  // Nodes
  // -------------------------------------

  getNodes() {
    return new Request(this.host, this.apikey).get(`/nodes`);
  }

  getNode(nodeID) {
    return new Request(this.host, this.apikey).get(`/nodes/${nodeID}`);
  }

  patchNode(nodeID, payload) {
    return new Request(this.host, this.apikey).patch(`/nodes/${nodeID}`, payload);
  }

  // -------------------------------------
  // Packet Captures
  // -------------------------------------

  getPacketCaptures() {
    return new Request(this.host, this.apikey).get(`/packetcaptures`);
  }

  deletePacketCapture(packetCaptureID) {
    return new Request(this.host, this.apikey).delete(`/packetcaptures/${packetCaptureID}`);
  }

  getPacketCapture(packetCaptureID) {
    return new Request(this.host, this.apikey).get(`/packetcaptures/${packetCaptureID}`);
  }

  // -------------------------------------
  // Pages
  // -------------------------------------

  getPages() {
    return new Request(this.host, this.apikey).get(`/pages`);
  }

  postPages(payload) {
    return new Request(this.host, this.apikey).post(`/pages`, payload);
  }

  deletePage(pageID) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageID}`);
  }

  getPage(pageID) {
    return new Request(this.host, this.apikey).get(`/pages/${pageID}`);
  }

  patchPage(pageID, payload) {
    return new Request(this.host, this.apikey).patch(`/pages/${pageID}`, payload);
  }

  getPageApplications(pageID) {
    return new Request(this.host, this.apikey).get(`/pages/${pageID}/applications`);
  }

  postPageApplications(pageID, payload) {
    return new Request(this.host, this.apikey).post(`/pages/${pageID}/applications`, payload);
  }

  deletePageApplication(pageID, appID) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageID}/applications/${appID}`);
  }

  postPageApplication(pageID, appID) {
    return new Request(this.host, this.apikey).post(`/pages/${pageID}/applications/${appID}`);
  }

  getPageDeviceGroups(pageID) {
    return new Request(this.host, this.apikey).get(`/pages/${pageID}/devicegroups`);
  }

  postPageDeviceGroups(pageID, payload) {
    return new Request(this.host, this.apikey).post(`/pages/${pageID}/devicegroups`, payload);
  }

  deletePageDeviceGroup(pageID, deviceGroupID) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageID}/devicegroups/${deviceGroupID}`);
  }

  postPageDeviceGroup(pageID, deviceGroupID) {
    return new Request(this.host, this.apikey).post(`/pages/${pageID}/devicegroups/${deviceGroupID}`);
  }

  getPageDevices(pageID) {
    return new Request(this.host, this.apikey).get(`/pages/${pageID}/devices`);
  }

  postPageDevices(pageID, payload) {
    return new Request(this.host, this.apikey).post(`/pages/${pageID}/devices`, payload);
  }

  deletePageDevice(pageID, deviceID) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageID}/devices/${deviceID}`);
  }

  postPageDevice(pageID, deviceID) {
    return new Request(this.host, this.apikey).post(`/pages/${pageID}/devices/${deviceID}`);
  }

  getPageNetworks(pageID) {
    return new Request(this.host, this.apikey).get(`/pages/${pageID}/networks`);
  }

  postPageNetworks(pageID, payload) {
    return new Request(this.host, this.apikey).post(`/pages/${pageID}/networks`, payload);
  }

  deletePageNetwork(pageID, networkID) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageID}/networks/${networkID}`);
  }

  postPageNetwork(pageID, networkID) {
    return new Request(this.host, this.apikey).post(`/pages/${pageID}/networks/${networkID}`);
  }

  // -------------------------------------
  // Record Logs
  // -------------------------------------

  postRecordsCursor(payload, contextTtl) {
    return new Request(this.host, this.apikey).post(`/records/cursor?context_ttl=${contextTtl}`, payload);
  }

  getRecordsCursor(cursor, contextTtl) {
    return new Request(this.host, this.apikey).get(`/records/cursor/${cursor}?context_ttl=${contextTtl}`);
  }

  postRecordsSearch(payload) {
    return new Request(this.host, this.apikey).post(`/records/search`, payload);
  }

  //  -------------------------------------
  //  Reports
  //  -------------------------------------

  getReports() {
    return new Request(this.host, this.apikey).get(`/reports`);
  }

  postReport(payload) {
    return new Request(this.host, this.apikey).post(`/reports`, payload);
  }

  deleteReport(reportID) {
    return new Request(this.host, this.apikey).delete(`/reports/${reportID}`);
  }

  getReport(reportID) {
    return new Request(this.host, this.apikey).get(`/reports/${reportID}`);
  }

  patchReport(reportID, payload) {
    return new Request(this.host, this.apikey).patch(`/reports/${reportID}`, payload);
  }

  getReportContents(reportID) {
    return new Request(this.host, this.apikey).get(`/reports/${reportID}/contents`);
  }

  putReportContents(reportID, payload) {
    return new Request(this.host, this.apikey).put(`/reports/${reportID}/contents`, payload);
  }

  getReportEmailGroups(reportID) {
    return new Request(this.host, this.apikey).get(`/reports/${reportID}/emailgroups`);
  }

  postReportEmailGroups(reportID, payload) {
    return new Request(this.host, this.apikey).post(`/reports/${reportID}/emailgroups`, payload);
  }

  deleteReportEmailGroup(reportID, emailGroupID) {
    return new Request(this.host, this.apikey).delete(`/reports/${reportID}/emailgroups/${emailGroupID}`);
  }

  postReportEmailGroup(reportID, emailGroupID) {
    return new Request(this.host, this.apikey).post(`/reports/${reportID}/emailgroups/${emailGroupID}`);
  }

  postReportQueue(reportID) {
    return new Request(this.host, this.apikey).post(`/reports/${reportID}/queue`);
  }

  // -------------------------------------
  //  Running Config
  //  -------------------------------------

  getRunningConfig(section) {
    const queryString = Utils.buildQuery({ section });
    return new Request(this.host, this.apikey).get(`/runningconfig${ queryString || '' }`);
  }

  putRunningConfig(payload) {
    return new Request(this.host, this.apikey).put(`/runningconfig`, payload);
  }

  postRunningConfigSave() {
    return new Request(this.host, this.apikey).post(`/runningconfig/save`);
  }

  getRunningConfigSaved() {
    return new Request(this.host, this.apikey).get(`/runningconfig/saved`);
  }

  // -------------------------------------
  // SSL Decrypt Keys
  // -------------------------------------

  getSslDecryptKeys() {
    return new Request(this.host, this.apikey).get(`/ssldecryptkeys`);
  }

  postSslDecryptKey(payload) {
    return new Request(this.host, this.apikey).post(`/ssldecryptkeys`, payload);
  }

  deleteSslDecryptKey(sslDecryptKeyID) {
    return new Request(this.host, this.apikey).delete(`/ssldecryptkeys/${sslDecryptKeyID}`);
  }

  getSslDecryptKey(sslDecryptKeyID) {
    return new Request(this.host, this.apikey).get(`/ssldecryptkeys/${sslDecryptKeyID}`);
  }

  patchSslDecryptKey(sslDecryptKeyID, payload) {
    return new Request(this.host, this.apikey).patch(`/ssldecryptkeys/${sslDecryptKeyID}`, payload);
  }

  getSslDecryptKeyProtocols(sslDecryptKeyID) {
    return new Request(this.host, this.apikey).get(`/ssldecrpytkeys/${sslDecryptKeyID}/protocols`);
  }

  postSslDecryptKeyProtocols(sslDecryptKeyID, payload) {
    return new Request(this.host, this.apikey).post(`/ssldecrpytkeys/${sslDecryptKeyID}/protocols`, payload);
  }

  deleteSslDecryptKeyProtocol(sslDecryptKeyID, protocolID) {
    return new Request(this.host, this.apikey).delete(`/ssldecrpytkeys/${sslDecryptKeyID}/protocols/${protocolID}`);
  }

  // -------------------------------------
  // Support Packs
  // -------------------------------------

  getSupportPacks() {
    return new Request(this.host, this.apikey).get(`/supportpacks`);
  }

  postSupportPackExecute() {
    return new Request(this.host, this.apikey).post(`/supportpacks/execute`);
  }

  getSupportPackQueue(queueID) {
    return new Request(this.host, this.apikey).get(`/supportpacks/queue/${encodeURIComponent}`(queueID));
  }

  getSupportPack(filename) {
    return new Request(this.host, this.apikey).get(`/supportpacks/${encodeURIComponent}`(filename));
  }

  // -------------------------------------
  // Tags
  // -------------------------------------

  getTags() {
    return new Request(this.host, this.apikey).get(`/tags`);
  }

  postTag(payload) {
    return new Request(this.host, this.apikey).post(`/tags`, payload);
  }

  deleteTag(tagID) {
    return new Request(this.host, this.apikey).delete(`/tags/${tagID}`);
  }

  getTag(tagID) {
    return new Request(this.host, this.apikey).get(`/tags/${tagID}`);
  }

  patchTag(tagID, payload) {
    return new Request(this.host, this.apikey).patch(`/tags/${tagID}`, payload);
  }

  getTagDevices(tagID) {
    return new Request(this.host, this.apikey).get(`/tags/${tagID}/devices`);
  }

  postTagDevices(tagID, payload) {
    return new Request(this.host, this.apikey).post(`/tags/${tagID}/devices`, payload);
  }

  deleteTagDevice(tagID, deviceID) {
    return new Request(this.host, this.apikey).delete(`/tags/${tagID}/devices/${deviceID}`);
  }

  postTagDevice(tagID, deviceID) {
    return new Request(this.host, this.apikey).post(`/tags/${tagID}/devices/${deviceID}`);
  }

  // -------------------------------------
  // Triggers
  // -------------------------------------

  getTriggers() {
    return new Request(this.host, this.apikey).get(`/triggers`);
  }

  postTrigger(payload) {
    return new Request(this.host, this.apikey).post(`/triggers`, payload);
  }

  deleteTrigger(triggerID) {
    return new Request(this.host, this.apikey).delete(`/triggers/${triggerID}`);
  }

  getTrigger(triggerID) {
    return new Request(this.host, this.apikey).get(`/triggers/${triggerID}`);
  }

  patchTrigger(triggerID, payload) {
    return new Request(this.host, this.apikey).patch(`/triggers/${triggerID}`, payload);
  }

  getTriggerDeviceGroups(triggerID) {
    return new Request(this.host, this.apikey).get(`/triggers/${triggerID}/devicegroups`);
  }

  postTriggerDeviceGroups(triggerID, payload) {
    return new Request(this.host, this.apikey).post(`/triggers/${triggerID}/devicegroups`, payload);
  }

  deleteTriggerDeviceGroup(triggerID, deviceGroupID) {
    return new Request(this.host, this.apikey).delete(`/triggers/${triggerID}/devicegroups/${deviceGroupID}`);
  }

  postTriggerDeviceGroup(triggerID, deviceGroupID) {
    return new Request(this.host, this.apikey).post(`/triggers/${triggerID}/devicegroups/${deviceGroupID}`);
  }

  getTriggerDevices(triggerID) {
    return new Request(this.host, this.apikey).get(`/triggers/${triggerID}/devices`);
  }

  postTriggerDevices(triggerID, payload) {
    return new Request(this.host, this.apikey).post(`/triggers/${triggerID}/devices`, payload);
  }

  deleteTriggerDevice(triggerID, deviceID) {
    return new Request(this.host, this.apikey).delete(`/triggers/${triggerID}/devices/${deviceID}`);
  }

  postTriggerDevice(triggerID, deviceID) {
    return new Request(this.host, this.apikey).post(`/triggers/${triggerID}/devices/${deviceID}`);
  }

  // -------------------------------------
  // Users
  // -------------------------------------

  getUsers() {
    return new Request(this.host, this.apikey).get(`/users`);
  }

  postUser(payload) {
    return new Request(this.host, this.apikey).post(`/users`, payload);
  }

  deleteUser(user) {
    return new Request(this.host, this.apikey).delete(`/users/${user}`);
  }

  getUser(user) {
    return new Request(this.host, this.apikey).get(`/users/${user}`);
  }

  patchUser(user, payload) {
    return new Request(this.host, this.apikey).patch(`/users/${user}`, payload);
  }

  getUserApiKeys(user) {
    return new Request(this.host, this.apikey).get(`/users/${user}/apikeys`);
  }

  getUserApiKey(user, keyID) {
    return new Request(this.host, this.apikey).get(`/users/${user}/apikeys/${keyID}`);
  }

  // -------------------------------------
  // User Groups
  // -------------------------------------

  getUserGroups() {
    return new Request(this.host, this.apikey).get(`/usergroups`);
  }

  postUserGroupsRefresh() {
    return new Request(this.host, this.apikey).post(`/usergroups/refresh`);
  }

  getUserGroup(userGroupID) {
    return new Request(this.host, this.apikey).get(`/usergroups/${userGroupID}`);
  }

  patchUserGroup(userGroupID, payload) {
    return new Request(this.host, this.apikey).patch(`/usergroups/${userGroupID}`, payload);
  }

  deleteUserGroupAssociations(userGroupID) {
    return new Request(this.host, this.apikey).delete(`/usergroups/${userGroupID}`);
  }

  getUserGroupMembers(userGroupID) {
    return new Request(this.host, this.apikey).get(`/usergroups/${userGroupID}/members`);
  }

  postUserGroupRefresh(userGroupID) {
    return new Request(this.host, this.apikey).post(`/usergroups/${userGroupID}/refresh`);
  }

  // -------------------------------------
  // VLANs
  // -------------------------------------

  getVlans() {
    return new Request(this.host, this.apikey).get(`/vlans`);
  }

  getVlan(vlanID) {
    return new Request(this.host, this.apikey).get(`/vlans/${vlanID}`);
  }

  patchVlan(vlanID, payload) {
    return new Request(this.host, this.apikey).patch(`/vlans/${vlanID}`, payload);
  }

  // -------------------------------------
  // Whitelist
  // -------------------------------------

  deleteWhitelistDevice(deviceID) {
    return new Request(this.host, this.apikey).delete(`/whitelist/device/${deviceID}`);
  }

  postWhitelistDevice(deviceID) {
    return new Request(this.host, this.apikey).post(`/whitelist/device/${deviceID}`);
  }

  getWhitelistsDevices() {
    return new Request(this.host, this.apikey).get(`/whitelist/devices`);
  }

  postWhitelistDevices(payload) {
    return new Request(this.host, this.apikey).post(`/whitelist/devices`, payload);
  }
}
