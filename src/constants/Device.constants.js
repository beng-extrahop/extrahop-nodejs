// Device.constants.js

module.exports = Object.freeze({
	Search: {
		Filters: ['equals', 'contains', 'startsWith', 'endsWith'],
		Fields: ['name', 'discovery_id', 'ipaddr', 'macaddr', 'vendor', 'tag', 'activity', 'node', 'vlan', 'discover_time', 'role', 'dns_name', 'dhcp_name', 'netbios_name', 'cdp_name', 'custom_name', 'software'],
		Operators: ['>', '<', '<=', '>=', '=', '!=', 'startswith', 'and', 'or', 'not', 'exists', 'not_exists', '~', '!~'],
		Types: {
			Any: 'any',
			Name: 'name',
			DiscoveryId: 'discovery_id',
			IpAddress: 'ip address',
			MacAddress: 'mac address',
			Vendor: 'vendor',
			Type: 'type',
			Tag: 'tag',
			Activity: 'activity',
			Node: 'node',
			Vlan: 'vlan',
			DiscoverTime: 'discover time',
		}
	}
});
