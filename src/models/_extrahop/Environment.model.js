// Environment.model.js

const BaseObject = require('../../models/_base/BaseObject.model');
const Appliance = require('../../models/_extrahop/Appliance.model');
const ApplianceSet = require('../../models/_extrahop/ApplianceSet.model');
const { Icons, Platforms } = require('../../constants/Global.constants');

module.exports = class Environment extends BaseObject {
  constructor(environment = {}) {
    super();
    this.name = environment.name;
    this.appliances = environment.appliances;
  }

  get({ type, platform, hostname }) {
    if (hostname) {
      return new Appliance(this.appliances.find(x => [x.hostname, x.host].includes(hostname)));
    }

    if (type === 'ECA') {
      const ecas = this.appliances.filter(x => x.type === type || x.platform === platform);

      if (ecas.length > 1) {
        console.warn(`${Icons.Warn} Multiple ECAs detected. Using host: ${ecas[0].hostname}`);
      }

      return new Appliance(ecas[0]);
    }

    return new ApplianceSet(...this.appliances.filter(x => x.type === type || x.platform === platform));
  }

  eca(hostname) {
    return this.get({ type: 'ECA', platform: Platforms.Command, hostname });
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
};
