// BaseCtrl.controller.js

const Moment = require('moment-timezone');
const Utils = require('../utils/BaseUtil.util.js');
const { Config, Icons } = require('../constants/Global.constants');

module.exports = class BaseCtrl {
  constructor(appliance = {}) {
    this.appliance = appliance;
    this.utils = Utils;
    this.csvPath = [ Config.DATA_DIR, Config.CSV_DIR ].join('/');
    this.dbPath = [ Config.DATA_DIR, Config.DB_DIR ].join('/');
  }

  toString(options = {}) {
    return options.format ? JSON.stringify(this, null, 2) : JSON.stringify(this);
  }

  print() {
    console.info(this.toString());
  }

  printSuccess(count, type) {
    console.info(`${Icons.Success} Retrieved ${count} ${type} from ${this.appliance.host}`);
  }

  printError(type) {
    console.error(`${Icons.Error} Error retrieving ${type} from ${this.appliance.host}`);
  }

  printWarning(type) {
    console.warn(`${Icons.Warn} No ${type} returned from ${this.appliance.host}`);
  }

  // -------------------------------------
  // Utility Functions
  // -------------------------------------

  filter(results = [], params = {}) {
    const [ key ] = Object.keys(params);
    return results.filter(result => result[key] == params[key]);
  }

  parse(data = {}, subkey) {
    let parseData = data[subkey] || data;
    let cache = [];

    Object.keys(parseData).forEach(key => {
      if ( key.includes('timestamp') ) {
        parseData[key + '_fmt'] = Moment(parseData[key]).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
      }

      if ( parseData[key] instanceof Object ) {
        parseData[key] = parseData[key].value;
      }

      if ( parseData[key] instanceof Array ) {
        parseData[key] = parseData[key].length == 1 ? parseData[key][0] : parseData[key].join(',');
      }
    })

    // Object.keys(parseData).forEach(key => {
    //   if ( key === 'server' || key === 'client' ) {
    //     const discoveryId = parseData[key];

    //     if ( cache.some(item => item.startsWith(discoveryId)) ) {
    //       parseData[key] = cache.find(item => item.startsWith(discoveryId)).split(':')[1];
    //       console.log('Found server in cache:', discoveryId, parseData[key])
    //       return;
    //     }

    //     const getDevice = this.appliance.getDevices('discovery_id', discoveryId, 1);

    //     if ( getDevice.success ) {
    //       const deviceName = getDevice.data[0].display_name;
    //       console.log('Adding discovery ID to cache:', discoveryId, deviceName)

    //       cache.push(`${discoveryId}:${deviceName}`);
    //       parseData[key] = deviceName;
    //     }
    //   }
    // });

    return Object.assign(data, (subkey ? { [subkey]: parseData } : parseData));
  }

  process(results, type, options = {}) {
    if ( !options.suppress ) {
      if ( !results.success ) {
        return this.printError(type);
      }

      const subkey = options.subkey;
      const numResults = (results.data[subkey] || results.data || []).length;

      if ( !results.data || (results.data[subkey] || results.data).length == 0 ) {
        this.printWarning(type);
      } else {
        this.printSuccess(numResults, type);
      }
    }

    return results.data;
  }
}
