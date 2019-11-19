// Global.constants.js

const colors = require('colors/safe');

module.exports = Object.freeze({ Config: { ENV_FILE: ',/config.json',
  CSV_DIR: './data/csv',
  DB_DIR: './data/db' },
Icons: { Success: colors.green('[+]'),
  Info: colors.blue('[*]'),
  Warn: colors.yellow('[!]'),
  Error: colors.red('[x]') },
Types: { Command: 'ECA',
  Discover: 'EDA',
  Trace: 'ETA',
  Explore: 'EXA' },
Platforms: { Command: 'ecm',
  Discover: 'extrahop',
  Trace: 'eta',
  Explore: 'exa' },
Search: { Types: { Any: 'any',
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
  DiscoverTime: 'discover time' },
Filters: ['equals', 'contains', 'startsWith', 'endsWith'] },
Banner: colors.green(`                  888                   888
 .d88b.  888  888 888888 888d88 8888b.  88888b.   .d88b.  88888b.
d8P  Y8b 'Y8bd8P' 888    888P"     "88b 888 "88b d88""88b 888 "88b
88888888   X88K   888    888   .d888888 888  888 888  888 888  888
Y8b.     .d8""8b. Y88b.  888   888  888 888  888 Y88..88P 888 d88P
 "Y8888  888  888  "Y888 888   "Y888888 888  888  "Y88P"  88888P"
__________________________________________________________888_____
----------------------------------------------------------888-----`) });
