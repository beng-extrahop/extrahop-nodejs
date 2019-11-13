// Environment.model.js

const BaseObject = require('../../models/_base/BaseObjectSet.model');
const ApplianceSet = require('../../models/_extrahop/ApplianceSet.model');
const { Platforms, Types } = require('../../constants/Appliance.constants');

module.exports = class Environment extends BaseObject {
  constructor(environment = {}) {
    super();
    this.name = environment.name;
    this.appliances = new ApplianceSet(environment.appliances);
  }

  get({ type, platform, hostname }) {
    const appliances = this.appliances.filter(x => x.type == type || x.platform == platform);
    return hostname ? appliances.find(x => x.hostname == hostname) : appliances;
  }

  eca() {
    return this.get({ type: 'ECA', platform: Platforms.Command })[0];
  }

  eda(hostname) {
    return this.get({ type: 'EDA', platform: Platforms.Discover, hostname });
  }

  etas(hostname) {
    return this.get({ type: 'ETA', platform: Platforms.Trace, hostname });
  }

  exa(hostname) {
    return this.get({ type: 'EXA', platform: Platforms.Explore, hostname });
  }

}
