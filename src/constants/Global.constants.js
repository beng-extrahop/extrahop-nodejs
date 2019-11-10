// Global.constants.js

const Colors = require('colors/safe');

module.exports = Object.freeze({
	Config: {
		ENV_FILE: ',/config.json',
    DATA_DIR: './data',
    CSV_DIR: 'csv',
    DB_DIR: 'db'
	},
	Icons: {
		Success: Colors.green('[]'),
		Info: Colors.blue('[]'),
		Warn: Colors.yellow('[]'),
		Error: Colors.red('[]'),
	},
  Search: {
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
  }
});
