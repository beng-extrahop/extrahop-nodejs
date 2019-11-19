// BaseCtrl.controller.js

const Utils = require('../../utils/BaseUtil.util.js');
const { Config, Icons } = require('../../constants/Global.constants');

const moment = require('moment-timezone');

module.exports = class BaseCtrl {
  constructor(appliance) {
    this.appliance = appliance;
    this.utils = Utils;
    this.csvPath = [Config.DATA_DIR, Config.CSV_DIR].join('/');
    this.dbPath = [Config.DATA_DIR, Config.DB_DIR].join('/');
  }

  toString(config = {}) {
    return JSON.stringify(this, null, (config.format ? 2 : null));
  }

  print(options = {}) {
    console.info(this.toString(options));
  }

  printSuccess(method, type, count) {
    if (method === 'GET') {
      console.info(`${Icons.Success} Retrieved ${count} ${type} from ${this.appliance.host}`);
    }
    else if (method === 'POST') {
      console.info(`${Icons.Success} Posted ${count} ${type} to ${this.appliance.host}`);
    }
    else if (method === 'PATCH') {
      console.info(`${Icons.Info} Modified ${type} on ${this.appliance.host}`);
    }
    else if (method === 'PATCH') {
      console.info(`${Icons.Info} Updated ${type} on ${this.appliance.host}`);
    }
    else if (method === 'DELETE') {
      console.info(`${Icons.Warn} Deleted ${type} from ${this.appliance.host}`);
    }
  }

  printError(method, type) {
    if (method === 'GET') {
      console.info(`${Icons.Error} Error retrieving ${type} from ${this.appliance.host}`);
    }
    else if (method === 'POST') {
      console.info(`${Icons.Error} Error posting ${type} to ${this.appliance.host}`);
    }
    else if (method === 'PATCH') {
      console.info(`${Icons.Error} Error modifying ${type} on ${this.appliance.host}`);
    }
    else if (method === 'PATCH') {
      console.info(`${Icons.Error} Error updating ${type} on ${this.appliance.host}`);
    }
    else if (method === 'DELETE') {
      console.info(`${Icons.Error} Error deleting ${type} from ${this.appliance.host}`);
    }
  }

  printWarning(method, type) {
    if (method === 'GET') {
      console.info(`${Icons.Warn} Warning: retrieving ${type} from ${this.appliance.host}`);
    }
    else if (method === 'POST') {
      console.info(`${Icons.Warn} Warning: posting ${type} to ${this.appliance.host}`);
    }
    else if (method === 'PATCH') {
      console.info(`${Icons.Warn} Warning: modifying ${type} on ${this.appliance.host}`);
    }
    else if (method === 'PATCH') {
      console.info(`${Icons.Warn} Warning: updating ${type} on ${this.appliance.host}`);
    }
    else if (method === 'DELETE') {
      console.info(`${Icons.Warn} Warning: deleting ${type} from ${this.appliance.host}`);
    }
  }

  // -------------------------------------
  // Utility Functions
  // -------------------------------------

  filter(results = [], params = {}) {
    const [key] = Object.keys(params);
    return results.filter(result => result[key] === params[key]);
  }

  parse(data = {}, subkey) {
    const parseData = data[subkey] || data;

    Object.keys(parseData).forEach(key => {
      if (key.includes('timestamp')) {
        parseData[`${key}_fmt`] = moment(parseData[key]).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
      }

      if (parseData[key] instanceof Object) {
        parseData[key] = parseData[key].value;
      }

      if (parseData[key] instanceof Array) {
        parseData[key] = parseData[key].length === 1 ? parseData[key][0] : parseData[key].join(',');
      }
    });

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

    return Object.assign(data, subkey ? { [subkey]: parseData } : parseData);
  }

  process(results = {}, type, options = {}) {
    if (options.suppress) {
      return results.data;
    }

    let data = results.data;
    const { method, success } = results;
    const count = data.length;

    if (['PATCH', 'PUT', 'DELETE'].includes(method)) {
      if (!success) {
        this.printError(method, type);
      }
      else {
        this.printSuccess(method, type);
      }
    }
    else if (['GET', 'POST'].includes(method)) {
      if (!success) {
        this.printSuccess(method, type, count);
        return results.data;
      }

      data = options.subkey ? results.data[options.subkey] : results.data;

      if ((data || []).length === 0) {
        this.printWarning(method, type);
      }
      else {
        this.printSuccess(method, type, count);
      }

      return results.data;
    }

    return null;
  }
};
