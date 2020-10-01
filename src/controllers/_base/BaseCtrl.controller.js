// BaseCtrl.controller.js

const moment = require('moment-timezone');
const { Config } = require('../../constants/Global.constants');
const { Icons } = require('../../constants/Global.constants');
const Request = require('../../models/_http/Request.model');

module.exports = class BaseCtrl {
  constructor(appliance) {
    this.appliance = appliance;
  }

  toString(config = {}) {
    return JSON.stringify(this, null, (config.format ? 2 : null));
  }

  print(options = {}) {
    console.info(this.toString(options));
  }

  printSuccess(method, type, count = 0) {
    if (count > 1 && type.endsWith('y')) type = `${type.substring(0, type.length - 1)}ies`;
    else if (count === 0 || (count > 1 && !type.endsWith('s'))) type += 's';

    if (method === 'GET') {
      console.info(`${Icons.Success} Retrieved ${count} ${type} from ${this.appliance.hostname}`);
    } else if (method === 'POST') {
      console.info(`${Icons.Success} Posted ${count} ${type} to ${this.appliance.hostname}`);
    } else if (method === 'PATCH') {
      console.info(`${Icons.Info} Modified ${type} on ${this.appliance.hostname}`);
    } else if (method === 'PUT') {
      console.info(`${Icons.Info} Updated ${type} on ${this.appliance.hostname}`);
    } else if (method === 'DELETE') {
      console.info(`${Icons.Info} Deleted ${type} from ${this.appliance.hostname}`);
    }
  }

  printError(method, type, message) {
    if (type.endsWith('y') && !type.endsWith('key')) type = `${type.substring(0, type.length - 1)}ies`;
    else if (!type.endsWith('s')) type += 's';

    const spacer = '\n    - ';

    if (method === 'GET') {
      console.error(`${Icons.Error} Error retrieving ${type} from ${this.appliance.hostname}:${spacer}${message}`);
    } else if (method === 'POST') {
      console.error(`${Icons.Error} Error posting ${type} to ${this.appliance.hostname}:${spacer}${message}`);
    } else if (method === 'PATCH') {
      console.error(`${Icons.Error} Error modifying ${type} on ${this.appliance.hostname}:${spacer}${message}`);
    } else if (method === 'PUT') {
      console.error(`${Icons.Error} Error updating ${type} on ${this.appliance.hostname}:${spacer}${message}`);
    } else if (method === 'DELETE') {
      console.error(`${Icons.Error} Error deleting ${type} from ${this.appliance.hostname}:${spacer}${message}`);
    }
  }

  printWarning(method, type, count = 0) {
    if (type.endsWith('y')) type = `${type.substring(0, type.length - 1)}ies`;
    else if (!type.endsWith('s')) type += 's';

    if (method === 'GET') {
      console.warn(`${Icons.Warn} Retrieved ${count} ${type} from ${this.appliance.hostname}`);
    } else if (method === 'POST') {
      console.warn(`${Icons.Warn} Posted ${count} ${type} to ${this.appliance.hostname}`);
    } else if (method === 'PATCH') {
      console.warn(`${Icons.Warn} Modified ${count} ${type} on ${this.appliance.hostname}`);
    } else if (method === 'PUT') {
      console.warn(`${Icons.Warn} Updated ${count} ${type} on ${this.appliance.hostname}`);
    } else if (method === 'DELETE') {
      console.warn(`${Icons.Warn} Deleted ${count} ${type} from ${this.appliance.hostname}`);
    }
  }

  // -------------------------------------
  // Utility
  // -------------------------------------

  process(results, type, options = {}) {
    let {
      data, method, success, message,
    } = results;

    if (!success) {
      this.printError(method, type, message);
    } else if (['PATCH', 'PUT', 'DELETE'].includes(method)) {
      if (!success) {
        this.printError(method, type);
      } else {
        this.printSuccess(method, type);
      }
    } else if (['GET', 'POST'].includes(method)) {
      data = options.subkey ? data[options.subkey] : data;

      if (data instanceof Array && data.length) {
        this.printSuccess(method, type, data.length);
      } else if (data instanceof Array && !data.length) {
        this.printWarning(method, type, 0);
      } else {
        this.printSuccess(method, type, 1);
      }
    }

    return results.data;
  }

  filter(results = [], params = {}) {
    const [key] = Object.keys(params);
    return results.filter((result) => result[key] === params[key]);
  }

  parse(data = {}, subkey) {
    const parseData = data[subkey] || data;

    Object.keys(parseData).forEach((key) => {
      if (key.includes('timestamp')) {
        parseData[`${key}_fmt`] = moment(parseData[key]).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
      }

      if (parseData[key] instanceof Array) {
        parseData[key] = parseData[key].length === 1 ? parseData[key][0] : parseData[key].join(',');
      } else if (parseData[key] instanceof Object) {
        parseData[key] = parseData[key].value;
      }
    });

    return Object.assign(data, subkey ? { [subkey]: parseData } : parseData);
  }

  /** Object.keys(parseData).forEach(key => {
      if ( key === 'server' || key === 'client' ) {
        const discoveryId = parseData[key];

        if ( cache.some(item => item.startsWith(discoveryId)) ) {
          parseData[key] = cache.find(item => item.startsWith(discoveryId)).split(':')[1];
          console.log('Found server in cache:', discoveryId, parseData[key])
          return;
        }

        const getDevice = this.appliance.getDevices('discovery_id', discoveryId, 1);

        if ( getDevice.success ) {
          const deviceName = getDevice.data[0].display_name;
          console.log('Adding discovery ID to cache:', discoveryId, deviceName)

          cache.push(`${discoveryId}:${deviceName}`);
          parseData[key] = deviceName;
        }
      }
    });
    * */
};
