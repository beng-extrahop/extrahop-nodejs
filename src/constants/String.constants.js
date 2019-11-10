// String.constants.js

const colors = require('colors/safe');

const Appliance = {
	Platform: {
		Command: 'ecm',
		Discover: 'extrahop',
		Trace: 'eta',
		Explore: 'exa',
	},
};

const Banner = {
	Default: colors.green(`                  888                   888
 .d88b.  888  888 888888 888d88 8888b.  88888b.   .d88b.  88888b.
d8P  Y8b 'Y8bd8P' 888    888P"     "88b 888 "88b d88""88b 888 "88b
88888888   X88K   888    888   .d888888 888  888 888  888 888  888
Y8b.     .d8""8b. Y88b.  888   888  888 888  888 Y88..88P 888 d88P
 "Y8888  888  888  "Y888 888   "Y888888 888  888  "Y88P"  88888P"
__________________________________________________________888_____
----------------------------------------------------------888-----`)
};

const Config = {
	File: './config.toml',
  DATA_DIR: './data/db',
  CSV_DIR: './data/csv'
};

const Dashboard = {
	Sharing: {
		Anyone: 'anyone',
		Groups: 'groups',
		Users: 'users',
	},
};

const Icon = {
	Success: colors.green(' '),
	Info: colors.blue(' '),
	Warn: colors.yellow(' '),
	Error: colors.red(' '),
};

const Platforms = {
	Discover: 'EDA',
	Trace: 'ETA',
	Explore: 'EXA',
	Command: 'ECA'
};

const Search = {
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
	},
	Filters: ['equals', 'contains', 'startsWith', 'endsWith'],
};

const Spacer = {
	Default: '' + colors.gray('.'),
};

const Trigger = {
	Records: {
		Key: 'script',
		Value: 'commitRecord(',
	}
}

module.exports = { Appliance, Banner, Config, Dashboard, Icon, Platforms, Search, Spacer, Trigger }
