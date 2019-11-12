// Appliance.model.js

const Request = require('../../models/_http/AsyncRequest.model');
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

module.exports = class Appliance {
  constructor(appliance) {
    this.id = appliance.id;
    this.host = appliance.host || appliance.hostname;
    this.apikey = appliance.apikey;
    this.type = appliance.type;
    this.active = this.init();

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

  init() {
    return this.getExtrahop().then((response) => {
      console.info(`${Icons.Info} Connected to ${this.host}`);
      this.populate();
      return true;
    })
    .catch((error) => {
      console.info(`${Icons.Warn} Error connecting to ${this.host}`);
      return false;
    });
  }

  populate() {
    this.getAppliances().then((response) => {
      const thisAppliance = response.data.find(x => x.hostname == this.host);
      this.merge(thisAppliance);
    })
    .catch((error) => {
      console.info(`${Icons.Warn} Error populating data for ${this.host}`);
    });
  }

  merge(remoteData) {
    Object.keys(remoteData).forEach(key => {
      if ( !this[key] )
        this[key] = remoteData[key];
    });
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

  async getActivityGroups() {
    return await (new Request(this.host, this.apikey)).get(`/activitygroups`);
  }

  async getActivityGroupDashboards(activityGroupId) {
    return await (new Request(this.host, this.apikey)).get(`/activitygroups/${activityGroupId}/dashboards`);
  }

  // -------------------------------------
  // Activity Maps
  // -------------------------------------

  async getActivityMaps() {
    return await (new Request(this.host, this.apikey)).get(`/activitymaps`);
  }

  async postActivityMaps(payload) {
    return await (new Request(this.host, this.apikey)).post(`/activitymaps`, payload);
  }

  async postActivityMapsQuery(payload) {
    return await (new Request(this.host, this.apikey)).post(`/activitymaps/query`, payload);
  }

  async deleteActivityMap(activityMapId) {
    return await (new Request(this.host, this.apikey)).delete(`/activitymaps/${activityMapId}`);
  }

  async getActivityMap(activityMapId) {
    return await (new Request(this.host, this.apikey)).get(`/activitymaps/${activityMapId}`);
  }

  async patchActivityMap(activityMapId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/activitymaps/${activityMapId}`, payload);
  }

  async postActivityMapQuery(activityMapId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/activitymaps/${activityMapId}/query`, payload);
  }

  async getActivityMapSharing(activityMapId) {
    return await (new Request(this.host, this.apikey)).get(`/activitymaps/${activityMapId}/sharing`);
  }

  async patchActivityMapSharing(activityMapId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/activitymaps/${activityMapId}/sharing`, payload);
  }

  async putActivityMapSharing(activityMapId, payload) {
    return await (new Request(this.host, this.apikey)).put(`/activitymaps/${activityMapId}/sharing`, payload);
  }

  // -------------------------------------
  // Alerts
  // -------------------------------------

  async getAlerts() {
    return await (new Request(this.host, this.apikey)).get(`/alerts`);
  }

  async postAlert(payload) {
    return await (new Request(this.host, this.apikey)).post(`/alerts`, payload);
  }

  async deleteAlert(alertId) {
    return await (new Request(this.host, this.apikey)).delete(`/alerts/${alertId}`);
  }

  async getAlert(alertId) {
    return await (new Request(this.host, this.apikey)).get(`/alerts/${alertId}`);
  }

  async patchAlert(alertId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/alerts/${alertId}`, payload);
  }

  async getAlertApplications(alertId) {
    return await (new Request(this.host, this.apikey)).get(`/alerts/${alertId}/applications`);
  }

  async postAlertApplications(alertId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/applications`, payload);
  }

  async deleteAlertApplication(alertId, appId) {
    return await (new Request(this.host, this.apikey)).delete(`/alerts/${alertId}/applications/${appId}`);
  }

  async postAlertApplication(alertId, appId) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/applications/${appId}`);
  }

  async getAlertDeviceGroups(alertId) {
    return await (new Request(this.host, this.apikey)).get(`/alerts/${alertId}/devicegroups`);
  }

  async postAlertDeviceGroups(alertId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/devicegroups`, payload);
  }

  async deleteAlertDeviceGroup(alertId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/alerts/${alertId}/devicegroups/${deviceGroupId}`);
  }

  async postAlertDeviceGroup(alertId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/devicegroups/${deviceGroupId}`);
  }

  async getAlertDevices(alertId) {
    return await (new Request(this.host, this.apikey)).get(`/alerts/${alertId}/devices`);
  }

  async postAlertDevices(alertId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/devices`, payload);
  }

  async deleteAlertDevice(alertId, deviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/alerts/${alertId}/devices/${deviceId}`);
  }

  async postAlertDevice(alertId, deviceId) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/devices/${deviceId}`);
  }

  async getAlertEmailGroups(alertId) {
    return await (new Request(this.host, this.apikey)).get(`/alerts/${alertId}/emailgroups`);
  }

  async postAlertEmailGroups(alertId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/emailgroups`, payload);
  }

  async deleteAlertEmailGroup(alertId, emailGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/alerts/${alertId}/emailgroups/${emailGroupId}`);
  }

  async postAlertEmailGroup(alertId, emailGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/emailgroups/${emailGroupId}`);
  }

  async getAlertExclusionIntervals(alertId) {
    return await (new Request(this.host, this.apikey)).get(`/alerts/${alertId}/exclusionintervals`);
  }

  async postAlertExclusionIntervals(alertId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/exclusionintervals`, payload);
  }

  async deleteAlertExclusionInterval(alertId, exclusionIntervalId) {
    return await (new Request(this.host, this.apikey)).delete(`/alerts/${alertId}/exclusionintervals/${exclusionIntervalId}`);
  }

  async postAlertExclusionInterval(alertId, exclusionIntervalId) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/exclusionintervals/${exclusionIntervalId}`);
  }

  async getAlertNetworks(alertId) {
    return await (new Request(this.host, this.apikey)).get(`/alerts/${alertId}/networks`);
  }

  async postAlertNetworks(alertId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/networks`, payload);
  }

  async deleteAlertNetwork(alertId, networkId) {
    return await (new Request(this.host, this.apikey)).delete(`/alerts/${alertId}/networks/${networkId}`);
  }

  async postAlertNetwork(alertId, networkId) {
    return await (new Request(this.host, this.apikey)).post(`/alerts/${alertId}/networks/${networkId}`);
  }

  async getAlertStats(alertId) {
    return await (new Request(this.host, this.apikey)).get(`/alerts/${alertId}/stats`);
  }

  // -------------------------------------
  // Analysis Priority
  // -------------------------------------

  async getAnalysisPriorityConfig(applianceId = 0) {
    return await (new Request(this.host, this.apikey)).get(`/analysispriority/config/${applianceId}`);
  }

  async putAnalysisPriorityConfig(payload, applianceId = 0) {
    return await (new Request(this.host, this.apikey)).put(`/analysispriority/config/${applianceId}`, payload);
  }

  async getAnalysisPriorityManager(applianceId = 0) {
    return await (new Request(this.host, this.apikey)).get(`/analysispriority/${applianceId}/manager`);
  }

  async patchAnalysisPriorityManager(payload, applianceId = 0) {
    return await (new Request(this.host, this.apikey)).patch(`/analysispriority/${applianceId}/manager`, payload);
  }

  // -------------------------------------
  // API
  // -------------------------------------

  async getApiKeys() {
    return await (new Request(this.host, this.apikey)).get(`/apikeys`);
  }

  async getApiKey(keyId) {
    return await (new Request(this.host, this.apikey)).get(`/apikeys/${keyId}`);
  }

  async postApiKeys(payload) {
    return await (new Request(this.host, this.apikey)).post(`/apikeys`, payload);
  }

  // -------------------------------------
  // Appliances
  // -------------------------------------

  async getAppliances() {
    return await (new Request(this.host, this.apikey)).get(`/appliances`);
  }

  async getAppliance(applianceId) {
    return await (new Request(this.host, this.apikey)).get(`/appliances/${applianceId}`);
  }

  async postAppliance(payload) {
    return await (new Request(this.host, this.apikey)).post(`/appliances`, payload);
  }

  // -------------------------------------
  // Applications
  // -------------------------------------

  async getApplications(activeFrom, activeUntil, limit, offset, searchType, value) {
    const  awaitqueryString = Utils.buildQuery({ activeFrom, activeUntil, limit, offset, searchType, value });
    console.info(`QS: ${ queryString || '' }`);
    return new Request(this.host, this.apikey).get(`/applications${ queryString || '' }`);
  }

  async getApplication(appId) {
    return await (new Request(this.host, this.apikey)).get(`/applications/${appId}`);
  }

  async postApplication(appId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}`, payload);
  }

  async patchApplication(appId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/applications/${appId}`, payload);
  }

  async getApplicationActivity(appId) {
    return await (new Request(this.host, this.apikey)).get(`/applications/${appId}/activity`);
  }

  async getApplicationAlerts(appId) {
    return await (new Request(this.host, this.apikey)).get(`/applications/${appId}/alerts`);
  }

  async postApplicationAlerts(appId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}/alerts`, payload);
  }

  async deleteApplicationAlert(appId, alertId) {
    return await (new Request(this.host, this.apikey)).delete(`/applications/${appId}/alerts/${alertId}`);
  }

  async postApplicationAlert(appId, alertId) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}/alerts/${alertId}`);
  }

  async getApplicationDashboards(appId) {
    return await (new Request(this.host, this.apikey)).get(`/applications/${appId}/dashboards`);
  }

  async getApplicationFlexGrids(appId) {
    return await (new Request(this.host, this.apikey)).get(`/applications/${appId}/flexgrids`);
  }

  async postApplicationFlexGrids(appId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}/flexgrids`, payload);
  }

  async deleteApplicationFlexGrid(appId, flexGridId) {
    return await (new Request(this.host, this.apikey)).delete(`/applications/${appId}/flexgrids/${flexGridId}`);
  }

  async postApplicationFlexGrid(appId, flexGridId) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}/flexgrids/${flexGridId}`);
  }

  async getApplicationGeomaps(appId) {
    return await (new Request(this.host, this.apikey)).get(`/applications/${appId}/geomaps`);
  }

  async postApplicationGeomaps(appId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}/geomaps`, payload);
  }

  async deleteApplicationGeomap(appId, geomapId) {
    return await (new Request(this.host, this.apikey)).delete(`/applications/${appId}/geomaps/${geomapId}`);
  }

  async postApplicationGeomap(appId, geomapId) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}/geomaps/${geomapId}`);
  }

  async getApplicationPages(appId) {
    return await (new Request(this.host, this.apikey)).get(`/applications/${appId}/pages`);
  }

  async postApplicationPages(appId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}/pages`, payload);
  }

  async deleteApplicationPage(appId, pageId) {
    return await (new Request(this.host, this.apikey)).delete(`/applications/${appId}/pages/${pageId}`);
  }

  async postApplicationPage(appId, pageId) {
    return await (new Request(this.host, this.apikey)).post(`/applications/${appId}/pages/${pageId}`);
  }

  // -------------------------------------
  // Audit Log
  // -------------------------------------

  async getAuditLog(limit, offset) {
    const  awaitqueryString = Utils.buildQuery({ limit, offset });
    return new Request(this.host, this.apikey).get(`/auditlog${ queryString || '' }`);
  }

  // -------------------------------------
  // Bundles
  // -------------------------------------

  async getBundles() {
    return await (new Request(this.host, this.apikey)).get(`/bundles`);
  }

  async postBundle(payload) {
    return await (new Request(this.host, this.apikey)).post(`/bundles`, payload);
  }

  async deleteBundle(bundleId) {
    return await (new Request(this.host, this.apikey)).delete(`/bundles/${bundleId}`);
  }

  async getBundle(bundleId) {
    return await (new Request(this.host, this.apikey)).get(`/bundles/${bundleId}`);
  }

  async postBundleApply(bundleId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/bundles/${bundleId}/apply`, payload);
  }

  // -------------------------------------
  // Custom Devices
  // -------------------------------------

  async getCustomDevices() {
    return await (new Request(this.host, this.apikey)).get(`/customdevices`);
  }

  async postCustomDevice(payload) {
    return await (new Request(this.host, this.apikey)).post(`/customdevices`, payload);
  }

  async deleteCustomDevice(customDeviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/customdevices/${customDeviceId}`);
  }

  async getCustomDevice(customDeviceId, includeCriteria) {
    const  awaitqueryString = Utils.buildQuery({'include_criteria': includeCriteria});
    return new Request(this.host, this.apikey).get(`/customdevices/${customDeviceId}${ queryString || '' }`);
  }

  async patchCustomDevice(customDeviceId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/customdevices/${customDeviceId}`, payload);
  }

  async getCustomDeviceCriteria(customDeviceId) {
    return await (new Request(this.host, this.apikey)).get(`/customdevices/${customDeviceId}/criteria`);
  }

  async postCustomDeviceCriteria(customDeviceId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/customdevices/${customDeviceId}/criteria`, payload);
  }

  async deleteCustomDeviceCriteria(customDeviceId, criteriaId) {
    return await (new Request(this.host, this.apikey)).delete(`/customdevices/${customDeviceId}/criteria/${criteriaId}`);
  }

  async getCustomDeviceCriterion(customDeviceId, criteriaId) {
    return await (new Request(this.host, this.apikey)).get(`/customdevices/${customDeviceId}/criteria/${criteriaId}`);
  }

  // -------------------------------------
  // Customizations
  // -------------------------------------

  async getCustomizations() {
    return await (new Request(this.host, this.apikey)).get(`/customizations`);
  }

  async postCustomization(payload) {
    return await (new Request(this.host, this.apikey)).post(`/customizations`, payload);
  }

  async getCustomizationsStatus() {
    return await (new Request(this.host, this.apikey)).get(`/customizations/status`);
  }

  async deleteCustomization(customizationId) {
    return await (new Request(this.host, this.apikey)).delete(`/customizations/${customizationId}`);
  }

  async getCustomization(customizationId) {
    return await (new Request(this.host, this.apikey)).get(`/customizations/${customizationId}`);
  }

  async postCustomizationApply(customizationId) {
    return await (new Request(this.host, this.apikey)).post(`/customizations/${customizationId}/apply`);
  }

  async postCustomizationDownload(customizationId) {
    return await (new Request(this.host, this.apikey)).post(`/customizations/${customizationId}/download`);
  }

  // -------------------------------------
  // Dashboards
  // -------------------------------------

  async getDashboards() {
    return await (new Request(this.host, this.apikey)).get(`/dashboards`);
  }

  async deleteDashboard(dashboardId) {
    return await (new Request(this.host, this.apikey)).delete(`/dashboards/${dashboardId}`);
  }

  async getDashboard(dashboardId) {
    return await (new Request(this.host, this.apikey)).get(`/dashboards/${dashboardId}`);
  }

  async patchDashboard(dashboardId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/dashboards/${dashboardId}`, payload);
  }

  async getDashboardReports(dashboardId) {
    return await (new Request(this.host, this.apikey)).get(`/dashboards/${dashboardId}/reports`);
  }

  async getDashboardSharing(dashboardId) {
    return await (new Request(this.host, this.apikey)).get(`/dashboards/${dashboardId}/sharing`);
  }

  async patchDashboardSharing(dashboardId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/dashboards/${dashboardId}/sharing`, payload);
  }

  async putDashboardSharing(dashboardId, payload) {
    return await (new Request(this.host, this.apikey)).put(`/dashboards/${dashboardId}/sharing`, payload);
  }

  // -------------------------------------
  // Devices
  // -------------------------------------

  async getDevices(searchType, value, limit, offset, activeFrom, activeUntil) {
    const  awaitqueryString = Utils.buildQuery({ searchType, value, limit, offset, activeFrom, activeUntil });
    return new Request(this.host, this.apikey).get(`/devices${ queryString || '' }`);
  }

  searchDevices(payload) {
    return new Request(this.host, this.apikey).post(`/devices/search`, payload);
  }

  async getDevice(deviceId) {
    return await (new Request(this.host, this.apikey)).get(`/devices/${deviceId}`);
  }

  async patchDevice(deviceId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/devices/${deviceId}`, payload);
  }

  async getDeviceActivity(deviceId) {
    return await (new Request(this.host, this.apikey)).get(`/devices/${deviceId}/activity`);
  }

  async getDeviceAlerts(deviceId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/alerts${ queryString || '' }`);
  }

  async postDeviceAlerts(deviceId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/alerts`, payload);
  }

  async deleteDeviceAlert(deviceId, alertId) {
    return await (new Request(this.host, this.apikey)).delete(`/devices/${deviceId}/alerts/${alertId}`);
  }

  async postDeviceAlert(deviceId, alertId) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/alerts/${alertId}`);
  }

  async getDeviceDashboards(deviceId) {
    return await (new Request(this.host, this.apikey)).get(`/devices/${deviceId}/dashboards`);
  }

  async getDeviceDeviceGroups(deviceId) {
    return await (new Request(this.host, this.apikey)).get(`/devices/${deviceId}/devicegroups`);
  }

  async postDeviceDeviceGroups(deviceId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/devicegroups`, payload);
  }

  async deleteDeviceDeviceGroup(deviceId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/devices/${deviceId}/devicegroups/${deviceGroupId}`);
  }

  async postDeviceDeviceGroup(deviceId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/devicegroups/${deviceGroupId}`);
  }

  async getDeviceFlexGrids(deviceId) {
    return await (new Request(this.host, this.apikey)).get(`/devices/${deviceId}/flexgrids`);
  }

  async postDeviceFlexGrids(deviceId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/flexgrids`, payload);
  }

  async deleteDeviceFlexGrid(deviceId, flexGridId) {
    return await (new Request(this.host, this.apikey)).delete(`/devices/${deviceId}/flexgrids/${flexGridId}`);
  }

  async postDeviceFlexGrid(deviceId, flexGridId) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/flexgrids/${flexGridId}`);
  }

  async getDeviceGeomaps(deviceId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/geomaps${ queryString || '' }`);
  }

  async postDeviceGeomaps(deviceId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/geomaps`, payload);
  }

  async deleteDeviceGeomap(deviceId, geomapId) {
    return await (new Request(this.host, this.apikey)).delete(`/devices/${deviceId}/geomaps/${geomapId}`);
  }

  async postDeviceGeomap(deviceId, geomapId) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/geomaps/${geomapId}`);
  }

  async getDevicePages(deviceId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/pages${ queryString || '' }`);
  }

  async postDevicePages(deviceId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/pages`, payload);
  }

  async deleteDevicePage(deviceId, pageId) {
    return await (new Request(this.host, this.apikey)).delete(`/devices/${deviceId}/pages/${pageId}`);
  }

  async postDevicePage(deviceId, pageId) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/pages/${pageId}`);
  }

  async getDeviceTags(deviceId) {
    return await (new Request(this.host, this.apikey)).get(`/devices/${deviceId}/tags`);
  }

  async postDeviceTags(deviceId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/tags`, payload);
  }

  async deleteDeviceTag(deviceId, tagId) {
    return await (new Request(this.host, this.apikey)).delete(`/devices/${deviceId}/tags/${tagId}`);
  }

  async postDeviceTag(deviceId, tagId) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/tags/${tagId}`);
  }

  async getDeviceTriggers(deviceId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devices/${deviceId}/triggers${ queryString || '' }`);
  }

  async postDeviceTriggers(deviceId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/triggers`, payload);
  }

  async deleteDeviceTrigger(deviceId, triggerId) {
    return await (new Request(this.host, this.apikey)).delete(`/devices/${deviceId}/triggers/${triggerId}`);
  }

  async postDeviceTrigger(deviceId, triggerId) {
    return await (new Request(this.host, this.apikey)).post(`/devices/${deviceId}/triggers/${triggerId}`);
  }

  // -------------------------------------
  // Device Groups
  // -------------------------------------

  async getDeviceGroups(since, all, name) {
    const  awaitqueryString = Utils.buildQuery({ since, all, name });
    return new Request(this.host, this.apikey).get(`/devicegroups${ queryString || '' }`);
  }

  async postDeviceGroup(payload) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups`, payload);
  }

  async deleteDeviceGroup(deviceGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/devicegroups/${deviceGroupId}`);
  }

  async getDeviceGroup(deviceGroupId) {
    return await (new Request(this.host, this.apikey)).get(`/devicegroups/${deviceGroupId}`);
  }

  async patchDeviceGroup(deviceGroupId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/devicegroups/${deviceGroupId}`, payload);
  }

  async getDeviceGroupAlerts(deviceGroupId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/alerts${ queryString || '' }`);
  }

  async postDeviceGroupAlerts(deviceGroupId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/alerts`, payload);
  }

  async deleteDeviceGroupAlert(deviceGroupId, alertId) {
    return await (new Request(this.host, this.apikey)).delete(`/devicegroups/${deviceGroupId}/alerts/${alertId}`);
  }

  async postDeviceGroupAlert(deviceGroupId, alertId) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/alerts/${alertId}`);
  }

  async getDeviceGroupDashboards(deviceGroupId) {
    return await (new Request(this.host, this.apikey)).get(`/devicegroups/${deviceGroupId}/dashboards`);
  }

  async getDeviceGroupDevices(deviceGroupId, activeFrom, activeUntil, limit, offset) {
    const  awaitqueryString = Utils.buildQuery({ activeFrom, activeUntil, limit, offset });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/devices${ queryString || '' }`);
  }

  async postDeviceGroupDevices(deviceGroupId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/devices`, payload);
  }

  async deleteDeviceGroupDevice(deviceGroupId, deviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/devicegroups/${deviceGroupId}/devices/${deviceId}`);
  }

  async postDeviceGroupDevice(deviceGroupId, deviceId) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/devices/${deviceId}`);
  }

  async getDeviceGroupFlexGrids(deviceGroupId) {
    return await (new Request(this.host, this.apikey)).get(`/devicegroups/${deviceGroupId}/flexgrids`);
  }

  async postDeviceGroupFlexGrids(deviceGroupId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/flexgrids`, payload);
  }

  async deleteDeviceGroupFlexGrid(deviceGroupId, flexGridId) {
    return await (new Request(this.host, this.apikey)).delete(`/devicegroups/${deviceGroupId}/flexgrids/${flexGridId}`);
  }

  async postDeviceGroupFlexGrid(deviceGroupId, flexGridId) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/flexgrids/${flexGridId}`);
  }

  async getDeviceGroupGeomaps(deviceGroupId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/geomaps${ queryString || '' }`);
  }

  async postDeviceGroupGeomaps(deviceGroupId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/geomaps`, payload);
  }

  async deleteDeviceGroupGeomap(deviceGroupId, geomapId) {
    return await (new Request(this.host, this.apikey)).delete(`/devicegroups/${deviceGroupId}/geomaps/${geomapId}`);
  }

  async postDeviceGroupGeomap(deviceGroupId, geomapId) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/geomaps/${geomapId}`);
  }

  async getDeviceGroupPages(deviceGroupId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/pages${ queryString || '' }`);
  }

  async postDeviceGroupPages(deviceGroupId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/pages`, payload);
  }

  async deleteDeviceGroupPage(deviceGroupId, pageId) {
    return await (new Request(this.host, this.apikey)).delete(`/devicegroups/${deviceGroupId}/pages/${pageId}`);
  }

  async postDeviceGroupPage(deviceGroupId, pageId) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/pages/${pageId}`);
  }

  async getDeviceGroupTags(deviceGroupId) {
    return await (new Request(this.host, this.apikey)).get(`/devicegroups/${deviceGroupId}/tags`);
  }

  async postDeviceGroupTags(deviceGroupId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/tags`, payload);
  }

  async deleteDeviceGroupTag(deviceGroupId, tagId) {
    return await (new Request(this.host, this.apikey)).delete(`/devicegroups/${deviceGroupId}/tags/${tagId}`);
  }

  async postDeviceGroupTag(deviceGroupId, tagId) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/tags/${tagId}`);
  }

  async getDeviceGroupTriggers(deviceGroupId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/devicegroups/${deviceGroupId}/triggers${ queryString || '' }`);
  }

  async postDeviceGroupTriggers(deviceGroupId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/triggers`, payload);
  }

  async deleteDeviceGroupTrigger(deviceGroupId, triggerId) {
    return await (new Request(this.host, this.apikey)).delete(`/devicegroups/${deviceGroupId}/triggers/${triggerId}`);
  }

  async postDeviceGroupTrigger(deviceGroupId, triggerId) {
    return await (new Request(this.host, this.apikey)).post(`/devicegroups/${deviceGroupId}/triggers/${triggerId}`);
  }

  // -------------------------------------
  // Email Groups
  // -------------------------------------

  async getEmailGroups() {
    return await (new Request(this.host, this.apikey)).get(`/emailgroups`);
  }

  async postEmailGroup(payload) {
    return await (new Request(this.host, this.apikey)).post(`/emailgroups`, payload);
  }

  async deleteEmailGroup(emailGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/emailgroups/${emailGroupId}`);
  }

  async getEmailGroup(emailGroupId) {
    return await (new Request(this.host, this.apikey)).get(`/emailgroups/${emailGroupId}`);
  }

  async patchEmailGroup(emailGroupId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/emailgroups/${emailGroupId}`, payload);
  }

  // -------------------------------------
  // Exclusion Intervals
  // -------------------------------------

  async getExclusionIntervals() {
    return await (new Request(this.host, this.apikey)).get(`/exclusionintervals`);
  }

  async postExclusionInterval(payload) {
    return await (new Request(this.host, this.apikey)).post(`/exclusionintervals`, payload);
  }

  async deleteExclusionInterval(exclusionIntervalId) {
    return await (new Request(this.host, this.apikey)).delete(`/exclusionintervals/${exclusionIntervalId}`);
  }

  async getExclusionInterval(exclusionIntervalId) {
    return await (new Request(this.host, this.apikey)).get(`/exclusionintervals/${exclusionIntervalId}`);
  }

  async patchExclusionInterval(exclusionIntervalId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/exclusionintervals/${exclusionIntervalId}`, payload);
  }

  // -------------------------------------
  // Extrahop
  // -------------------------------------

  async getExtrahop() {
    return await (new Request(this.host, this.apikey)).get(`/extrahop`);
  }

  async getExtrahopIdrac() {
    return await (new Request(this.host, this.apikey)).get(`/extrahop/idrac`);
  }

  async getExtrahopPlatform() {
    return await (new Request(this.host, this.apikey)).get(`/extrahop/platform`);
  }

  async getExtrahopProcesses() {
    return await (new Request(this.host, this.apikey)).get(`/extrahop/processes`);
  }

  async postExtrahopProcessRestart(processId) {
    return await (new Request(this.host, this.apikey)).post(`/extrahop/processes/${processId}/restart`);
  }

  async postExtrahopSSLCert() {
    return await (new Request(this.host, this.apikey)).post(`/extrahop/sslcert`);
  }

  async putExtrahopSSLCert(payload) {
    return await (new Request(this.host, this.apikey)).put(`/extrahop/sslcert`, payload);
  }

  async getExtrahopVersion() {
    return await (new Request(this.host, this.apikey)).get(`/extrahop/version`);
  }

  // -------------------------------------
  // Flex Grids
  // -------------------------------------

  async getFlexGrids() {
    return await (new Request(this.host, this.apikey)).get(`/flexgrids`);
  }

  async getFlexGridApplications(flexGridId) {
    return await (new Request(this.host, this.apikey)).get(`/flexgrids/${flexGridId}/applications`);
  }

  async postFlexGridApplications(flexGridId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/flexgrids/${flexGridId}/applications`, payload);
  }

  async deleteFlexGridApplication(flexGridId, appId) {
    return await (new Request(this.host, this.apikey)).delete(`/flexgrids/${flexGridId}/applications/${appId}`);
  }

  async postFlexGridApplication(flexGridId, appId) {
    return await (new Request(this.host, this.apikey)).post(`/flexgrids/${flexGridId}/applications/${appId}`);
  }

  async getFlexGridDeviceGroups(flexGridId) {
    return await (new Request(this.host, this.apikey)).get(`/flexgrids/${flexGridId}/devicegroups`);
  }

  async postFlexGridDeviceGroups(flexGridId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/flexgrids/${flexGridId}/devicegroups`, payload);
  }

  async deleteFlexGridDeviceGroup(flexGridId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/flexgrids/${flexGridId}/devicegroups/${deviceGroupId}`);
  }

  async postFlexGridDeviceGroup(flexGridId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/flexgrids/${flexGridId}/devicegroups/${deviceGroupId}`);
  }

  async getFlexGridDevices(flexGridId) {
    return await (new Request(this.host, this.apikey)).get(`/flexgrids/${flexGridId}/devices`);
  }

  async postFlexGridDevices(flexGridId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/flexgrids/${flexGridId}/devices`, payload);
  }

  async deleteFlexGridDevice(flexGridId, deviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/flexgrids/${flexGridId}/devices/${deviceId}`);
  }

  async postFlexGridDevice(flexGridId, deviceId) {
    return await (new Request(this.host, this.apikey)).post(`/flexgrids/${flexGridId}/devices/${deviceId}`);
  }

  // -------------------------------------
  // Geomaps
  // -------------------------------------

  async getGeomaps() {
    return await (new Request(this.host, this.apikey)).get(`/geomaps`);
  }

  async postGeomaps(payload) {
    return await (new Request(this.host, this.apikey)).post(`/geomaps`, payload);
  }

  async deleteGeomap(geomapId) {
    return await (new Request(this.host, this.apikey)).delete(`/geomaps/${geomapId}`);
  }

  async getGeomap(geomapId) {
    return await (new Request(this.host, this.apikey)).get(`/geomaps/${geomapId}`);
  }

  async patchGeomap(geomapId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/geomaps/${geomapId}`, payload);
  }

  async getGeomapApplications(geomapId) {
    return await (new Request(this.host, this.apikey)).get(`/geomaps/${geomapId}/applications`);
  }

  async postGeomapApplications(geomapId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/geomaps/${geomapId}/applications`, payload);
  }

  async deleteGeomapApplication(geomapId, appId) {
    return await (new Request(this.host, this.apikey)).delete(`/geomaps/${geomapId}/applications/${appId}`);
  }

  async postGeomapApplication(geomapId, appId) {
    return await (new Request(this.host, this.apikey)).post(`/geomaps/${geomapId}/applications/${appId}`);
  }

  async getGeomapDeviceGroups(geomapId) {
    return await (new Request(this.host, this.apikey)).get(`/geomaps/${geomapId}/devicegroups`);
  }

  async postGeomapDeviceGroups(geomapId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/geomaps/${geomapId}/devicegroups`, payload);
  }

  async deleteGeomapDeviceGroup(geomapId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/geomaps/${geomapId}/devicegroups/${deviceGroupId}`);
  }

  async postGeomapDeviceGroup(geomapId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/geomaps/${geomapId}/devicegroups/${deviceGroupId}`);
  }

  async getGeomapDevices(geomapId) {
    return await (new Request(this.host, this.apikey)).get(`/geomaps/${geomapId}/devices`);
  }

  async postGeomapDevices(geomapId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/geomaps/${geomapId}/devices`, payload);
  }

  async deleteGeomapDevice(geomapId, deviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/geomaps/${geomapId}/devices/${deviceId}`);
  }

  async postGeomapDevice(geomapId, deviceId) {
    return await (new Request(this.host, this.apikey)).post(`/geomaps/${geomapId}/devices/${deviceId}`);
  }

  // -------------------------------------
  // License
  // -------------------------------------

  async getLicense() {
    return await (new Request(this.host, this.apikey)).get(`/license`);
  }

  async putLicense(payload) {
    return await (new Request(this.host, this.apikey)).put(`/license`, payload);
  }

  async getLicenseProductKey() {
    return await (new Request(this.host, this.apikey)).get(`/license/productkey`);
  }

  async putLicenseProductKey(payload) {
    return await (new Request(this.host, this.apikey)).put(`/license/productkey`, payload);
  }

  // -------------------------------------
  // Metrics
  // -------------------------------------

  async postMetrics(payload) {
    return await (new Request(this.host, this.apikey)).post(`/metrics`, payload);
  }

  async getMetricsNextXId(xId) {
    return await (new Request(this.host, this.apikey)).get(`/metrics/next/${xId}`);
  }

  async postMetricsTotal(payload) {
    return await (new Request(this.host, this.apikey)).post(`/metrics/total`, payload);
  }

  async postMetricsTotalByObject(payload) {
    return await (new Request(this.host, this.apikey)).post(`/metrics/totalbyobject`, payload);
  }

  // -------------------------------------
  // Networks
  // -------------------------------------

  async getNetworks() {
    return await (new Request(this.host, this.apikey)).get(`/networks`);
  }

  async getNetwork(networkId) {
    return await (new Request(this.host, this.apikey)).get(`/networks/${networkId}`);
  }

  async patchNetwork(networkId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/networks/${networkId}`, payload);
  }

  async getNetworkAlerts(networkId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/networks/${networkId}/alerts${ queryString || '' }`);
  }

  async postNetworkAlerts(networkId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/networks/${networkId}/alerts`, payload);
  }

  async deleteNetworkAlert(networkId, alertId) {
    return await (new Request(this.host, this.apikey)).delete(`/networks/${networkId}/alerts/${alertId}`);
  }

  async postNetworkAlert(networkId, alertId) {
    return await (new Request(this.host, this.apikey)).post(`/networks/${networkId}/alerts/${alertId}`);
  }

  async getNetworkPages(networkId, direct_assignments_only) {
    const  awaitqueryString = Utils.buildQuery({ direct_assignments_only });
    return new Request(this.host, this.apikey).get(`/networks/${networkId}/pages${ queryString || '' }`);
  }

  async postNetworkPages(networkId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/networks/${networkId}/pages`, payload);
  }

  async deleteNetworkPage(networkId, pageId) {
    return await (new Request(this.host, this.apikey)).delete(`/networks/${networkId}/pages/${pageId}`);
  }

  async postNetworkPage(networkId, pageId) {
    return await (new Request(this.host, this.apikey)).post(`/networks/${networkId}/pages/${pageId}`);
  }

  async getNetworkVlans(networkId) {
    return await (new Request(this.host, this.apikey)).get(`/networks/${networkId}/vlans`);
  }

  // -------------------------------------
  // Network Locality Entry
  // -------------------------------------

  async getNetworkLocalities() {
    return await (new Request(this.host, this.apikey)).get(`/networklocality`);
  }

  async postNetworkLocality(payload) {
    return await (new Request(this.host, this.apikey)).post(`/networklocality`, payload);
  }

  async deleteNetworkLocality(networkLocalityId) {
    return await (new Request(this.host, this.apikey)).delete(`/networklocality/${networkLocalityId}`);
  }

  async getNetworkLocality(networkLocalityId) {
    return await (new Request(this.host, this.apikey)).get(`/networklocality/${networkLocalityId}`);
  }

  async patchNetworkLocality(networkLocalityId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/networklocality/${networkLocalityId}`, payload);
  }

  // -------------------------------------
  // Nodes
  // -------------------------------------

  async getNodes() {
    return await (new Request(this.host, this.apikey)).get(`/nodes`);
  }

  async getNode(nodeId) {
    return await (new Request(this.host, this.apikey)).get(`/nodes/${nodeId}`);
  }

  async patchNode(nodeId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/nodes/${nodeId}`, payload);
  }

  // -------------------------------------
  // Packet Captures
  // -------------------------------------

  async getPacketCaptures() {
    return await (new Request(this.host, this.apikey)).get(`/packetcaptures`);
  }

  async deletePacketCapture(packetCaptureId) {
    return await (new Request(this.host, this.apikey)).delete(`/packetcaptures/${packetCaptureId}`);
  }

  async getPacketCapture(packetCaptureId) {
    return await (new Request(this.host, this.apikey)).get(`/packetcaptures/${packetCaptureId}`);
  }

  // -------------------------------------
  // Pages
  // -------------------------------------

  async getPages() {
    return await (new Request(this.host, this.apikey)).get(`/pages`);
  }

  async postPages(payload) {
    return await (new Request(this.host, this.apikey)).post(`/pages`, payload);
  }

  async deletePage(pageId) {
    return await (new Request(this.host, this.apikey)).delete(`/pages/${pageId}`);
  }

  async getPage(pageId) {
    return await (new Request(this.host, this.apikey)).get(`/pages/${pageId}`);
  }

  async patchPage(pageId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/pages/${pageId}`, payload);
  }

  async getPageApplications(pageId) {
    return await (new Request(this.host, this.apikey)).get(`/pages/${pageId}/applications`);
  }

  async postPageApplications(pageId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/pages/${pageId}/applications`, payload);
  }

  async deletePageApplication(pageId, appId) {
    return await (new Request(this.host, this.apikey)).delete(`/pages/${pageId}/applications/${appId}`);
  }

  async postPageApplication(pageId, appId) {
    return await (new Request(this.host, this.apikey)).post(`/pages/${pageId}/applications/${appId}`);
  }

  async getPageDeviceGroups(pageId) {
    return await (new Request(this.host, this.apikey)).get(`/pages/${pageId}/devicegroups`);
  }

  async postPageDeviceGroups(pageId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/pages/${pageId}/devicegroups`, payload);
  }

  async deletePageDeviceGroup(pageId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/pages/${pageId}/devicegroups/${deviceGroupId}`);
  }

  async postPageDeviceGroup(pageId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/pages/${pageId}/devicegroups/${deviceGroupId}`);
  }

  async getPageDevices(pageId) {
    return await (new Request(this.host, this.apikey)).get(`/pages/${pageId}/devices`);
  }

  async postPageDevices(pageId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/pages/${pageId}/devices`, payload);
  }

  async deletePageDevice(pageId, deviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/pages/${pageId}/devices/${deviceId}`);
  }

  async postPageDevice(pageId, deviceId) {
    return await (new Request(this.host, this.apikey)).post(`/pages/${pageId}/devices/${deviceId}`);
  }

  async getPageNetworks(pageId) {
    return await (new Request(this.host, this.apikey)).get(`/pages/${pageId}/networks`);
  }

  async postPageNetworks(pageId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/pages/${pageId}/networks`, payload);
  }

  async deletePageNetwork(pageId, networkId) {
    return await (new Request(this.host, this.apikey)).delete(`/pages/${pageId}/networks/${networkId}`);
  }

  async postPageNetwork(pageId, networkId) {
    return await (new Request(this.host, this.apikey)).post(`/pages/${pageId}/networks/${networkId}`);
  }

  // -------------------------------------
  // Record Logs
  // -------------------------------------

  async postRecordsCursor(payload, contextTtl) {
    return await (new Request(this.host, this.apikey)).post(`/records/cursor?context_ttl=${contextTtl}`, payload);
  }

  async getRecordsCursor(cursor, contextTtl) {
    return await (new Request(this.host, this.apikey)).get(`/records/cursor/${cursor}?context_ttl=${contextTtl}`);
  }

  async postRecordsSearch(payload) {
    return await (new Request(this.host, this.apikey)).post(`/records/search`, payload);
  }

  //  -------------------------------------
  //  Reports
  //  -------------------------------------

  async getReports() {
    return await (new Request(this.host, this.apikey)).get(`/reports`);
  }

  async postReport(payload) {
    return await (new Request(this.host, this.apikey)).post(`/reports`, payload);
  }

  async deleteReport(reportId) {
    return await (new Request(this.host, this.apikey)).delete(`/reports/${reportId}`);
  }

  async getReport(reportId) {
    return await (new Request(this.host, this.apikey)).get(`/reports/${reportId}`);
  }

  async patchReport(reportId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/reports/${reportId}`, payload);
  }

  async getReportContents(reportId) {
    return await (new Request(this.host, this.apikey)).get(`/reports/${reportId}/contents`);
  }

  async putReportContents(reportId, payload) {
    return await (new Request(this.host, this.apikey)).put(`/reports/${reportId}/contents`, payload);
  }

  async getReportEmailGroups(reportId) {
    return await (new Request(this.host, this.apikey)).get(`/reports/${reportId}/emailgroups`);
  }

  async postReportEmailGroups(reportId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/reports/${reportId}/emailgroups`, payload);
  }

  async deleteReportEmailGroup(reportId, emailGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/reports/${reportId}/emailgroups/${emailGroupId}`);
  }

  async postReportEmailGroup(reportId, emailGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/reports/${reportId}/emailgroups/${emailGroupId}`);
  }

  async postReportQueue(reportId) {
    return await (new Request(this.host, this.apikey)).post(`/reports/${reportId}/queue`);
  }

  // -------------------------------------
  //  Running Config
  //  -------------------------------------

  async getRunningConfig(section) {
    const  awaitqueryString = Utils.buildQuery({ section });
    return new Request(this.host, this.apikey).get(`/runningconfig${ queryString || '' }`);
  }

  async putRunningConfig(payload) {
    return await (new Request(this.host, this.apikey)).put(`/runningconfig`, payload);
  }

  async postRunningConfigSave() {
    return await (new Request(this.host, this.apikey)).post(`/runningconfig/save`);
  }

  async getRunningConfigSaved() {
    return await (new Request(this.host, this.apikey)).get(`/runningconfig/saved`);
  }

  // -------------------------------------
  // SSL Decrypt Keys
  // -------------------------------------

  async getSslDecryptKeys() {
    return await (new Request(this.host, this.apikey)).get(`/ssldecryptkeys`);
  }

  async postSslDecryptKey(payload) {
    return await (new Request(this.host, this.apikey)).post(`/ssldecryptkeys`, payload);
  }

  async deleteSslDecryptKey(sslDecryptKeyId) {
    return await (new Request(this.host, this.apikey)).delete(`/ssldecryptkeys/${sslDecryptKeyId}`);
  }

  async getSslDecryptKey(sslDecryptKeyId) {
    return await (new Request(this.host, this.apikey)).get(`/ssldecryptkeys/${sslDecryptKeyId}`);
  }

  async patchSslDecryptKey(sslDecryptKeyId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/ssldecryptkeys/${sslDecryptKeyId}`, payload);
  }

  async getSslDecryptKeyProtocols(sslDecryptKeyId) {
    return await (new Request(this.host, this.apikey)).get(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols`);
  }

  async postSslDecryptKeyProtocols(sslDecryptKeyId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols`, payload);
  }

  async deleteSslDecryptKeyProtocol(sslDecryptKeyId, protocolId) {
    return await (new Request(this.host, this.apikey)).delete(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols/${protocolId}`);
  }

  // -------------------------------------
  // Support Packs
  // -------------------------------------

  async getSupportPacks() {
    return await (new Request(this.host, this.apikey)).get(`/supportpacks`);
  }

  async postSupportPackExecute() {
    return await (new Request(this.host, this.apikey)).post(`/supportpacks/execute`);
  }

  async getSupportPackQueue(queueId) {
    return await (new Request(this.host, this.apikey)).get(`/supportpacks/queue/${encodeURIComponent}`(queueId));
  }

  async getSupportPack(filename) {
    return await (new Request(this.host, this.apikey)).get(`/supportpacks/${encodeURIComponent}`(filename));
  }

  // -------------------------------------
  // Tags
  // -------------------------------------

  async getTags() {
    return await (new Request(this.host, this.apikey)).get(`/tags`);
  }

  async postTag(payload) {
    return await (new Request(this.host, this.apikey)).post(`/tags`, payload);
  }

  async deleteTag(tagId) {
    return await (new Request(this.host, this.apikey)).delete(`/tags/${tagId}`);
  }

  async getTag(tagId) {
    return await (new Request(this.host, this.apikey)).get(`/tags/${tagId}`);
  }

  async patchTag(tagId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/tags/${tagId}`, payload);
  }

  async getTagDevices(tagId) {
    return await (new Request(this.host, this.apikey)).get(`/tags/${tagId}/devices`);
  }

  async postTagDevices(tagId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/tags/${tagId}/devices`, payload);
  }

  async deleteTagDevice(tagId, deviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/tags/${tagId}/devices/${deviceId}`);
  }

  async postTagDevice(tagId, deviceId) {
    return await (new Request(this.host, this.apikey)).post(`/tags/${tagId}/devices/${deviceId}`);
  }

  // -------------------------------------
  // Triggers
  // -------------------------------------

  async getTriggers() {
    return await (new Request(this.host, this.apikey)).get(`/triggers`);
  }

  async postTrigger(payload) {
    return await (new Request(this.host, this.apikey)).post(`/triggers`, payload);
  }

  async deleteTrigger(triggerId) {
    return await (new Request(this.host, this.apikey)).delete(`/triggers/${triggerId}`);
  }

  async getTrigger(triggerId) {
    return await (new Request(this.host, this.apikey)).get(`/triggers/${triggerId}`);
  }

  async patchTrigger(triggerId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/triggers/${triggerId}`, payload);
  }

  async getTriggerDeviceGroups(triggerId) {
    return await (new Request(this.host, this.apikey)).get(`/triggers/${triggerId}/devicegroups`);
  }

  async postTriggerDeviceGroups(triggerId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/triggers/${triggerId}/devicegroups`, payload);
  }

  async deleteTriggerDeviceGroup(triggerId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/triggers/${triggerId}/devicegroups/${deviceGroupId}`);
  }

  async postTriggerDeviceGroup(triggerId, deviceGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/triggers/${triggerId}/devicegroups/${deviceGroupId}`);
  }

  async getTriggerDevices(triggerId) {
    return await (new Request(this.host, this.apikey)).get(`/triggers/${triggerId}/devices`);
  }

  async postTriggerDevices(triggerId, payload) {
    return await (new Request(this.host, this.apikey)).post(`/triggers/${triggerId}/devices`, payload);
  }

  async deleteTriggerDevice(triggerId, deviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/triggers/${triggerId}/devices/${deviceId}`);
  }

  async postTriggerDevice(triggerId, deviceId) {
    return await (new Request(this.host, this.apikey)).post(`/triggers/${triggerId}/devices/${deviceId}`);
  }

  // -------------------------------------
  // Users
  // -------------------------------------

  async getUsers() {
    return await (new Request(this.host, this.apikey)).get(`/users`);
  }

  async postUser(payload) {
    return await (new Request(this.host, this.apikey)).post(`/users`, payload);
  }

  async deleteUser(user) {
    return await (new Request(this.host, this.apikey)).delete(`/users/${user}`);
  }

  async getUser(user) {
    return await (new Request(this.host, this.apikey)).get(`/users/${user}`);
  }

  async patchUser(user, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/users/${user}`, payload);
  }

  async getUserApiKeys(user) {
    return await (new Request(this.host, this.apikey)).get(`/users/${user}/apikeys`);
  }

  async getUserApiKey(user, keyId) {
    return await (new Request(this.host, this.apikey)).get(`/users/${user}/apikeys/${keyId}`);
  }

  // -------------------------------------
  // User Groups
  // -------------------------------------

  async getUserGroups() {
    return await (new Request(this.host, this.apikey)).get(`/usergroups`);
  }

  async postUserGroupsRefresh() {
    return await (new Request(this.host, this.apikey)).post(`/usergroups/refresh`);
  }

  async getUserGroup(userGroupId) {
    return await (new Request(this.host, this.apikey)).get(`/usergroups/${userGroupId}`);
  }

  async patchUserGroup(userGroupId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/usergroups/${userGroupId}`, payload);
  }

  async deleteUserGroupAssociations(userGroupId) {
    return await (new Request(this.host, this.apikey)).delete(`/usergroups/${userGroupId}`);
  }

  async getUserGroupMembers(userGroupId) {
    return await (new Request(this.host, this.apikey)).get(`/usergroups/${userGroupId}/members`);
  }

  async postUserGroupRefresh(userGroupId) {
    return await (new Request(this.host, this.apikey)).post(`/usergroups/${userGroupId}/refresh`);
  }

  // -------------------------------------
  // VLANs
  // -------------------------------------

  async getVlans() {
    return await (new Request(this.host, this.apikey)).get(`/vlans`);
  }

  async getVlan(vlanId) {
    return await (new Request(this.host, this.apikey)).get(`/vlans/${vlanId}`);
  }

  async patchVlan(vlanId, payload) {
    return await (new Request(this.host, this.apikey)).patch(`/vlans/${vlanId}`, payload);
  }

  // -------------------------------------
  // Whitelist
  // -------------------------------------

  async deleteWhitelistDevice(deviceId) {
    return await (new Request(this.host, this.apikey)).delete(`/whitelist/device/${deviceId}`);
  }

  async postWhitelistDevice(deviceId) {
    return await (new Request(this.host, this.apikey)).post(`/whitelist/device/${deviceId}`);
  }

  async getWhitelistsDevices() {
    return await (new Request(this.host, this.apikey)).get(`/whitelist/devices`);
  }

  async postWhitelistDevices(payload) {
    return await (new Request(this.host, this.apikey)).post(`/whitelist/devices`, payload);
  }
}
