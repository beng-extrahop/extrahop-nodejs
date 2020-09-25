// Appliance.model.js

const BaseObject = require('../_base/BaseObject.model');
const Request = require('../_http/Request.model');
const { Icons } = require('../../constants/Global.constants');

module.exports = class Appliance extends BaseObject {
  constructor(appliance = {}) {
    super();

    this.hostname = appliance.hostname;
    this.host = appliance.hostname;
    this.apikey = appliance.apikey;
    this.type = appliance.type;
    this.request = new Request(this.hostname, this.apikey);

    const getExtrahop = this.getExtrahop();

    if (getExtrahop.success) {
      //* console.info(`${Icons.Info} Connected to ${this.hostname}`);
    } else {
      this.active = false;
      //* console.warn(`${Icons.Warn} Connection to ${this.hostname} failed`);
      return;
    }

    Object.keys(getExtrahop.data).forEach((key) => { this[key] = getExtrahop.data[key]; });

    this.name = this.display_host;

    const getAppliance = (this.getAppliances().data || []).find((x) => x.hostname === this.hostname);

    if (getAppliance == null) {
      //* console.warn(`${Icons.Warn} Error populating appliance data from ${this.hostname}`);
    }

    Object.keys(getAppliance).forEach((key) => { this[key] = getAppliance[key]; });

    if (this.host !== this.hostname) {
      //* console.warn(`${Icons.Warn} Hostname mismatch. Configured: ${this.host}, Retrieved: ${this.hostname}`);
    }

    // -------------------------------------
    // Controllers
    // -------------------------------------

    this.activityGroups = new (require('../../controllers/ActivityGroup.controller'))(this);
    this.activityMaps = new (require('../../controllers/ActivityMap.controller'))(this);
    this.alerts = new (require('../../controllers/Alert.controller'))(this);
    this.analysisPriorities = new (require('../../controllers/AnalysisPriority.controller'))(this);
    this.apikeys = new (require('../../controllers/Apikey.controller'))(this);
    this.appliances = new (require('../../controllers/Appliance.controller'))(this);
    this.applications = new (require('../../controllers/Application.controller'))(this);
    this.auditLogs = new (require('../../controllers/AuditLog.controller'))(this);
    this.auth = new (require('../../controllers/Auth.controller'))(this);
    this.bundles = new (require('../../controllers/Bundle.controller'))(this);
    this.customizations = new (require('../../controllers/Customization.controller'))(this);
    this.customDevices = new (require('../../controllers/CustomDevice.controller'))(this);
    this.dashboards = new (require('../../controllers/Dashboard.controller'))(this);
    this.devices = new (require('../../controllers/Device.controller'))(this);
    this.deviceGroups = new (require('../../controllers/DeviceGroup.controller'))(this);
    this.emailGroups = new (require('../../controllers/EmailGroup.controller'))(this);
    this.exclusionIntervals = new (require('../../controllers/ExclusionInterval.controller'))(this);
    this.license = new (require('../../controllers/License.controller'))(this);
    this.metrics = new (require('../../controllers/Metric.controller'))(this);
    this.networks = new (require('../../controllers/Network.controller'))(this);
    this.networkLocalities = new (require('../../controllers/NetworkLocality.controller'))(this);
    this.nodes = new (require('../../controllers/Node.controller'))(this);
    this.records = new (require('../../controllers/Record.controller'))(this);
    this.reports = new (require('../../controllers/Report.controller'))(this);
    this.software = new (require('../../controllers/Software.controller'))(this);
    this.tags = new (require('../../controllers/Tag.controller'))(this);
    this.triggers = new (require('../../controllers/Trigger.controller'))(this);
  }

  // -------------------------------------
  // Activity Groups
  // -------------------------------------

  getActivityGroups() {
    return this.request.get('/activitygroups');
  }

  getActivityGroupDashboards(activityGroupId) {
    return this.request.get(`/activitygroups/${activityGroupId}/dashboards`);
  }

  // -------------------------------------
  // Activity Maps
  // -------------------------------------

  getActivityMaps() {
    return this.request.get('/activitymaps');
  }

  postActivityMaps(payload) {
    return this.request.post('/activitymaps', payload);
  }

  postActivityMapsQuery(payload) {
    return this.request.post('/activitymaps/query', payload);
  }

  deleteActivityMap(activityMapId) {
    return this.request.delete(`/activitymaps/${activityMapId}`);
  }

  getActivityMap(activityMapId) {
    return this.request.get(`/activitymaps/${activityMapId}`);
  }

  patchActivityMap(activityMapId, payload) {
    return this.request.patch(`/activitymaps/${activityMapId}`, payload);
  }

  postActivityMapQuery(activityMapId, payload) {
    return this.request.post(`/activitymaps/${activityMapId}/query`, payload);
  }

  getActivityMapSharing(activityMapId) {
    return this.request.get(`/activitymaps/${activityMapId}/sharing`);
  }

  patchActivityMapSharing(activityMapId, payload) {
    return this.request.patch(`/activitymaps/${activityMapId}/sharing`, payload);
  }

  putActivityMapSharing(activityMapId, payload) {
    return this.request.put(`/activitymaps/${activityMapId}/sharing`, payload);
  }

  // -------------------------------------
  // Alerts
  // -------------------------------------

  getAlerts() {
    return this.request.get('/alerts');
  }

  postAlert(payload) {
    return this.request.post('/alerts', payload);
  }

  deleteAlert(alertId) {
    return this.request.delete(`/alerts/${alertId}`);
  }

  getAlert(alertId) {
    return this.request.get(`/alerts/${alertId}`);
  }

  patchAlert(alertId, payload) {
    return this.request.patch(`/alerts/${alertId}`, payload);
  }

  getAlertApplications(alertId) {
    return this.request.get(`/alerts/${alertId}/applications`);
  }

  postAlertApplications(alertId, payload) {
    return this.request.post(`/alerts/${alertId}/applications`, payload);
  }

  deleteAlertApplication(alertId, applicationId) {
    return this.request.delete(`/alerts/${alertId}/applications/${applicationId}`);
  }

  postAlertApplication(alertId, applicationId) {
    return this.request.post(`/alerts/${alertId}/applications/${applicationId}`);
  }

  getAlertDeviceGroups(alertId) {
    return this.request.get(`/alerts/${alertId}/devicegroups`);
  }

  postAlertDeviceGroups(alertId, payload) {
    return this.request.post(`/alerts/${alertId}/devicegroups`, payload);
  }

  deleteAlertDeviceGroup(alertId, deviceGroupId) {
    return this.request.delete(`/alerts/${alertId}/devicegroups/${deviceGroupId}`);
  }

  postAlertDeviceGroup(alertId, deviceGroupId) {
    return this.request.post(`/alerts/${alertId}/devicegroups/${deviceGroupId}`);
  }

  getAlertDevices(alertId) {
    return this.request.get(`/alerts/${alertId}/devices`);
  }

  postAlertDevices(alertId, payload) {
    return this.request.post(`/alerts/${alertId}/devices`, payload);
  }

  deleteAlertDevice(alertId, deviceId) {
    return this.request.delete(`/alerts/${alertId}/devices/${deviceId}`);
  }

  postAlertDevice(alertId, deviceId) {
    return this.request.post(`/alerts/${alertId}/devices/${deviceId}`);
  }

  getAlertEmailGroups(alertId) {
    return this.request.get(`/alerts/${alertId}/emailgroups`);
  }

  postAlertEmailGroups(alertId, payload) {
    return this.request.post(`/alerts/${alertId}/emailgroups`, payload);
  }

  deleteAlertEmailGroup(alertId, emailGroupId) {
    return this.request.delete(`/alerts/${alertId}/emailgroups/${emailGroupId}`);
  }

  postAlertEmailGroup(alertId, emailGroupId) {
    return this.request.post(`/alerts/${alertId}/emailgroups/${emailGroupId}`);
  }

  getAlertExclusionIntervals(alertId) {
    return this.request.get(`/alerts/${alertId}/exclusionintervals`);
  }

  postAlertExclusionIntervals(alertId, payload) {
    return this.request.post(`/alerts/${alertId}/exclusionintervals`, payload);
  }

  deleteAlertExclusionInterval(alertId, exclusionIntervalId) {
    return this.request.delete(`/alerts/${alertId}/exclusionintervals/${exclusionIntervalId}`);
  }

  postAlertExclusionInterval(alertId, exclusionIntervalId) {
    return this.request.post(`/alerts/${alertId}/exclusionintervals/${exclusionIntervalId}`);
  }

  getAlertNetworks(alertId) {
    return this.request.get(`/alerts/${alertId}/networks`);
  }

  postAlertNetworks(alertId, payload) {
    return this.request.post(`/alerts/${alertId}/networks`, payload);
  }

  deleteAlertNetwork(alertId, networkId) {
    return this.request.delete(`/alerts/${alertId}/networks/${networkId}`);
  }

  postAlertNetwork(alertId, networkId) {
    return this.request.post(`/alerts/${alertId}/networks/${networkId}`);
  }

  getAlertStats(alertId) {
    return this.request.get(`/alerts/${alertId}/stats`);
  }

  // -------------------------------------
  // Analysis Priority
  // -------------------------------------

  getAnalysisPriority(applianceId) {
    return this.request.get(`/analysispriority/config/${applianceId}`);
  }

  putAnalysisPriority(applianceId, payload) {
    return this.request.put(`/analysispriority/config/${applianceId}`, payload);
  }

  getAnalysisPriorityManager(applianceId) {
    return this.request.get(`/analysispriority/${applianceId}/manager`);
  }

  patchAnalysisPriorityManager(applianceId, payload) {
    return this.request.patch(`/analysispriority/${applianceId}/manager`, payload);
  }

  // -------------------------------------
  // API Keys
  // -------------------------------------

  getApikeys() {
    return this.request.get('/apikeys');
  }

  getApikey(keyId) {
    return this.request.get(`/apikeys/${keyId}`);
  }

  postApikeys(payload) {
    return this.request.post('/apikeys', payload);
  }

  // -------------------------------------
  // Appliances
  // -------------------------------------

  getAppliances() {
    return this.request.get('/appliances');
  }

  getAppliance(applianceId) {
    return this.request.get(`/appliances/${applianceId}`);
  }

  postAppliance(payload) {
    return this.request.post('/appliances', payload);
  }

  getApplianceCloudServices(applianceId) {
    return this.request.get(`/appliances/${applianceId}/cloudservices`);
  }

  getApplianceProductKey(applianceId) {
    return this.request.get(`/appliances/${applianceId}/productkey`);
  }

  // -------------------------------------
  // Applications
  // -------------------------------------

  getApplications({
    active_from, active_until, limit, offset, searchType, value,
  }) {
    return this.request.get('/applications', {
      active_from, active_until, limit, offset, searchType, value,
    });
  }

  getApplication(applicationId) {
    return this.request.get(`/applications/${applicationId}`);
  }

  postApplication(applicationId, payload) {
    return this.request.post(`/applications/${applicationId}`, payload);
  }

  patchApplication(applicationId, payload) {
    return this.request.patch(`/applications/${applicationId}`, payload);
  }

  getApplicationActivity(applicationId) {
    return this.request.get(`/applications/${applicationId}/activity`);
  }

  getApplicationAlerts(applicationId) {
    return this.request.get(`/applications/${applicationId}/alerts`);
  }

  postApplicationAlerts(applicationId, payload) {
    return this.request.post(`/applications/${applicationId}/alerts`, payload);
  }

  deleteApplicationAlert(applicationId, alertId) {
    return this.request.delete(`/applications/${applicationId}/alerts/${alertId}`);
  }

  postApplicationAlert(applicationId, alertId) {
    return this.request.post(`/applications/${applicationId}/alerts/${alertId}`);
  }

  getApplicationDashboards(applicationId) {
    return this.request.get(`/applications/${applicationId}/dashboards`);
  }

  getApplicationFlexGrids(applicationId) {
    return this.request.get(`/applications/${applicationId}/flexgrids`);
  }

  postApplicationFlexGrids(applicationId, payload) {
    return this.request.post(`/applications/${applicationId}/flexgrids`, payload);
  }

  deleteApplicationFlexGrid(applicationId, flexGridId) {
    return this.request.delete(`/applications/${applicationId}/flexgrids/${flexGridId}`);
  }

  postApplicationFlexGrid(applicationId, flexGridId) {
    return this.request.post(`/applications/${applicationId}/flexgrids/${flexGridId}`);
  }

  getApplicationGeomaps(applicationId) {
    return this.request.get(`/applications/${applicationId}/geomaps`);
  }

  postApplicationGeomaps(applicationId, payload) {
    return this.request.post(`/applications/${applicationId}/geomaps`, payload);
  }

  deleteApplicationGeomap(applicationId, geomapId) {
    return this.request.delete(`/applications/${applicationId}/geomaps/${geomapId}`);
  }

  postApplicationGeomap(applicationId, geomapId) {
    return this.request.post(`/applications/${applicationId}/geomaps/${geomapId}`);
  }

  getApplicationPages(applicationId) {
    return this.request.get(`/applications/${applicationId}/pages`);
  }

  postApplicationPages(applicationId, payload) {
    return this.request.post(`/applications/${applicationId}/pages`, payload);
  }

  deleteApplicationPage(applicationId, pageId) {
    return this.request.delete(`/applications/${applicationId}/pages/${pageId}`);
  }

  postApplicationPage(applicationId, pageId) {
    return this.request.post(`/applications/${applicationId}/pages/${pageId}`);
  }

  // -------------------------------------
  // Audit Log
  // -------------------------------------

  getAuditLog(limit, offset) {
    return this.request.get('/auditlog', { limit, offset });
  }

  // -------------------------------------
  // Auth
  // -------------------------------------

  getAuths() {
    return this.request.get('/auth/identityproviders');
  }

  postAuth(payload) {
    return this.request.post('/auth/identityproviders', payload);
  }

  deleteAuth(authId) {
    return this.request.delete(`/auth/identityproviders/${authId}`);
  }

  getAuth(authId) {
    return this.request.get(`/auth/identityproviders/${authId}`);
  }

  patchAuth(authId, payload) {
    return this.request.patch(`/auth/identityproviders/${authId}`, payload);
  }

  getAuthPrivileges(authId) {
    return this.request.get(`/auth/identityproviders/${authId}/privileges`);
  }

  patchAuthPrivileges(authId, payload) {
    return this.request.patch(`/auth/identityproviders/${authId}/privileges`, payload);
  }

  getAuthSamlSP() {
    return this.request.get('/auth/samlsp');
  }

  // -------------------------------------
  // Bundles
  // -------------------------------------

  getBundles() {
    return this.request.get('/bundles');
  }

  postBundle(payload) {
    return this.request.post('/bundles', payload);
  }

  deleteBundle(bundleId) {
    return this.request.delete(`/bundles/${bundleId}`);
  }

  getBundle(bundleId) {
    return this.request.get(`/bundles/${bundleId}`);
  }

  postBundleApply(bundleId, payload) {
    return this.request.post(`/bundles/${bundleId}/apply`, payload);
  }

  // -------------------------------------
  // Custom Devices
  // -------------------------------------

  getCustomDevices(params) {
    return this.request.get('/customdevices', params);
  }

  postCustomDevice(payload) {
    return this.request.post('/customdevices', payload);
  }

  deleteCustomDevice(customDeviceId) {
    return this.request.delete(`/customdevices/${customDeviceId}`);
  }

  getCustomDevice(customDeviceId, criteria) {
    return this.request.get(`/customdevices/${customDeviceId}`, { include_criteria: criteria });
  }

  patchCustomDevice(customDeviceId, payload) {
    return this.request.patch(`/customdevices/${customDeviceId}`, payload);
  }

  getCustomDeviceCriterias(customDeviceId) {
    return this.request.get(`/customdevices/${customDeviceId}/criteria`);
  }

  postCustomDeviceCriteria(customDeviceId, payload) {
    return this.request.post(`/customdevices/${customDeviceId}/criteria`, payload);
  }

  deleteCustomDeviceCriteria(customDeviceId, criteriaId) {
    return this.request.delete(`/customdevices/${customDeviceId}/criteria/${criteriaId}`);
  }

  getCustomDeviceCriteria(customDeviceId, criteriaId) {
    return this.request.get(`/customdevices/${customDeviceId}/criteria/${criteriaId}`);
  }

  // -------------------------------------
  // Customizations
  // -------------------------------------

  getCustomizations() {
    return this.request.get('/customizations');
  }

  postCustomization(payload) {
    return this.request.post('/customizations', payload);
  }

  getCustomizationStatus() {
    return this.request.get('/customizations/status');
  }

  deleteCustomization(customizationId) {
    return this.request.delete(`/customizations/${customizationId}`);
  }

  getCustomization(customizationId) {
    return this.request.get(`/customizations/${customizationId}`);
  }

  postCustomizationApply(customizationId) {
    return this.request.post(`/customizations/${customizationId}/apply`);
  }

  postCustomizationDownload(customizationId) {
    return this.request.post(`/customizations/${customizationId}/download`);
  }

  // -------------------------------------
  // Dashboards
  // -------------------------------------

  getDashboards() {
    return this.request.get('/dashboards');
  }

  deleteDashboard(dashboardId) {
    return this.request.delete(`/dashboards/${dashboardId}`);
  }

  getDashboard(dashboardId) {
    return this.request.get(`/dashboards/${dashboardId}`);
  }

  patchDashboard(dashboardId, payload) {
    return this.request.patch(`/dashboards/${dashboardId}`, payload);
  }

  getDashboardReports(dashboardId) {
    return this.request.get(`/dashboards/${dashboardId}/reports`);
  }

  getDashboardSharing(dashboardId) {
    return this.request.get(`/dashboards/${dashboardId}/sharing`);
  }

  patchDashboardSharing(dashboardId, payload) {
    return this.request.patch(`/dashboards/${dashboardId}/sharing`, payload);
  }

  putDashboardSharing(dashboardId, payload) {
    return this.request.put(`/dashboards/${dashboardId}/sharing`, payload);
  }

  // -------------------------------------
  // Devices
  // -------------------------------------

  getDevices({
    search_type, value, limit, offset, active_from, active_until,
  }) {
    return this.request.get('/devices', {
      search_type, value, limit, offset, active_from, active_until,
    });
  }

  postDeviceSearch(payload) {
    return this.request.post('/devices/search', payload);
  }

  getDevice(deviceId) {
    return this.request.get(`/devices/${deviceId}`);
  }

  patchDevice(deviceId, payload) {
    return this.request.patch(`/devices/${deviceId}`, payload);
  }

  getDeviceActivity(deviceId) {
    return this.request.get(`/devices/${deviceId}/activity`);
  }

  getDeviceAlerts(deviceId, criteria) {
    return this.request.get(`/devices/${deviceId}/alerts`, { direct_assignments_only: criteria });
  }

  postDeviceAlerts(deviceId, payload) {
    return this.request.post(`/devices/${deviceId}/alerts`, payload);
  }

  deleteDeviceAlert(deviceId, alertId) {
    return this.request.delete(`/devices/${deviceId}/alerts/${alertId}`);
  }

  postDeviceAlert(deviceId, alertId) {
    return this.request.post(`/devices/${deviceId}/alerts/${alertId}`);
  }

  getDeviceDashboards(deviceId) {
    return this.request.get(`/devices/${deviceId}/dashboards`);
  }

  getDeviceDeviceGroups(deviceId) {
    return this.request.get(`/devices/${deviceId}/devicegroups`);
  }

  postDeviceDeviceGroups(deviceId, payload) {
    return this.request.post(`/devices/${deviceId}/devicegroups`, payload);
  }

  deleteDeviceDeviceGroup(deviceId, deviceGroupId) {
    return this.request.delete(`/devices/${deviceId}/devicegroups/${deviceGroupId}`);
  }

  postDeviceDeviceGroup(deviceId, deviceGroupId) {
    return this.request.post(`/devices/${deviceId}/devicegroups/${deviceGroupId}`);
  }

  getDeviceFlexGrids(deviceId) {
    return this.request.get(`/devices/${deviceId}/flexgrids`);
  }

  postDeviceFlexGrids(deviceId, payload) {
    return this.request.post(`/devices/${deviceId}/flexgrids`, payload);
  }

  deleteDeviceFlexGrid(deviceId, flexGridId) {
    return this.request.delete(`/devices/${deviceId}/flexgrids/${flexGridId}`);
  }

  postDeviceFlexGrid(deviceId, flexGridId) {
    return this.request.post(`/devices/${deviceId}/flexgrids/${flexGridId}`);
  }

  getDeviceGeomaps(deviceId, criteria) {
    return this.request.get(`/devices/${deviceId}/geomaps`, { direct_assignments_only: criteria });
  }

  postDeviceGeomaps(deviceId, payload) {
    return this.request.post(`/devices/${deviceId}/geomaps`, payload);
  }

  deleteDeviceGeomap(deviceId, geomapId) {
    return this.request.delete(`/devices/${deviceId}/geomaps/${geomapId}`);
  }

  postDeviceGeomap(deviceId, geomapId) {
    return this.request.post(`/devices/${deviceId}/geomaps/${geomapId}`);
  }

  getDevicePages(deviceId, criteria) {
    return this.request.get(`/devices/${deviceId}/pages`, { direct_assignments_only: criteria });
  }

  postDevicePages(deviceId, payload) {
    return this.request.post(`/devices/${deviceId}/pages`, payload);
  }

  deleteDevicePage(deviceId, pageId) {
    return this.request.delete(`/devices/${deviceId}/pages/${pageId}`);
  }

  postDevicePage(deviceId, pageId) {
    return this.request.post(`/devices/${deviceId}/pages/${pageId}`);
  }

  getDeviceTags(deviceId) {
    return this.request.get(`/devices/${deviceId}/tags`);
  }

  postDeviceTags(deviceId, payload) {
    return this.request.post(`/devices/${deviceId}/tags`, payload);
  }

  deleteDeviceTag(deviceId, tagId) {
    return this.request.delete(`/devices/${deviceId}/tags/${tagId}`);
  }

  postDeviceTag(deviceId, tagId) {
    return this.request.post(`/devices/${deviceId}/tags/${tagId}`);
  }

  getDeviceTriggers(deviceId, criteria) {
    return this.request.get(`/devices/${deviceId}/triggers`, { direct_assignments_only: criteria });
  }

  postDeviceTriggers(deviceId, payload) {
    return this.request.post(`/devices/${deviceId}/triggers`, payload);
  }

  deleteDeviceTrigger(deviceId, triggerId) {
    return this.request.delete(`/devices/${deviceId}/triggers/${triggerId}`);
  }

  postDeviceTrigger(deviceId, triggerId) {
    return this.request.post(`/devices/${deviceId}/triggers/${triggerId}`);
  }

  // -------------------------------------
  // Device Groups
  // -------------------------------------

  getDeviceGroups(since, all, name) {
    return this.request.get('/devicegroups', { since, all, name });
  }

  postDeviceGroup(payload) {
    return this.request.post('/devicegroups', payload);
  }

  deleteDeviceGroup(deviceGroupId) {
    return this.request.delete(`/devicegroups/${deviceGroupId}`);
  }

  getDeviceGroup(deviceGroupId) {
    return this.request.get(`/devicegroups/${deviceGroupId}`);
  }

  patchDeviceGroup(deviceGroupId, payload) {
    return this.request.patch(`/devicegroups/${deviceGroupId}`, payload);
  }

  getDeviceGroupAlerts(deviceGroupId, criteria) {
    return this.request.get(`/devicegroups/${deviceGroupId}/alerts`, { direct_assignments_only: criteria });
  }

  postDeviceGroupAlerts(deviceGroupId, payload) {
    return this.request.post(`/devicegroups/${deviceGroupId}/alerts`, payload);
  }

  deleteDeviceGroupAlert(deviceGroupId, alertId) {
    return this.request.delete(`/devicegroups/${deviceGroupId}/alerts/${alertId}`);
  }

  postDeviceGroupAlert(deviceGroupId, alertId) {
    return this.request.post(`/devicegroups/${deviceGroupId}/alerts/${alertId}`);
  }

  getDeviceGroupDashboards(deviceGroupId) {
    return this.request.get(`/devicegroups/${deviceGroupId}/dashboards`);
  }

  getDeviceGroupDevices(deviceGroupId, {
    active_from, active_until, limit, offset,
  }) {
    return this.request.get(`/devicegroups/${deviceGroupId}/devices`, {
      active_from, active_until, limit, offset,
    });
  }

  postDeviceGroupDevices(deviceGroupId, payload) {
    return this.request.post(`/devicegroups/${deviceGroupId}/devices`, payload);
  }

  deleteDeviceGroupDevice(deviceGroupId, deviceId) {
    return this.request.delete(`/devicegroups/${deviceGroupId}/devices/${deviceId}`);
  }

  postDeviceGroupDevice(deviceGroupId, deviceId) {
    return this.request.post(`/devicegroups/${deviceGroupId}/devices/${deviceId}`);
  }

  getDeviceGroupFlexGrids(deviceGroupId) {
    return this.request.get(`/devicegroups/${deviceGroupId}/flexgrids`);
  }

  postDeviceGroupFlexGrids(deviceGroupId, payload) {
    return this.request.post(`/devicegroups/${deviceGroupId}/flexgrids`, payload);
  }

  deleteDeviceGroupFlexGrid(deviceGroupId, flexGridId) {
    return this.request.delete(`/devicegroups/${deviceGroupId}/flexgrids/${flexGridId}`);
  }

  postDeviceGroupFlexGrid(deviceGroupId, flexGridId) {
    return this.request.post(`/devicegroups/${deviceGroupId}/flexgrids/${flexGridId}`);
  }

  getDeviceGroupGeomaps(deviceGroupId, criteria) {
    return this.request.get(`/devicegroups/${deviceGroupId}/geomaps`, { direct_assignments_only: criteria });
  }

  postDeviceGroupGeomaps(deviceGroupId, payload) {
    return this.request.post(`/devicegroups/${deviceGroupId}/geomaps`, payload);
  }

  deleteDeviceGroupGeomap(deviceGroupId, geomapId) {
    return this.request.delete(`/devicegroups/${deviceGroupId}/geomaps/${geomapId}`);
  }

  postDeviceGroupGeomap(deviceGroupId, geomapId) {
    return this.request.post(`/devicegroups/${deviceGroupId}/geomaps/${geomapId}`);
  }

  getDeviceGroupPages(deviceGroupId, criteria) {
    return this.request.get(`/devicegroups/${deviceGroupId}/pages`, { direct_assignments_only: criteria });
  }

  postDeviceGroupPages(deviceGroupId, payload) {
    return this.request.post(`/devicegroups/${deviceGroupId}/pages`, payload);
  }

  deleteDeviceGroupPage(deviceGroupId, pageId) {
    return this.request.delete(`/devicegroups/${deviceGroupId}/pages/${pageId}`);
  }

  postDeviceGroupPage(deviceGroupId, pageId) {
    return this.request.post(`/devicegroups/${deviceGroupId}/pages/${pageId}`);
  }

  getDeviceGroupTags(deviceGroupId) {
    return this.request.get(`/devicegroups/${deviceGroupId}/tags`);
  }

  postDeviceGroupTags(deviceGroupId, payload) {
    return this.request.post(`/devicegroups/${deviceGroupId}/tags`, payload);
  }

  deleteDeviceGroupTag(deviceGroupId, tagId) {
    return this.request.delete(`/devicegroups/${deviceGroupId}/tags/${tagId}`);
  }

  postDeviceGroupTag(deviceGroupId, tagId) {
    return this.request.post(`/devicegroups/${deviceGroupId}/tags/${tagId}`);
  }

  getDeviceGroupTriggers(deviceGroupId, criteria) {
    return this.request.get(`/devicegroups/${deviceGroupId}/triggers`, { direct_assignments_only: criteria });
  }

  postDeviceGroupTriggers(deviceGroupId, payload) {
    return this.request.post(`/devicegroups/${deviceGroupId}/triggers`, payload);
  }

  deleteDeviceGroupTrigger(deviceGroupId, triggerId) {
    return this.request.delete(`/devicegroups/${deviceGroupId}/triggers/${triggerId}`);
  }

  postDeviceGroupTrigger(deviceGroupId, triggerId) {
    return this.request.post(`/devicegroups/${deviceGroupId}/triggers/${triggerId}`);
  }

  // -------------------------------------
  // Email Groups
  // -------------------------------------

  getEmailGroups() {
    return this.request.get('/emailgroups');
  }

  postEmailGroup(payload) {
    return this.request.post('/emailgroups', payload);
  }

  deleteEmailGroup(emailGroupId) {
    return this.request.delete(`/emailgroups/${emailGroupId}`);
  }

  getEmailGroup(emailGroupId) {
    return this.request.get(`/emailgroups/${emailGroupId}`);
  }

  patchEmailGroup(emailGroupId, payload) {
    return this.request.patch(`/emailgroups/${emailGroupId}`, payload);
  }

  // -------------------------------------
  // Exclusion Intervals
  // -------------------------------------

  getExclusionIntervals() {
    return this.request.get('/exclusionintervals');
  }

  postExclusionInterval(payload) {
    return this.request.post('/exclusionintervals', payload);
  }

  deleteExclusionInterval(exclusionIntervalId) {
    return this.request.delete(`/exclusionintervals/${exclusionIntervalId}`);
  }

  getExclusionInterval(exclusionIntervalId) {
    return this.request.get(`/exclusionintervals/${exclusionIntervalId}`);
  }

  patchExclusionInterval(exclusionIntervalId, payload) {
    return this.request.patch(`/exclusionintervals/${exclusionIntervalId}`, payload);
  }

  // -------------------------------------
  // Extrahop
  // -------------------------------------

  getExtrahop() {
    return this.request.get('/extrahop');
  }

  getExtrahopIdrac() {
    return this.request.get('/extrahop/idrac');
  }

  getExtrahopPlatform() {
    return this.request.get('/extrahop/platform');
  }

  getExtrahopProcesses() {
    return this.request.get('/extrahop/processes');
  }

  postExtrahopProcessRestart(processId) {
    return this.request.post(`/extrahop/processes/${processId}/restart`);
  }

  postExtrahopSSLCert() {
    return this.request.post('/extrahop/sslcert');
  }

  putExtrahopSSLCert(payload) {
    return this.request.put('/extrahop/sslcert', payload);
  }

  getExtrahopVersion() {
    return this.request.get('/extrahop/version');
  }

  // -------------------------------------
  // Flex Grids
  // -------------------------------------

  getFlexGrids() {
    return this.request.get('/flexgrids');
  }

  getFlexGridApplications(flexGridId) {
    return this.request.get(`/flexgrids/${flexGridId}/applications`);
  }

  postFlexGridApplications(flexGridId, payload) {
    return this.request.post(`/flexgrids/${flexGridId}/applications`, payload);
  }

  deleteFlexGridApplication(flexGridId, applicationId) {
    return this.request.delete(`/flexgrids/${flexGridId}/applications/${applicationId}`);
  }

  postFlexGridApplication(flexGridId, applicationId) {
    return this.request.post(`/flexgrids/${flexGridId}/applications/${applicationId}`);
  }

  getFlexGridDeviceGroups(flexGridId) {
    return this.request.get(`/flexgrids/${flexGridId}/devicegroups`);
  }

  postFlexGridDeviceGroups(flexGridId, payload) {
    return this.request.post(`/flexgrids/${flexGridId}/devicegroups`, payload);
  }

  deleteFlexGridDeviceGroup(flexGridId, deviceGroupId) {
    return this.request.delete(`/flexgrids/${flexGridId}/devicegroups/${deviceGroupId}`);
  }

  postFlexGridDeviceGroup(flexGridId, deviceGroupId) {
    return this.request.post(`/flexgrids/${flexGridId}/devicegroups/${deviceGroupId}`);
  }

  getFlexGridDevices(flexGridId) {
    return this.request.get(`/flexgrids/${flexGridId}/devices`);
  }

  postFlexGridDevices(flexGridId, payload) {
    return this.request.post(`/flexgrids/${flexGridId}/devices`, payload);
  }

  deleteFlexGridDevice(flexGridId, deviceId) {
    return this.request.delete(`/flexgrids/${flexGridId}/devices/${deviceId}`);
  }

  postFlexGridDevice(flexGridId, deviceId) {
    return this.request.post(`/flexgrids/${flexGridId}/devices/${deviceId}`);
  }

  // -------------------------------------
  // Geomaps
  // -------------------------------------

  getGeomaps() {
    return this.request.get('/geomaps');
  }

  postGeomaps(payload) {
    return this.request.post('/geomaps', payload);
  }

  deleteGeomap(geomapId) {
    return this.request.delete(`/geomaps/${geomapId}`);
  }

  getGeomap(geomapId) {
    return this.request.get(`/geomaps/${geomapId}`);
  }

  patchGeomap(geomapId, payload) {
    return this.request.patch(`/geomaps/${geomapId}`, payload);
  }

  getGeomapApplications(geomapId) {
    return this.request.get(`/geomaps/${geomapId}/applications`);
  }

  postGeomapApplications(geomapId, payload) {
    return this.request.post(`/geomaps/${geomapId}/applications`, payload);
  }

  deleteGeomapApplication(geomapId, applicationId) {
    return this.request.delete(`/geomaps/${geomapId}/applications/${applicationId}`);
  }

  postGeomapApplication(geomapId, applicationId) {
    return this.request.post(`/geomaps/${geomapId}/applications/${applicationId}`);
  }

  getGeomapDeviceGroups(geomapId) {
    return this.request.get(`/geomaps/${geomapId}/devicegroups`);
  }

  postGeomapDeviceGroups(geomapId, payload) {
    return this.request.post(`/geomaps/${geomapId}/devicegroups`, payload);
  }

  deleteGeomapDeviceGroup(geomapId, deviceGroupId) {
    return this.request.delete(`/geomaps/${geomapId}/devicegroups/${deviceGroupId}`);
  }

  postGeomapDeviceGroup(geomapId, deviceGroupId) {
    return this.request.post(`/geomaps/${geomapId}/devicegroups/${deviceGroupId}`);
  }

  getGeomapDevices(geomapId) {
    return this.request.get(`/geomaps/${geomapId}/devices`);
  }

  postGeomapDevices(geomapId, payload) {
    return this.request.post(`/geomaps/${geomapId}/devices`, payload);
  }

  deleteGeomapDevice(geomapId, deviceId) {
    return this.request.delete(`/geomaps/${geomapId}/devices/${deviceId}`);
  }

  postGeomapDevice(geomapId, deviceId) {
    return this.request.post(`/geomaps/${geomapId}/devices/${deviceId}`);
  }

  // -------------------------------------
  // License
  // -------------------------------------

  getLicense() {
    return this.request.get('/license');
  }

  putLicense(payload) {
    return this.request.put('/license', payload);
  }

  getLicenseProductKey() {
    return this.request.get('/license/productkey');
  }

  putLicenseProductKey(payload) {
    return this.request.put('/license/productkey', payload);
  }

  // -------------------------------------
  // Metrics
  // -------------------------------------

  postMetrics(payload) {
    return this.request.post('/metrics', payload);
  }

  postMetricSeach(payload) {
    return this.postMetrics(payload);
  }

  postMetricsSeach(payload) {
    return this.postMetrics(payload);
  }

  getMetricsNext(xid) {
    return this.request.get(`/metrics/next/${xid}`);
  }

  getNextMetrics(xid) {
    return this.getMetricsNext(xid);
  }

  postMetricsTotal(payload) {
    return this.request.post('/metrics/total', payload);
  }

  postMetricsTotalByObject(payload) {
    return this.request.post('/metrics/totalbyobject', payload);
  }

  // -------------------------------------
  // Networks
  // -------------------------------------

  getNetworks() {
    return this.request.get('/networks');
  }

  getNetwork(networkId) {
    return this.request.get(`/networks/${networkId}`);
  }

  patchNetwork(networkId, payload) {
    return this.request.patch(`/networks/${networkId}`, payload);
  }

  getNetworkAlerts(networkId, criteria) {
    return this.request.get(`/networks/${networkId}/alerts`, { direct_assignments_only: criteria });
  }

  postNetworkAlerts(networkId, payload) {
    return this.request.post(`/networks/${networkId}/alerts`, payload);
  }

  deleteNetworkAlert(networkId, alertId) {
    return this.request.delete(`/networks/${networkId}/alerts/${alertId}`);
  }

  postNetworkAlert(networkId, alertId) {
    return this.request.post(`/networks/${networkId}/alerts/${alertId}`);
  }

  getNetworkPages(networkId, criteria) {
    return this.request.get(`/networks/${networkId}/pages`, { direct_assignments_only: criteria });
  }

  postNetworkPages(networkId, payload) {
    return this.request.post(`/networks/${networkId}/pages`, payload);
  }

  deleteNetworkPage(networkId, pageId) {
    return this.request.delete(`/networks/${networkId}/pages/${pageId}`);
  }

  postNetworkPage(networkId, pageId) {
    return this.request.post(`/networks/${networkId}/pages/${pageId}`);
  }

  getNetworkVlans(networkId) {
    return this.request.get(`/networks/${networkId}/vlans`);
  }

  // -------------------------------------
  // Network Locality Entry
  // -------------------------------------

  getNetworkLocalities() {
    return this.request.get('/networklocality');
  }

  postNetworkLocality(payload) {
    return this.request.post('/networklocality', payload);
  }

  deleteNetworkLocality(networkLocalityId) {
    return this.request.delete(`/networklocality/${networkLocalityId}`);
  }

  getNetworkLocality(networkLocalityId) {
    return this.request.get(`/networklocality/${networkLocalityId}`);
  }

  patchNetworkLocality(networkLocalityId, payload) {
    return this.request.patch(`/networklocality/${networkLocalityId}`, payload);
  }

  // -------------------------------------
  // Nodes
  // -------------------------------------

  getNodes() {
    return this.request.get('/nodes');
  }

  getNode(nodeId) {
    return this.request.get(`/nodes/${nodeId}`);
  }

  patchNode(nodeId, payload) {
    return this.request.patch(`/nodes/${nodeId}`, payload);
  }

  // -------------------------------------
  // Packet Captures
  // -------------------------------------

  getPacketCaptures() {
    return this.request.get('/packetcaptures');
  }

  deletePacketCapture(packetCaptureId) {
    return this.request.delete(`/packetcaptures/${packetCaptureId}`);
  }

  getPacketCapture(packetCaptureId) {
    return this.request.get(`/packetcaptures/${packetCaptureId}`);
  }

  // -------------------------------------
  // Pages
  // -------------------------------------

  getPages() {
    return this.request.get('/pages');
  }

  postPages(payload) {
    return this.request.post('/pages', payload);
  }

  deletePage(pageId) {
    return this.request.delete(`/pages/${pageId}`);
  }

  getPage(pageId) {
    return this.request.get(`/pages/${pageId}`);
  }

  patchPage(pageId, payload) {
    return this.request.patch(`/pages/${pageId}`, payload);
  }

  getPageApplications(pageId) {
    return this.request.get(`/pages/${pageId}/applications`);
  }

  postPageApplications(pageId, payload) {
    return this.request.post(`/pages/${pageId}/applications`, payload);
  }

  deletePageApplication(pageId, applicationId) {
    return this.request.delete(`/pages/${pageId}/applications/${applicationId}`);
  }

  postPageApplication(pageId, applicationId) {
    return this.request.post(`/pages/${pageId}/applications/${applicationId}`);
  }

  getPageDeviceGroups(pageId) {
    return this.request.get(`/pages/${pageId}/devicegroups`);
  }

  postPageDeviceGroups(pageId, payload) {
    return this.request.post(`/pages/${pageId}/devicegroups`, payload);
  }

  deletePageDeviceGroup(pageId, deviceGroupId) {
    return this.request.delete(`/pages/${pageId}/devicegroups/${deviceGroupId}`);
  }

  postPageDeviceGroup(pageId, deviceGroupId) {
    return this.request.post(`/pages/${pageId}/devicegroups/${deviceGroupId}`);
  }

  getPageDevices(pageId) {
    return this.request.get(`/pages/${pageId}/devices`);
  }

  postPageDevices(pageId, payload) {
    return this.request.post(`/pages/${pageId}/devices`, payload);
  }

  deletePageDevice(pageId, deviceId) {
    return this.request.delete(`/pages/${pageId}/devices/${deviceId}`);
  }

  postPageDevice(pageId, deviceId) {
    return this.request.post(`/pages/${pageId}/devices/${deviceId}`);
  }

  getPageNetworks(pageId) {
    return this.request.get(`/pages/${pageId}/networks`);
  }

  postPageNetworks(pageId, payload) {
    return this.request.post(`/pages/${pageId}/networks`, payload);
  }

  deletePageNetwork(pageId, networkId) {
    return this.request.delete(`/pages/${pageId}/networks/${networkId}`);
  }

  postPageNetwork(pageId, networkId) {
    return this.request.post(`/pages/${pageId}/networks/${networkId}`);
  }

  // -------------------------------------
  // Record Logs
  // -------------------------------------

  postRecordsCursor(payload, contextTtl) {
    return this.request.post(`/records/cursor?context_ttl=${contextTtl}`, payload);
  }

  getRecordsCursor(cursor, contextTtl) {
    return this.request.get(`/records/cursor/${cursor}?context_ttl=${contextTtl}`);
  }

  postRecordsSearch(payload) {
    return this.request.post('/records/search', payload);
  }

  postRecordSearch(payload) {
    return this.postRecordsSearch(payload);
  }

  // -------------------------------------
  // Reports
  // -------------------------------------

  getReports() {
    return this.request.get('/reports');
  }

  postReport(payload) {
    return this.request.post('/reports', payload);
  }

  deleteReport(reportId) {
    return this.request.delete(`/reports/${reportId}`);
  }

  getReport(reportId) {
    return this.request.get(`/reports/${reportId}`);
  }

  patchReport(reportId, payload) {
    return this.request.patch(`/reports/${reportId}`, payload);
  }

  getReportContents(reportId) {
    return this.request.get(`/reports/${reportId}/contents`);
  }

  putReportContents(reportId, payload) {
    return this.request.put(`/reports/${reportId}/contents`, payload);
  }

  getReportEmailGroups(reportId) {
    return this.request.get(`/reports/${reportId}/emailgroups`);
  }

  postReportEmailGroups(reportId, payload) {
    return this.request.post(`/reports/${reportId}/emailgroups`, payload);
  }

  deleteReportEmailGroup(reportId, emailGroupId) {
    return this.request.delete(`/reports/${reportId}/emailgroups/${emailGroupId}`);
  }

  postReportEmailGroup(reportId, emailGroupId) {
    return this.request.post(`/reports/${reportId}/emailgroups/${emailGroupId}`);
  }

  postReportQueue(reportId) {
    return this.request.post(`/reports/${reportId}/queue`);
  }

  // -------------------------------------
  // Running Config
  // -------------------------------------

  getRunningConfig(section) {
    return this.request.get('/runningconfig', { section });
  }

  putRunningConfig(payload) {
    return this.request.put('/runningconfig', payload);
  }

  postRunningConfigSave() {
    return this.request.post('/runningconfig/save');
  }

  getRunningConfigSaved() {
    return this.request.get('/runningconfig/saved');
  }

  // -------------------------------------
  // Software
  // -------------------------------------

  getSoftwares() {
    return this.request.get('/software');
  }

  getSoftware(softwareId) {
    return this.request.get(`/software/${softwareId}`);
  }

  // -------------------------------------
  // SSL Decrypt Keys
  // -------------------------------------

  getSslDecryptKeys() {
    return this.request.get('/ssldecryptkeys');
  }

  postSslDecryptKey(payload) {
    return this.request.post('/ssldecryptkeys', payload);
  }

  deleteSslDecryptKey(sslDecryptKeyId) {
    return this.request.delete(`/ssldecryptkeys/${sslDecryptKeyId}`);
  }

  getSslDecryptKey(sslDecryptKeyId) {
    return this.request.get(`/ssldecryptkeys/${sslDecryptKeyId}`);
  }

  patchSslDecryptKey(sslDecryptKeyId, payload) {
    return this.request.patch(`/ssldecryptkeys/${sslDecryptKeyId}`, payload);
  }

  getSslDecryptKeyProtocols(sslDecryptKeyId) {
    return this.request.get(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols`);
  }

  postSslDecryptKeyProtocols(sslDecryptKeyId, payload) {
    return this.request.post(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols`, payload);
  }

  deleteSslDecryptKeyProtocol(sslDecryptKeyId, protocolId) {
    return this.request.delete(`/ssldecrpytkeys/${sslDecryptKeyId}/protocols/${protocolId}`);
  }

  // -------------------------------------
  // Support Packs
  // -------------------------------------

  getSupportPacks() {
    return this.request.get('/supportpacks');
  }

  postSupportPackExecute() {
    return this.request.post('/supportpacks/execute');
  }

  getSupportPackQueue(queueId) {
    return this.request.get(`/supportpacks/queue/${encodeURIComponent}`(queueId));
  }

  getSupportPack(filename) {
    return this.request.get(`/supportpacks/${encodeURIComponent}`(filename));
  }

  // -------------------------------------
  // Tags
  // -------------------------------------

  getTags() {
    return this.request.get('/tags');
  }

  postTag(payload) {
    return this.request.post('/tags', payload);
  }

  deleteTag(tagId) {
    return this.request.delete(`/tags/${tagId}`);
  }

  getTag(tagId) {
    return this.request.get(`/tags/${tagId}`);
  }

  patchTag(tagId, payload) {
    return this.request.patch(`/tags/${tagId}`, payload);
  }

  getTagDevices(tagId) {
    return this.request.get(`/tags/${tagId}/devices`);
  }

  postTagDevices(tagId, payload) {
    return this.request.post(`/tags/${tagId}/devices`, payload);
  }

  deleteTagDevice(tagId, deviceId) {
    return this.request.delete(`/tags/${tagId}/devices/${deviceId}`);
  }

  postTagDevice(tagId, deviceId) {
    return this.request.post(`/tags/${tagId}/devices/${deviceId}`);
  }

  // -------------------------------------
  // Triggers
  // -------------------------------------

  getTriggers() {
    return this.request.get('/triggers');
  }

  postTrigger(payload) {
    return this.request.post('/triggers', payload);
  }

  deleteTrigger(triggerId) {
    return this.request.delete(`/triggers/${triggerId}`);
  }

  getTrigger(triggerId) {
    return this.request.get(`/triggers/${triggerId}`);
  }

  patchTrigger(triggerId, payload) {
    return this.request.patch(`/triggers/${triggerId}`, payload);
  }

  getTriggerDeviceGroups(triggerId) {
    return this.request.get(`/triggers/${triggerId}/devicegroups`);
  }

  postTriggerDeviceGroups(triggerId, payload) {
    return this.request.post(`/triggers/${triggerId}/devicegroups`, payload);
  }

  deleteTriggerDeviceGroup(triggerId, deviceGroupId) {
    return this.request.delete(`/triggers/${triggerId}/devicegroups/${deviceGroupId}`);
  }

  postTriggerDeviceGroup(triggerId, deviceGroupId) {
    return this.request.post(`/triggers/${triggerId}/devicegroups/${deviceGroupId}`);
  }

  getTriggerDevices(triggerId) {
    return this.request.get(`/triggers/${triggerId}/devices`);
  }

  postTriggerDevices(triggerId, payload) {
    return this.request.post(`/triggers/${triggerId}/devices`, payload);
  }

  deleteTriggerDevice(triggerId, deviceId) {
    return this.request.delete(`/triggers/${triggerId}/devices/${deviceId}`);
  }

  postTriggerDevice(triggerId, deviceId) {
    return this.request.post(`/triggers/${triggerId}/devices/${deviceId}`);
  }

  // -------------------------------------
  // Users
  // -------------------------------------

  getUsers() {
    return this.request.get('/users');
  }

  postUser(payload) {
    return this.request.post('/users', payload);
  }

  deleteUser(user) {
    return this.request.delete(`/users/${user}`);
  }

  getUser(user) {
    return this.request.get(`/users/${user}`);
  }

  patchUser(user, payload) {
    return this.request.patch(`/users/${user}`, payload);
  }

  getUserApiKeys(user) {
    return this.request.get(`/users/${user}/apikeys`);
  }

  getUserApiKey(user, keyId) {
    return this.request.get(`/users/${user}/apikeys/${keyId}`);
  }

  // -------------------------------------
  // User Groups
  // -------------------------------------

  getUserGroups() {
    return this.request.get('/usergroups');
  }

  postUserGroupsRefresh() {
    return this.request.post('/usergroups/refresh');
  }

  getUserGroup(userGroupId) {
    return this.request.get(`/usergroups/${userGroupId}`);
  }

  patchUserGroup(userGroupId, payload) {
    return this.request.patch(`/usergroups/${userGroupId}`, payload);
  }

  deleteUserGroupAssociations(userGroupId) {
    return this.request.delete(`/usergroups/${userGroupId}`);
  }

  getUserGroupMembers(userGroupId) {
    return this.request.get(`/usergroups/${userGroupId}/members`);
  }

  postUserGroupRefresh(userGroupId) {
    return this.request.post(`/usergroups/${userGroupId}/refresh`);
  }

  // -------------------------------------
  // VLANs
  // -------------------------------------

  getVlans() {
    return this.request.get('/vlans');
  }

  getVlan(vlanId) {
    return this.request.get(`/vlans/${vlanId}`);
  }

  patchVlan(vlanId, payload) {
    return this.request.patch(`/vlans/${vlanId}`, payload);
  }

  // -------------------------------------
  // Whitelist
  // -------------------------------------

  deleteWhitelistDevice(deviceId) {
    return this.request.delete(`/whitelist/device/${deviceId}`);
  }

  postWhitelistDevice(deviceId) {
    return this.request.post(`/whitelist/device/${deviceId}`);
  }

  getWhitelistsDevices() {
    return this.request.get('/whitelist/devices');
  }

  postWhitelistDevices(payload) {
    return this.request.post('/whitelist/devices', payload);
  }
};
