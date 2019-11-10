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

  getActivityGroupDashboards(activityGroupId) {
    return new Request(this.host, this.apikey).get(`/activitygroups/${activityGroupId}/dashboards`);
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

  deleteActivityMap(activityMapId) {
    return new Request(this.host, this.apikey).delete(`/activitymaps/${activityMapId}`);
  }

  getActivityMap(activityMapId) {
    return new Request(this.host, this.apikey).get(`/activitymaps/${activityMapId}`);
  }

  patchActivityMap(activityMapId, payload) {
    return new Request(this.host, this.apikey).patch(`/activitymaps/${activityMapId}`, payload);
  }

  postActivityMapQuery(activityMapId, payload) {
    return new Request(this.host, this.apikey).post(`/activitymaps/${activityMapId}/query`, payload);
  }

  getActivityMapSharing(activityMapId) {
    return new Request(this.host, this.apikey).get(`/activitymaps/${activityMapId}/sharing`);
  }

  patchActivityMapSharing(activityMapId, payload) {
    return new Request(this.host, this.apikey).patch(`/activitymaps/${activityMapId}/sharing`, payload);
  }

  putActivityMapSharing(activityMapId, payload) {
    return new Request(this.host, this.apikey).put(`/activitymaps/${activityMapId}/sharing`, payload);
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

  deleteAlert(alertId) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertId}`);
  }

  getAlert(alertId) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertId}`);
  }

  patchAlert(alertId, payload) {
    return new Request(this.host, this.apikey).patch(`/alerts/${alertId}`, payload);
  }

  getAlertApplications(alertId) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertId}/applications`);
  }

  postAlertApplications(alertId, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/applications`, payload);
  }

  deleteAlertApplication(alertId, appId) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertId}/applications/${appId}`);
  }

  postAlertApplication(alertId, appId) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/applications/${appId}`);
  }

  getAlertDeviceGroups(alertId) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertId}/devicegroups`);
  }

  postAlertDeviceGroups(alertId, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/devicegroups`, payload);
  }

  deleteAlertDeviceGroup(alertId, deviceGroupId) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertId}/devicegroups/${deviceGroupId}`);
  }

  postAlertDeviceGroup(alertId, deviceGroupId) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/devicegroups/${deviceGroupId}`);
  }

  getAlertDevices(alertId) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertId}/devices`);
  }

  postAlertDevices(alertId, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/devices`, payload);
  }

  deleteAlertDevice(alertId, deviceId) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertId}/devices/${deviceId}`);
  }

  postAlertDevice(alertId, deviceId) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/devices/${deviceId}`);
  }

  getAlertEmailGroups(alertId) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertId}/emailgroups`);
  }

  postAlertEmailGroups(alertId, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/emailgroups`, payload);
  }

  deleteAlertEmailGroup(alertId, emailGroupId) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertId}/emailgroups/${emailGroupId}`);
  }

  postAlertEmailGroup(alertId, emailGroupId) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/emailgroups/${emailGroupId}`);
  }

  getAlertExclusionIntervals(alertId) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertId}/exclusionintervals`);
  }

  postAlertExclusionIntervals(alertId, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/exclusionintervals`, payload);
  }

  deleteAlertExclusionInterval(alertId, exclusionIntervalId) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertId}/exclusionintervals/${exclusionIntervalId}`);
  }

  postAlertExclusionInterval(alertId, exclusionIntervalId) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/exclusionintervals/${exclusionIntervalId}`);
  }

  getAlertNetworks(alertId) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertId}/networks`);
  }

  postAlertNetworks(alertId, payload) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/networks`, payload);
  }

  deleteAlertNetwork(alertId, networkId) {
    return new Request(this.host, this.apikey).delete(`/alerts/${alertId}/networks/${networkId}`);
  }

  postAlertNetwork(alertId, networkId) {
    return new Request(this.host, this.apikey).post(`/alerts/${alertId}/networks/${networkId}`);
  }

  getAlertStats(alertId) {
    return new Request(this.host, this.apikey).get(`/alerts/${alertId}/stats`);
  }

  // -------------------------------------
  // Analysis Priority
  // -------------------------------------

  getAnalysisPriorityConfig(applianceId = 0) {
    return new Request(this.host, this.apikey).get(`/analysispriority/config/${applianceId}`);
  }

  putAnalysisPriorityConfig(payload, applianceId = 0) {
    return new Request(this.host, this.apikey).put(`/analysispriority/config/${applianceId}`, payload);
  }

  getAnalysisPriorityManager(applianceId = 0) {
    return new Request(this.host, this.apikey).get(`/analysispriority/${applianceId}/manager`);
  }

  patchAnalysisPriorityManager(payload, applianceId = 0) {
    return new Request(this.host, this.apikey).patch(`/analysispriority/${applianceId}/manager`, payload);
  }

  // -------------------------------------
  // API
  // -------------------------------------

  getApiKeys() {
    return new Request(this.host, this.apikey).get(`/apikeys`);
  }

  getApiKey(keyId) {
    return new Request(this.host, this.apikey).get(`/apikeys/${keyId}`);
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

  getAppliance(applianceId) {
    return new Request(this.host, this.apikey).get(`/appliances/${applianceId}`);
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

  getApplication(appId) {
    return new Request(this.host, this.apikey).get(`/applications/${appId}`);
  }

  postApplication(appId, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}`, payload);
  }

  patchApplication(appId, payload) {
    return new Request(this.host, this.apikey).patch(`/applications/${appId}`, payload);
  }

  getApplicationActivity(appId) {
    return new Request(this.host, this.apikey).get(`/applications/${appId}/activity`);
  }

  getApplicationAlerts(appId) {
    return new Request(this.host, this.apikey).get(`/applications/${appId}/alerts`);
  }

  postApplicationAlerts(appId, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}/alerts`, payload);
  }

  deleteApplicationAlert(appId, alertId) {
    return new Request(this.host, this.apikey).delete(`/applications/${appId}/alerts/${alertId}`);
  }

  postApplicationAlert(appId, alertId) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}/alerts/${alertId}`);
  }

  getApplicationDashboards(appId) {
    return new Request(this.host, this.apikey).get(`/applications/${appId}/dashboards`);
  }

  getApplicationFlexGrids(appId) {
    return new Request(this.host, this.apikey).get(`/applications/${appId}/flexgrids`);
  }

  postApplicationFlexGrids(appId, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}/flexgrids`, payload);
  }

  deleteApplicationFlexGrid(appId, flexGridId) {
    return new Request(this.host, this.apikey).delete(`/applications/${appId}/flexgrids/${flexGridId}`);
  }

  postApplicationFlexGrid(appId, flexGridId) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}/flexgrids/${flexGridId}`);
  }

  getApplicationGeomaps(appId) {
    return new Request(this.host, this.apikey).get(`/applications/${appId}/geomaps`);
  }

  postApplicationGeomaps(appId, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}/geomaps`, payload);
  }

  deleteApplicationGeomap(appId, geomapId) {
    return new Request(this.host, this.apikey).delete(`/applications/${appId}/geomaps/${geomapId}`);
  }

  postApplicationGeomap(appId, geomapId) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}/geomaps/${geomapId}`);
  }

  getApplicationPages(appId) {
    return new Request(this.host, this.apikey).get(`/applications/${appId}/pages`);
  }

  postApplicationPages(appId, payload) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}/pages`, payload);
  }

  deleteApplicationPage(appId, pageId) {
    return new Request(this.host, this.apikey).delete(`/applications/${appId}/pages/${pageId}`);
  }

  postApplicationPage(appId, pageId) {
    return new Request(this.host, this.apikey).post(`/applications/${appId}/pages/${pageId}`);
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

  deleteBundle(bundleId) {
    return new Request(this.host, this.apikey).delete(`/bundles/${bundleId}`);
  }

  getBundle(bundleId) {
    return new Request(this.host, this.apikey).get(`/bundles/${bundleId}`);
  }

  postBundleApply(bundleId, payload) {
    return new Request(this.host, this.apikey).post(`/bundles/${bundleId}/apply`, payload);
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

  deleteCustomDevice(customDeviceId) {
    return new Request(this.host, this.apikey).delete(`/customdevices/${customDeviceId}`);
  }

  getCustomDevice(customDeviceId, includeCriteria) {
    const queryString = Utils.buildQuery({'include_criteria': includeCriteria});
    return new Request(this.host, this.apikey).get(`/customdevices/${customDeviceId}${ queryString || '' }`);
  }

  patchCustomDevice(customDeviceId, payload) {
    return new Request(this.host, this.apikey).patch(`/customdevices/${customDeviceId}`, payload);
  }

  getCustomDeviceCriteria(customDeviceId) {
    return new Request(this.host, this.apikey).get(`/customdevices/${customDeviceId}/criteria`);
  }

  postCustomDeviceCriteria(customDeviceId, payload) {
    return new Request(this.host, this.apikey).post(`/customdevices/${customDeviceId}/criteria`, payload);
  }

  deleteCustomDeviceCriteria(customDeviceId, criteriaId) {
    return new Request(this.host, this.apikey).delete(`/customdevices/${customDeviceId}/criteria/${criteriaId}`);
  }

  getCustomDeviceCriterion(customDeviceId, criteriaId) {
    return new Request(this.host, this.apikey).get(`/customdevices/${customDeviceId}/criteria/${criteriaId}`);
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

  deleteCustomization(customizationId) {
    return new Request(this.host, this.apikey).delete(`/customizations/${customizationId}`);
  }

  getCustomization(customizationId) {
    return new Request(this.host, this.apikey).get(`/customizations/${customizationId}`);
  }

  postCustomizationApply(customizationId) {
    return new Request(this.host, this.apikey).post(`/customizations/${customizationId}/apply`);
  }

  postCustomizationDownload(customizationId) {
    return new Request(this.host, this.apikey).post(`/customizations/${customizationId}/download`);
  }

  // -------------------------------------
  // Dashboards
  // -------------------------------------

  getDashboards() {
    return new Request(this.host, this.apikey).get(`/dashboards`);
  }

  deleteDashboard(dashboardId) {
    return new Request(this.host, this.apikey).delete(`/dashboards/${dashboardId}`);
  }

  getDashboard(dashboardId) {
    return new Request(this.host, this.apikey).get(`/dashboards/${dashboardId}`);
  }

  patchDashboard(dashboardId, payload) {
    return new Request(this.host, this.apikey).patch(`/dashboards/${dashboardId}`, payload);
  }

  getDashboardReports(dashboardId) {
    return new Request(this.host, this.apikey).get(`/dashboards/${dashboardId}/reports`);
  }

  getDashboardSharing(dashboardId) {
    return new Request(this.host, this.apikey).get(`/dashboards/${dashboardId}/sharing`);
  }

  patchDashboardSharing(dashboardId, payload) {
    return new Request(this.host, this.apikey).patch(`/dashboards/${dashboardId}/sharing`, payload);
  }

  putDashboardSharing(dashboardId, payload) {
    return new Request(this.host, this.apikey).put(`/dashboards/${dashboardId}/sharing`, payload);
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

  getDevice(deviceId) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}`);
  }

  patchDevice(deviceId, payload) {
    return new Request(this.host, this.apikey).patch(`/devices/${deviceId}`, payload);
  }

  getDeviceActivity(deviceId) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/activity`);
  }

  getDeviceAlerts(deviceId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/alerts${ queryString || '' }`);
  }

  postDeviceAlerts(deviceId, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/alerts`, payload);
  }

  deleteDeviceAlert(deviceId, alertId) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceId}/alerts/${alertId}`);
  }

  postDeviceAlert(deviceId, alertId) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/alerts/${alertId}`);
  }

  getDeviceDashboards(deviceId) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/dashboards`);
  }

  getDeviceDeviceGroups(deviceId) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/devicegroups`);
  }

  postDeviceDeviceGroups(deviceId, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/devicegroups`, payload);
  }

  deleteDeviceDeviceGroup(deviceId, deviceGroupId) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceId}/devicegroups/${deviceGroupId}`);
  }

  postDeviceDeviceGroup(deviceId, deviceGroupId) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/devicegroups/${deviceGroupId}`);
  }

  getDeviceFlexGrids(deviceId) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/flexgrids`);
  }

  postDeviceFlexGrids(deviceId, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/flexgrids`, payload);
  }

  deleteDeviceFlexGrid(deviceId, flexGridId) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceId}/flexgrids/${flexGridId}`);
  }

  postDeviceFlexGrid(deviceId, flexGridId) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/flexgrids/${flexGridId}`);
  }

  getDeviceGeomaps(deviceId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/geomaps${ queryString || '' }`);
  }

  postDeviceGeomaps(deviceId, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/geomaps`, payload);
  }

  deleteDeviceGeomap(deviceId, geomapId) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceId}/geomaps/${geomapId}`);
  }

  postDeviceGeomap(deviceId, geomapId) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/geomaps/${geomapId}`);
  }

  getDevicePages(deviceId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/pages${ queryString || '' }`);
  }

  postDevicePages(deviceId, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/pages`, payload);
  }

  deleteDevicePage(deviceId, pageId) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceId}/pages/${pageId}`);
  }

  postDevicePage(deviceId, pageId) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/pages/${pageId}`);
  }

  getDeviceTags(deviceId) {
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/tags`);
  }

  postDeviceTags(deviceId, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/tags`, payload);
  }

  deleteDeviceTag(deviceId, tagId) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceId}/tags/${tagId}`);
  }

  postDeviceTag(deviceId, tagId) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/tags/${tagId}`);
  }

  getDeviceTriggers(deviceId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/triggers${ queryString || '' }`);
  }

  postDeviceTriggers(deviceId, payload) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/triggers`, payload);
  }

  deleteDeviceTrigger(deviceId, triggerId) {
    return new Request(this.host, this.apikey).delete(`/devices/${deviceId}/triggers/${triggerId}`);
  }

  postDeviceTrigger(deviceId, triggerId) {
    return new Request(this.host, this.apikey).post(`/devices/${deviceId}/triggers/${triggerId}`);
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

  deleteDeviceGroup(deviceGroupId) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupId}`);
  }

  getDeviceGroup(deviceGroupId) {
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}`);
  }

  patchDeviceGroup(deviceGroupId, payload) {
    return new Request(this.host, this.apikey).patch(`/devicegroups/${deviceGroupId}`, payload);
  }

  getDeviceGroupAlerts(deviceGroupId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/alerts${ queryString || '' }`);
  }

  postDeviceGroupAlerts(deviceGroupId, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/alerts`, payload);
  }

  deleteDeviceGroupAlert(deviceGroupId, alertId) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupId}/alerts/${alertId}`);
  }

  postDeviceGroupAlert(deviceGroupId, alertId) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/alerts/${alertId}`);
  }

  getDeviceGroupDashboards(deviceGroupId) {
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/dashboards`);
  }

  getDeviceGroupDevices(deviceGroupId, activeFrom, activeUntil, limit, offset) {
    const queryString = Utils.buildQuery({ activeFrom, activeUntil, limit, offset });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/devices${ queryString || '' }`);
  }

  postDeviceGroupDevices(deviceGroupId, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/devices`, payload);
  }

  deleteDeviceGroupDevice(deviceGroupId, deviceId) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupId}/devices/${deviceId}`);
  }

  postDeviceGroupDevice(deviceGroupId, deviceId) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/devices/${deviceId}`);
  }

  getDeviceGroupFlexGrids(deviceGroupId) {
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/flexgrids`);
  }

  postDeviceGroupFlexGrids(deviceGroupId, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/flexgrids`, payload);
  }

  deleteDeviceGroupFlexGrid(deviceGroupId, flexGridId) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupId}/flexgrids/${flexGridId}`);
  }

  postDeviceGroupFlexGrid(deviceGroupId, flexGridId) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/flexgrids/${flexGridId}`);
  }

  getDeviceGroupGeomaps(deviceGroupId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/geomaps${ queryString || '' }`);
  }

  postDeviceGroupGeomaps(deviceGroupId, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/geomaps`, payload);
  }

  deleteDeviceGroupGeomap(deviceGroupId, geomapId) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupId}/geomaps/${geomapId}`);
  }

  postDeviceGroupGeomap(deviceGroupId, geomapId) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/geomaps/${geomapId}`);
  }

  getDeviceGroupPages(deviceGroupId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/pages${ queryString || '' }`);
  }

  postDeviceGroupPages(deviceGroupId, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/pages`, payload);
  }

  deleteDeviceGroupPage(deviceGroupId, pageId) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupId}/pages/${pageId}`);
  }

  postDeviceGroupPage(deviceGroupId, pageId) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/pages/${pageId}`);
  }

  getDeviceGroupTags(deviceGroupId) {
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/tags`);
  }

  postDeviceGroupTags(deviceGroupId, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/tags`, payload);
  }

  deleteDeviceGroupTag(deviceGroupId, tagId) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupId}/tags/${tagId}`);
  }

  postDeviceGroupTag(deviceGroupId, tagId) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/tags/${tagId}`);
  }

  getDeviceGroupTriggers(deviceGroupId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/triggers${ queryString || '' }`);
  }

  postDeviceGroupTriggers(deviceGroupId, payload) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/triggers`, payload);
  }

  deleteDeviceGroupTrigger(deviceGroupId, triggerId) {
    return new Request(this.host, this.apikey).delete(`/devicegroups/${deviceGroupId}/triggers/${triggerId}`);
  }

  postDeviceGroupTrigger(deviceGroupId, triggerId) {
    return new Request(this.host, this.apikey).post(`/devicegroups/${deviceGroupId}/triggers/${triggerId}`);
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

  deleteEmailGroup(emailGroupId) {
    return new Request(this.host, this.apikey).delete(`/emailgroups/${emailGroupId}`);
  }

  getEmailGroup(emailGroupId) {
    return new Request(this.host, this.apikey).get(`/emailgroups/${emailGroupId}`);
  }

  patchEmailGroup(emailGroupId, payload) {
    return new Request(this.host, this.apikey).patch(`/emailgroups/${emailGroupId}`, payload);
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

  deleteExclusionInterval(exclusionIntervalId) {
    return new Request(this.host, this.apikey).delete(`/exclusionintervals/${exclusionIntervalId}`);
  }

  getExclusionInterval(exclusionIntervalId) {
    return new Request(this.host, this.apikey).get(`/exclusionintervals/${exclusionIntervalId}`);
  }

  patchExclusionInterval(exclusionIntervalId, payload) {
    return new Request(this.host, this.apikey).patch(`/exclusionintervals/${exclusionIntervalId}`, payload);
  }

  // -------------------------------------
  // Extrahop
  // -------------------------------------

  getExtrahop() {
    return new Request(this.host, this.apikey).get(`/extrahop`);
  }

  getExtrahopIdrac() {
    return new Request(this.host, this.apikey).get(`/extrahop/idrac`);
  }

  getExtrahopPlatform() {
    return new Request(this.host, this.apikey).get(`/extrahop/platform`);
  }

  getExtrahopProcesses() {
    return new Request(this.host, this.apikey).get(`/extrahop/processes`);
  }

  postExtrahopProcessRestart(processId) {
    return new Request(this.host, this.apikey).post(`/extrahop/processes/${processId}/restart`);
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

  getFlexGridApplications(flexGridId) {
    return new Request(this.host, this.apikey).get(`/flexgrids/${flexGridId}/applications`);
  }

  postFlexGridApplications(flexGridId, payload) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridId}/applications`, payload);
  }

  deleteFlexGridApplication(flexGridId, appId) {
    return new Request(this.host, this.apikey).delete(`/flexgrids/${flexGridId}/applications/${appId}`);
  }

  postFlexGridApplication(flexGridId, appId) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridId}/applications/${appId}`);
  }

  getFlexGridDeviceGroups(flexGridId) {
    return new Request(this.host, this.apikey).get(`/flexgrids/${flexGridId}/devicegroups`);
  }

  postFlexGridDeviceGroups(flexGridId, payload) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridId}/devicegroups`, payload);
  }

  deleteFlexGridDeviceGroup(flexGridId, deviceGroupId) {
    return new Request(this.host, this.apikey).delete(`/flexgrids/${flexGridId}/devicegroups/${deviceGroupId}`);
  }

  postFlexGridDeviceGroup(flexGridId, deviceGroupId) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridId}/devicegroups/${deviceGroupId}`);
  }

  getFlexGridDevices(flexGridId) {
    return new Request(this.host, this.apikey).get(`/flexgrids/${flexGridId}/devices`);
  }

  postFlexGridDevices(flexGridId, payload) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridId}/devices`, payload);
  }

  deleteFlexGridDevice(flexGridId, deviceId) {
    return new Request(this.host, this.apikey).delete(`/flexgrids/${flexGridId}/devices/${deviceId}`);
  }

  postFlexGridDevice(flexGridId, deviceId) {
    return new Request(this.host, this.apikey).post(`/flexgrids/${flexGridId}/devices/${deviceId}`);
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

  deleteGeomap(geomapId) {
    return new Request(this.host, this.apikey).delete(`/geomaps/${geomapId}`);
  }

  getGeomap(geomapId) {
    return new Request(this.host, this.apikey).get(`/geomaps/${geomapId}`);
  }

  patchGeomap(geomapId, payload) {
    return new Request(this.host, this.apikey).patch(`/geomaps/${geomapId}`, payload);
  }

  getGeomapApplications(geomapId) {
    return new Request(this.host, this.apikey).get(`/geomaps/${geomapId}/applications`);
  }

  postGeomapApplications(geomapId, payload) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapId}/applications`, payload);
  }

  deleteGeomapApplication(geomapId, appId) {
    return new Request(this.host, this.apikey).delete(`/geomaps/${geomapId}/applications/${appId}`);
  }

  postGeomapApplication(geomapId, appId) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapId}/applications/${appId}`);
  }

  getGeomapDeviceGroups(geomapId) {
    return new Request(this.host, this.apikey).get(`/geomaps/${geomapId}/devicegroups`);
  }

  postGeomapDeviceGroups(geomapId, payload) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapId}/devicegroups`, payload);
  }

  deleteGeomapDeviceGroup(geomapId, deviceGroupId) {
    return new Request(this.host, this.apikey).delete(`/geomaps/${geomapId}/devicegroups/${deviceGroupId}`);
  }

  postGeomapDeviceGroup(geomapId, deviceGroupId) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapId}/devicegroups/${deviceGroupId}`);
  }

  getGeomapDevices(geomapId) {
    return new Request(this.host, this.apikey).get(`/geomaps/${geomapId}/devices`);
  }

  postGeomapDevices(geomapId, payload) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapId}/devices`, payload);
  }

  deleteGeomapDevice(geomapId, deviceId) {
    return new Request(this.host, this.apikey).delete(`/geomaps/${geomapId}/devices/${deviceId}`);
  }

  postGeomapDevice(geomapId, deviceId) {
    return new Request(this.host, this.apikey).post(`/geomaps/${geomapId}/devices/${deviceId}`);
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

  getMetricsNextXId(xId) {
    return new Request(this.host, this.apikey).get(`/metrics/next/${xId}`);
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

  getNetwork(networkId) {
    return new Request(this.host, this.apikey).get(`/networks/${networkId}`);
  }

  patchNetwork(networkId, payload) {
    return new Request(this.host, this.apikey).patch(`/networks/${networkId}`, payload);
  }

  getNetworkAlerts(networkId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/networks/${networkId}/alerts${ queryString || '' }`);
  }

  postNetworkAlerts(networkId, payload) {
    return new Request(this.host, this.apikey).post(`/networks/${networkId}/alerts`, payload);
  }

  deleteNetworkAlert(networkId, alertId) {
    return new Request(this.host, this.apikey).delete(`/networks/${networkId}/alerts/${alertId}`);
  }

  postNetworkAlert(networkId, alertId) {
    return new Request(this.host, this.apikey).post(`/networks/${networkId}/alerts/${alertId}`);
  }

  getNetworkPages(networkId, direct_assignments_only) {
    const queryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/networks/${networkId}/pages${ queryString || '' }`);
  }

  postNetworkPages(networkId, payload) {
    return new Request(this.host, this.apikey).post(`/networks/${networkId}/pages`, payload);
  }

  deleteNetworkPage(networkId, pageId) {
    return new Request(this.host, this.apikey).delete(`/networks/${networkId}/pages/${pageId}`);
  }

  postNetworkPage(networkId, pageId) {
    return new Request(this.host, this.apikey).post(`/networks/${networkId}/pages/${pageId}`);
  }

  getNetworkVlans(networkId) {
    return new Request(this.host, this.apikey).get(`/networks/${networkId}/vlans`);
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

  deleteNetworkLocality(networkLocalityId) {
    return new Request(this.host, this.apikey).delete(`/networklocality/${networkLocalityId}`);
  }

  getNetworkLocality(networkLocalityId) {
    return new Request(this.host, this.apikey).get(`/networklocality/${networkLocalityId}`);
  }

  patchNetworkLocality(networkLocalityId, payload) {
    return new Request(this.host, this.apikey).patch(`/networklocality/${networkLocalityId}`, payload);
  }

  // -------------------------------------
  // Nodes
  // -------------------------------------

  getNodes() {
    return new Request(this.host, this.apikey).get(`/nodes`);
  }

  getNode(nodeId) {
    return new Request(this.host, this.apikey).get(`/nodes/${nodeId}`);
  }

  patchNode(nodeId, payload) {
    return new Request(this.host, this.apikey).patch(`/nodes/${nodeId}`, payload);
  }

  // -------------------------------------
  // Packet Captures
  // -------------------------------------

  getPacketCaptures() {
    return new Request(this.host, this.apikey).get(`/packetcaptures`);
  }

  deletePacketCapture(packetCaptureId) {
    return new Request(this.host, this.apikey).delete(`/packetcaptures/${packetCaptureId}`);
  }

  getPacketCapture(packetCaptureId) {
    return new Request(this.host, this.apikey).get(`/packetcaptures/${packetCaptureId}`);
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

  deletePage(pageId) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageId}`);
  }

  getPage(pageId) {
    return new Request(this.host, this.apikey).get(`/pages/${pageId}`);
  }

  patchPage(pageId, payload) {
    return new Request(this.host, this.apikey).patch(`/pages/${pageId}`, payload);
  }

  getPageApplications(pageId) {
    return new Request(this.host, this.apikey).get(`/pages/${pageId}/applications`);
  }

  postPageApplications(pageId, payload) {
    return new Request(this.host, this.apikey).post(`/pages/${pageId}/applications`, payload);
  }

  deletePageApplication(pageId, appId) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageId}/applications/${appId}`);
  }

  postPageApplication(pageId, appId) {
    return new Request(this.host, this.apikey).post(`/pages/${pageId}/applications/${appId}`);
  }

  getPageDeviceGroups(pageId) {
    return new Request(this.host, this.apikey).get(`/pages/${pageId}/devicegroups`);
  }

  postPageDeviceGroups(pageId, payload) {
    return new Request(this.host, this.apikey).post(`/pages/${pageId}/devicegroups`, payload);
  }

  deletePageDeviceGroup(pageId, deviceGroupId) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageId}/devicegroups/${deviceGroupId}`);
  }

  postPageDeviceGroup(pageId, deviceGroupId) {
    return new Request(this.host, this.apikey).post(`/pages/${pageId}/devicegroups/${deviceGroupId}`);
  }

  getPageDevices(pageId) {
    return new Request(this.host, this.apikey).get(`/pages/${pageId}/devices`);
  }

  postPageDevices(pageId, payload) {
    return new Request(this.host, this.apikey).post(`/pages/${pageId}/devices`, payload);
  }

  deletePageDevice(pageId, deviceId) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageId}/devices/${deviceId}`);
  }

  postPageDevice(pageId, deviceId) {
    return new Request(this.host, this.apikey).post(`/pages/${pageId}/devices/${deviceId}`);
  }

  getPageNetworks(pageId) {
    return new Request(this.host, this.apikey).get(`/pages/${pageId}/networks`);
  }

  postPageNetworks(pageId, payload) {
    return new Request(this.host, this.apikey).post(`/pages/${pageId}/networks`, payload);
  }

  deletePageNetwork(pageId, networkId) {
    return new Request(this.host, this.apikey).delete(`/pages/${pageId}/networks/${networkId}`);
  }

  postPageNetwork(pageId, networkId) {
    return new Request(this.host, this.apikey).post(`/pages/${pageId}/networks/${networkId}`);
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

  deleteReport(reportId) {
    return new Request(this.host, this.apikey).delete(`/reports/${reportId}`);
  }

  getReport(reportId) {
    return new Request(this.host, this.apikey).get(`/reports/${reportId}`);
  }

  patchReport(reportId, payload) {
    return new Request(this.host, this.apikey).patch(`/reports/${reportId}`, payload);
  }

  getReportContents(reportId) {
    return new Request(this.host, this.apikey).get(`/reports/${reportId}/contents`);
  }

  putReportContents(reportId, payload) {
    return new Request(this.host, this.apikey).put(`/reports/${reportId}/contents`, payload);
  }

  getReportEmailGroups(reportId) {
    return new Request(this.host, this.apikey).get(`/reports/${reportId}/emailgroups`);
  }

  postReportEmailGroups(reportId, payload) {
    return new Request(this.host, this.apikey).post(`/reports/${reportId}/emailgroups`, payload);
  }

  deleteReportEmailGroup(reportId, emailGroupId) {
    return new Request(this.host, this.apikey).delete(`/reports/${reportId}/emailgroups/${emailGroupId}`);
  }

  postReportEmailGroup(reportId, emailGroupId) {
    return new Request(this.host, this.apikey).post(`/reports/${reportId}/emailgroups/${emailGroupId}`);
  }

  postReportQueue(reportId) {
    return new Request(this.host, this.apikey).post(`/reports/${reportId}/queue`);
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

  deleteSslDecryptKey(sslDecryptKeyId) {
    return new Request(this.host, this.apikey).delete(`/ssldecryptkeys/${sslDecryptKeyId}`);
  }

  getSslDecryptKey(sslDecryptKeyId) {
    return new Request(this.host, this.apikey).get(`/ssldecryptkeys/${sslDecryptKeyId}`);
  }

  patchSslDecryptKey(sslDecryptKeyId, payload) {
    return new Request(this.host, this.apikey).patch(`/ssldecryptkeys/${sslDecryptKeyId}`, payload);
  }

  getSslDecryptKeyProtocols(sslDecryptKeyId) {
    return new Request(this.host, this.apikey).get(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols`);
  }

  postSslDecryptKeyProtocols(sslDecryptKeyId, payload) {
    return new Request(this.host, this.apikey).post(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols`, payload);
  }

  deleteSslDecryptKeyProtocol(sslDecryptKeyId, protocolId) {
    return new Request(this.host, this.apikey).delete(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols/${protocolId}`);
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

  getSupportPackQueue(queueId) {
    return new Request(this.host, this.apikey).get(`/supportpacks/queue/${encodeURIComponent}`(queueId));
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

  deleteTag(tagId) {
    return new Request(this.host, this.apikey).delete(`/tags/${tagId}`);
  }

  getTag(tagId) {
    return new Request(this.host, this.apikey).get(`/tags/${tagId}`);
  }

  patchTag(tagId, payload) {
    return new Request(this.host, this.apikey).patch(`/tags/${tagId}`, payload);
  }

  getTagDevices(tagId) {
    return new Request(this.host, this.apikey).get(`/tags/${tagId}/devices`);
  }

  postTagDevices(tagId, payload) {
    return new Request(this.host, this.apikey).post(`/tags/${tagId}/devices`, payload);
  }

  deleteTagDevice(tagId, deviceId) {
    return new Request(this.host, this.apikey).delete(`/tags/${tagId}/devices/${deviceId}`);
  }

  postTagDevice(tagId, deviceId) {
    return new Request(this.host, this.apikey).post(`/tags/${tagId}/devices/${deviceId}`);
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

  deleteTrigger(triggerId) {
    return new Request(this.host, this.apikey).delete(`/triggers/${triggerId}`);
  }

  getTrigger(triggerId) {
    return new Request(this.host, this.apikey).get(`/triggers/${triggerId}`);
  }

  patchTrigger(triggerId, payload) {
    return new Request(this.host, this.apikey).patch(`/triggers/${triggerId}`, payload);
  }

  getTriggerDeviceGroups(triggerId) {
    return new Request(this.host, this.apikey).get(`/triggers/${triggerId}/devicegroups`);
  }

  postTriggerDeviceGroups(triggerId, payload) {
    return new Request(this.host, this.apikey).post(`/triggers/${triggerId}/devicegroups`, payload);
  }

  deleteTriggerDeviceGroup(triggerId, deviceGroupId) {
    return new Request(this.host, this.apikey).delete(`/triggers/${triggerId}/devicegroups/${deviceGroupId}`);
  }

  postTriggerDeviceGroup(triggerId, deviceGroupId) {
    return new Request(this.host, this.apikey).post(`/triggers/${triggerId}/devicegroups/${deviceGroupId}`);
  }

  getTriggerDevices(triggerId) {
    return new Request(this.host, this.apikey).get(`/triggers/${triggerId}/devices`);
  }

  postTriggerDevices(triggerId, payload) {
    return new Request(this.host, this.apikey).post(`/triggers/${triggerId}/devices`, payload);
  }

  deleteTriggerDevice(triggerId, deviceId) {
    return new Request(this.host, this.apikey).delete(`/triggers/${triggerId}/devices/${deviceId}`);
  }

  postTriggerDevice(triggerId, deviceId) {
    return new Request(this.host, this.apikey).post(`/triggers/${triggerId}/devices/${deviceId}`);
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

  getUserApiKey(user, keyId) {
    return new Request(this.host, this.apikey).get(`/users/${user}/apikeys/${keyId}`);
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

  getUserGroup(userGroupId) {
    return new Request(this.host, this.apikey).get(`/usergroups/${userGroupId}`);
  }

  patchUserGroup(userGroupId, payload) {
    return new Request(this.host, this.apikey).patch(`/usergroups/${userGroupId}`, payload);
  }

  deleteUserGroupAssociations(userGroupId) {
    return new Request(this.host, this.apikey).delete(`/usergroups/${userGroupId}`);
  }

  getUserGroupMembers(userGroupId) {
    return new Request(this.host, this.apikey).get(`/usergroups/${userGroupId}/members`);
  }

  postUserGroupRefresh(userGroupId) {
    return new Request(this.host, this.apikey).post(`/usergroups/${userGroupId}/refresh`);
  }

  // -------------------------------------
  // VLANs
  // -------------------------------------

  getVlans() {
    return new Request(this.host, this.apikey).get(`/vlans`);
  }

  getVlan(vlanId) {
    return new Request(this.host, this.apikey).get(`/vlans/${vlanId}`);
  }

  patchVlan(vlanId, payload) {
    return new Request(this.host, this.apikey).patch(`/vlans/${vlanId}`, payload);
  }

  // -------------------------------------
  // Whitelist
  // -------------------------------------

  deleteWhitelistDevice(deviceId) {
    return new Request(this.host, this.apikey).delete(`/whitelist/device/${deviceId}`);
  }

  postWhitelistDevice(deviceId) {
    return new Request(this.host, this.apikey).post(`/whitelist/device/${deviceId}`);
  }

  getWhitelistsDevices() {
    return new Request(this.host, this.apikey).get(`/whitelist/devices`);
  }

  postWhitelistDevices(payload) {
    return new Request(this.host, this.apikey).post(`/whitelist/devices`, payload);
  }
}
