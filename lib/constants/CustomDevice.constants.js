'use strict';

// Device.constants.js

module.exports = Object.freeze({
  Search: {
    Filters: ['equals', 'contains', 'startsWith', 'endsWith'],
    Fields: ['name', 'discovery_id', 'ipaddr', 'macaddr', 'vendor', 'tag', 'activity', 'node', 'vlan', 'discover_time', 'role', 'dns_name', 'dhcp_name', 'netbios_name', 'cdp_name', 'custom_name', 'software'],
    Operators: ['>', '<', '<=', '>=', '=', '!=', 'startswith', 'and', 'or', 'not', 'exists', 'not_exists', '~', '!~'],
    Types: {
      Any: 'any',
      Name: 'name',
      ExtrahopId: 'extrahop_id',
      Author: 'author',
      Type: 'type'
    }
  }
});
//# sourceMappingURL=CustomDevice.constants.js.map