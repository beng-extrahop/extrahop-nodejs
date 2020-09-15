// Environment.model.js

const BaseObject = require('../_base/BaseObject.model');
const Appliance = require('./Appliance.model');
const ApplianceSet = require('./ApplianceSet.model');
const { Icons, Platforms } = require('../../constants/Global.constants');

module.exports = class Environment extends BaseObject {
  constructor(environment = {}) {
    super();
    this.name = environment.name;
    this.appliances = environment.appliances;
    this.eca = this.getECA();
    this.edas = this.getEDAs();
    this.eda = this.edas.length === 1 ? this.edas[0] : undefined;
    this.etas = this.getETAs();
    this.exas = this.getEXAs();
  }

  get({ type, hostname }) {
    if (hostname) {
      return new Appliance(this.appliances.find((appliance) => appliance.hostname === hostname));
    }
    if (type) {
      return new ApplianceSet(this.appliances.filter((appliance) => appliance.type === type));
    }

    return new ApplianceSet(this.appliances);
  }

  getECA() {
    const ecas = this.get({ type: 'ECA' });

    if (ecas.length > 1) {
      console.warn(`${Icons.Warn} Multiple ECA config entries detected. Returning first in list.`);
    }

    return ecas[0];
  }

  getEDAs() {
    return this.get({ type: 'EDA' });
  }

  getETAs() {
    return this.get({ type: 'ETA' });
  }

  getEXAs() {
    return this.get({ type: 'EXA' });
  }

  /**
  eca(hostname) {
    return this.get({ hostname });
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
  * */
};
