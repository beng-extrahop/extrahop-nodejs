// Environment.model.js

const BaseObject = require('../../models/_base/BaseObjectSet.model');
const ApplianceSet = require('../../models/_extrahop/ApplianceSet.model');
const { Platforms, Types } = require('../../constants/Appliance.constants');

module.exports = class Environment extends BaseObject {
  constructor(environment = {}) {
    super();
    this.name = environment.name;
    this.appliances = new ApplianceSet(environment.appliances);
    this.eca = this.getECA();

    if ( this.appliances.length > 1 ) {
      this.eda = this.getEDAs();
      this.eta = this.getETAs();
      this.exa = this.getEXAs();
    }
  }

  get(params = {}) {
    const { key, value } = params;
    return this.appliances.find(appliance => appliance[key] == value)
  }

  getECA() {
    return this.appliances.find(x => x.platform == Platforms.Command || x.type == Types.Command);
  }

  getEDAs() {
    return this.appliances.filter(x => x.platform == Platforms.Discover || x.type == Types.Discover);
  }

  getEXAs() {
    return this.appliances.filter(x => x.platform == Platforms.Explore || x.type == Types.Explore);
  }

  getETAs() {
    return this.appliances.filter(x => x.platform == Platforms.Trace || x.type == Types.Trace);
  }
}
