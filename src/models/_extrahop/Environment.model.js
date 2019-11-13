// Environment.model.js

const BaseObject = require('../../models/_base/BaseObjectSet.model');
const ApplianceSet = require('../../models/_extrahop/ApplianceSet.model');
const { Icons, Platforms, Types } = require('../../constants/Global.constants');

module.exports = class Environment extends BaseObject {
  constructor(environment = {}) {
    super();
    this.name = environment.name;
    this.appliances = new ApplianceSet(environment.appliances);
  }

  get({ type, platform, hostname }) {
    const appliances = this.appliances.filter(x => x.type == type || x.platform == platform);

    if ( hostname ) {
      return appliances.find(x => [x.hostname, x.host].includes(hostname));
    }
    else if ( type == 'ECA' ) {
      if ( appliances.length > 1 ) {
        console.warn(`${Icons.Warn} Multiple ECAs detected. Using ${appliances[0].hostname}`);
      }
      return appliances[0];
    }
    else {
      return appliances;
    }
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

}
