// Appliance.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const ApplianceSet = require('../models/appliances/ApplianceSet.model');
const { Config, Icons, Strings } = require('../constants/Global.constants');

module.exports = class ApplianceCtrl extends BaseCtrl {
	constructor(appliance) {
		super(appliance);
	}

  init() {
    try {
      this.appliances = new ApplianceSet(Config.hosts.filter(function(host) {
        return host.enabled;
      })).filter(function(appliance) {
        return appliance.active;
      });

      if ( !this.appliances || this.appliances.length === 0 ) {
        throw new Error();
      }
    }
    catch (error) {
      console.log(`${Icons.Error} No active hosts available. Exiting.\n`);
      process.exit();
    }

    console.log(`${Icons.Info} ${this.appliances.length} hosts available\n`);

    for ( let i in this.appliances ) {
      this[this.appliances[i].id] = this.appliances[i];
    }
  }

  getAllHosts() {
    return this.appliances;
  }

  getHostByID(id) {
    return this.get({
      'id': id
    })[0];
  }

  getHostByHostname(hostname) {
    return this.get({
      'hostname': hostname
    })[0];
  }

  getECA() {
    return this.get({
      'platform': Strings.Platforms.Command
    })[0];
  }

  getEDAs() {
    return this.get({
      'platform': Strings.Platforms.Discover
    });
  }

  getEXAs() {
    return this.get({
      'platform': Strings.Platforms.Explore
    });
  }

  getETAs() {
    return this.get({
      'platform': Strings.Platforms.Trace
    });
  }

}
