// Appliance.controller.js

const BaseCtrl = require('../../controllers/_base/BaseCtrl.controller');
const ApplianceSet = require('../../models/appliance/ApplianceSet.model');
const { Config, Icons, Strings } = require('../../constants/Global.constants');

module.exports = class ApplianceCtrl extends BaseCtrl {
  init() {
    try {
      this.appliances = new ApplianceSet(
        Config.hosts.filter(host => host.enabled)
      ).filter(appliance => appliance.active);

      if (!this.appliances || this.appliances.length === 0) {
        throw new Error();
      }
    }
    catch (error) {
      console.info(`${Icons.Error} No active hosts available. Exiting.\n`);
    }
  }

  getAllHosts() {
    return this.appliances;
  }

  getHostByID(id) {
    return this.get({ id })[0];
  }

  getHostByHostname(hostname) {
    return this.get({ hostname })[0];
  }

  getECA() {
    return this.get({ platform: Strings.Platforms.Command })[0];
  }

  getEDAs() {
    return this.get({ platform: Strings.Platforms.Discover });
  }

  getEXAs() {
    return this.get({ platform: Strings.Platforms.Explore });
  }

  getETAs() {
    return this.get({ platform: Strings.Platforms.Trace });
  }
};
