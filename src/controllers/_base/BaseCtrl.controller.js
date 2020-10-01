// BaseCtrl.controller.js

const moment = require('moment-timezone');
const Request = require('../../models/_http/Request.model');
const { Config, Icons } = require('../../constants/Global.constants');

module.exports = class BaseCtrl {
  constructor(appliance) {
    this.appliance = appliance;
    this.host = this.appliance.hostname;
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

    let message = Icons.Success;

    if (method === 'GET') message += ` Retrieved ${count} ${type} from ${this.host}`;
    else if (method === 'POST') message += ` Posted ${count} ${type} to ${this.host}`;
    else if (method === 'PATCH') message += ` Modified ${type} on ${this.host}`;
    else if (method === 'PUT') message += ` Updated ${type} on ${this.host}`;
    else if (method === 'DELETE') message += ` Deleted ${type} from ${this.host}`;

    console.info(message);
  }

  printWarning(method, type, count = 0) {
    if (type.endsWith('y')) type = `${type.substring(0, type.length - 1)}ies`;
    else if (!type.endsWith('s')) type += 's';

    let message = Icons.Warn;

    if (method === 'GET') message += ` Retrieved ${count} ${type} from ${this.host}`;
    else if (method === 'POST') message += ` Posted ${count} ${type} to ${this.host}`;
    else if (method === 'PATCH') message += ` Modified ${count} ${type} on ${this.host}`;
    else if (method === 'PUT') message += ` Updated ${count} ${type} on ${this.host}`;
    else if (method === 'DELETE') message += ` Deleted ${count} ${type} from ${this.host}`;

    console.warn(message);
  }

  printError(method, type, error) {
    if (type.endsWith('y') && !type.endsWith('key')) type = `${type.substring(0, type.length - 1)}ies`;
    else if (!type.endsWith('s')) type += 's';

    let message = Icons.Error;
    error = `\n    - ${error}`;

    if (method === 'GET') message += ` Error retrieving ${type} from ${this.host} ${error}`;
    else if (method === 'POST') message += ` Error posting ${type} to ${this.host} ${error}`;
    else if (method === 'PATCH') message += ` Error modifying ${type} on ${this.host} ${error}`;
    else if (method === 'PUT') message += ` Error updating ${type} on ${this.host} ${error}`;
    else if (method === 'DELETE') message += ` Error deleting ${type} from ${this.host} ${error}`;

    console.error(message);
  }

  // -------------------------------------
  // Utility
  // -------------------------------------

  process(results, type, options = {}) {
    let {
      data, method, success, error,
    } = results;

    if (!success) {
      this.printError(method, type, error);
      return;
    }

    if (['PATCH', 'PUT', 'DELETE'].includes(method)) {
      this.printSuccess(method, type);
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

          cache.push(`${discoveryId} ${deviceName}`);
          parseData[key] = deviceName;
        }
      }
    });
    * */
};
