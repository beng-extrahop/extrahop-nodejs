// BaseCtrl.controller.js

const Crypto = require('crypto');
const Moment = require('moment-timezone');
const { Config, Icons } = require('../constants/Global.constants');

module.exports = class BaseCtrl {
  constructor(appliance = {}) {
    this.appliance = appliance;
    this.csvPath = [ Config.DATA_DIR, Config.CSV_DIR ].join('/');
    this.dbPath = [ Config.DATA_DIR, Config.DB_DIR ].join('/');
  }

  toString(options = {}) {
    return options.format ? JSON.stringify(this, null, 2) : JSON.stringify(this);
  }

  print() {
    console.log(this.toString());
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


  generateId(params) {
    if ( !params ) {
      return Date.now().toString(36);
    } else {
      return Crypto.createHash('md5').update(JSON.stringify(params), 'utf-8').digest('hex');
    }
  }

  filter(results = [], params = {}) {
    const [ key ] = Object.keys(params);
    return results.filter(result => result[key] == params[key]);
  }

  parse(data = {}, subkey) {
    let parseData = data[subkey] || data;

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
