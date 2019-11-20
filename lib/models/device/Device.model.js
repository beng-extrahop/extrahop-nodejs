'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Device.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(Device, _BaseObject);

  function Device() {
    var device = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Device);

    var _this = _possibleConstructorReturn(this, (Device.__proto__ || Object.getPrototypeOf(Device)).call(this, device));

    _this.name = device.display_name;
    _this.mod_time = device.mod_time;
    _this.node_id = device.node_id;
    _this.id = device.id;
    _this.extrahop_id = device.extrahop_id;
    _this.discovery_id = device.discovery_id;
    _this.display_name = device.display_name;
    _this.description = device.description;
    _this.user_mod_time = device.user_mod_time;
    _this.discover_time = device.discover_time;
    _this.vlanid = device.vlanid;
    _this.parent_id = device.parent_id;
    _this.macaddr = device.macaddr;
    _this.vendor = device.vendor;
    _this.is_l3 = device.is_l3;
    _this.ipaddr4 = device.ipaddr4;
    _this.ipaddr6 = device.ipaddr6;
    _this.device_class = device.device_class;
    _this.default_name = device.default_name;
    _this.custom_name = device.custom_name;
    _this.cdp_name = device.cdp_name;
    _this.dhcp_name = device.dhcp_name;
    _this.netbios_name = device.netbios_name;
    _this.dns_name = device.dns_name;
    _this.custom_type = device.custom_type;
    _this.analysis_level = device.analysis_level;
    _this.analysis = device.analysis;
    _this.on_watchlist = device.on_watchlist;
    return _this;
  }

  return Device;
}(BaseObject);
//# sourceMappingURL=Device.model.js.map