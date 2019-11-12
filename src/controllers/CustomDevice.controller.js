// CustomDevice.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const CustomDeviceSet = require('../models/customDevice/CustomDeviceSet.model');
const Strings = require('../constants/CustomDevice.constants');

const Search = require('../models/_search/Search.model');
const SearchFilter = require('../models/_search/SearchFilter.model');
const SearchFilterRuleSet = require('../models/_search/SearchFilterRuleSet.model');

module.exports = class CustomDeviceCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Search - Global
  // -------------------------------------

  findAll(limit, offset, activeFrom, activeUntil) {
    return this.find({ [Strings.Search.Types.Any]: undefined }, limit, offset, activeFrom, activeUntil);
  }

  // -------------------------------------
  // Search - Predefined
  // -------------------------------------

  findByName(name, limit, offset, activeFrom, activeUntil) {
    return this.find({ [Strings.Search.Types.Name]: name }, limit, offset, activeFrom, activeUntil);
  }

  findByExtrahopId(extrahopId, limit, offset, activeFrom, activeUntil) {
    return this.find({ [Strings.Search.Types.ExtrahopId]: extrahopId }, limit, offset, activeFrom, activeUntil);
  }

  findByAuthor(author, limit, offset, activeFrom, activeUntil) {
    return this.find({ [Strings.Search.Types.Author]: author }, limit, offset, activeFrom, activeUntil);
  }

  // -------------------------------------
  // Search Functions - Base
  // -------------------------------------

  find(filter, limit, offset, activeFrom, activeUntil) {
    const searchType = Object.keys(filter)[0];
    const value = filter[searchType];

    console.info(`Searching '${this.appliance.id}' for customDevices with query '?limit=${limit}&searchType=${searchType}${value ? '&value=' + value : ''}'`);

    const getCustomDevices = this.appliance.getCustomDevices(searchType, value, limit, offset, activeFrom, activeUntil);
    return new CustomDeviceSet(this.process(getCustomDevices, 'customDevices'));
  }

  search(field, operator, value, limit, offset, activeFrom, activeUntil) {
    const searchFilter = new SearchFilter({
      field: field,
      operator: operator,
      value: value,
    });

    const search = new Search({
      filters: new SearchFilterRuleSet([searchFilter])
    }, limit, offset, activeFrom, activeUntil);

    search.print();

    return new CustomDeviceSet(this.process(this.appliance.searchCustomDevices(search), 'customDevices'));
  }

  multiSearch(searchFilter, limit, offset, activeFrom, activeUntil) {
    const searchFilters = searchFilter.filters.map(filter => new SearchFilter({
      field: filter[0],
      operator: filter[1],
      value: filter[2]
    }));

    const search = new Search({
      filters: new SearchFilterRuleSet(searchFilters),
      operator: searchFilter.operator,
    }, limit, offset, activeFrom, activeUntil);

    search.print();

    return new CustomDeviceSet(this.process(this.appliance.searchCustomDevices(search), 'customDevices'));
  }

  // -------------------------------------
  // Edit CustomDevice
  // -------------------------------------

  enable(customDevice, skip = true) {
    if (customDevice.disabled || !skip) {
      customDevice.disabled = false;
      return this.patchCustomDevice(customDevice.id, {
        'disabled': customDevice.disabled
      });
    }
  }

  disable(customDevice, skip = true) {
    if (!customDevice.disabled || !skip) {
      customDevice.disabled = true;
      return this.patchCustomDevice(customDevice.id, {
        'disabled': customDevice.disabled
      });
    }
  }

  toggle(customDevice) {
    return this.patchCustomDevice(customDevice.id, {
      'disabled': !customDevice.disabled
    });
  }

  // -------------------------------------
  // Add Custom Device
  // -------------------------------------

  create(customDevice) {
    return this.appliance.postCustomDevice(customDevice);
  }

  createCriteria(customDeviceID, criteria) {
    return this.appliance.postCustomDeviceCriteria(customDeviceID, criteria);
  }

  update(customDeviceID, criteria) {
    return this.appliance.patchCustomDevice(customDeviceID, criteria);
  }

  get(customDeviceID, includeCriteria) {
      return this.appliance.getCustomDevice(customDeviceID, includeCriteria);
  }

  getCriteria(customDeviceID) {
      return this.appliance.getCustomDeviceCriteria(customDeviceID);
  }

  delete(customDeviceID) {
      return this.appliance.deleteCustomDevice(customDeviceID);
  }

  deleteCriteria(customDeviceID, customDeviceCriteriaID) {
      return this.appliance.deleteCustomDeviceCriteria(customDeviceID, customDeviceCriteriaID);
  }

  // -------------------------------------
  // API Functions
  // -------------------------------------

  getCustomDevices() {
    return this.appliance.getCustomDevices();
  }

  getCustomDevice(customDeviceID, includeCriteria) {
    return this.appliance.getCustomDevice(customDeviceID, includeCriteria);
  }

  postCustomDevice(customDevice) {
    return this.appliance.postCustomDevice(customDevice);
  }

  deleteCustomDevice(customDeviceID) {
    return this.appliance.postCustomDevice(customDeviceID);
  }

  patchCustomDevice(customDeviceID, payload) {
    return this.appliance.patchCustomDevice(customDeviceID, payload);
  }

  getCustomDeviceCriteria(customDeviceID) {
    return this.appliance.getCustomDeviceCriteria(customDeviceID);
  }

  postCustomDeviceCriteria(customDeviceID, payload) {
    return this.appliance.postCustomDeviceCriteria(customDeviceID, payload);
  }

  deleteCustomDeviceCriteria(customDeviceID, customDeviceCriteriaID) {
    return this.appliance.deleteCustomDeviceCriteria(customDeviceID, customDeviceCriteriaID);
  }
}
