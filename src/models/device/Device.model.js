// Device.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Device extends BaseObject {
  constructor(device = {}) {
    super(device);
    this.name = device.display_name;
    this.mod_time = device.mod_time;
    this.node_id = device.node_id;
    this.id = device.id;
    this.extrahop_id = device.extrahop_id;
    this.discovery_id = device.discovery_id;
    this.display_name = device.display_name;
    this.description = device.description;
    this.user_mod_time = device.user_mod_time;
    this.discover_time = device.discover_time;
    this.vlanid = device.vlanid;
    this.parent_id = device.parent_id;
    this.macaddr = device.macaddr;
    this.vendor = device.vendor;
    this.is_l3 = device.is_l3;
    this.ipaddr4 = device.ipaddr4;
    this.ipaddr6 = device.ipaddr6;
    this.device_class = device.device_class;
    this.default_name = device.default_name;
    this.custom_name = device.custom_name;
    this.cdp_name = device.cdp_name;
    this.dhcp_name = device.dhcp_name;
    this.netbios_name = device.netbios_name;
    this.dns_name = device.dns_name;
    this.custom_type = device.custom_type;
    this.analysis_level = device.analysis_level;
    this.analysis = device.analysis;
    this.on_watchlist = device.on_watchlist;
  }
};
