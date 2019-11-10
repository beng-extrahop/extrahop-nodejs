// Environment.model.js

const BaseObject = require('../../models/base/BaseObject.model');
const ApplianceSet = require('../../models/appliances/ApplianceSet.model');
const { Platforms, Types } = require('../../constants/Appliance.constants');

module.exports = class Environment extends BaseObject {
  constructor(environment = {}) {
    super(environment);
    this.name = environment.name;
    this.autodiscover = ( environment.autodiscover || false );
    this.appliances = new ApplianceSet(environment.appliances);

    this.eca = this.appliances.find(appliance => (appliance.type || '').toLowerCase() === 'eca');

    if ( this.appliances.length > 1 ) {
      this.edas = {};
      this.appliances
        .filter(appliance => appliance.type == Types.Discover || appliance.platform == Platforms.Discover)
        .forEach(appliance => {
          this.edas[appliance.id] = appliance;
        });
    }
  }

  get(params = {}) {
    const { key, value } = params;
    return this.appliances.find(appliance => appliance[key] == value)
  }

  getECA() {
    return this.appliances.filter(appliance => appliance.platform == Platforms.Command)[0];
  }

  getEDAs() {
    return this.appliances.filter(appliance => appliance.platform == Platforms.Discover);
  }

  getEXAs() {
    return this.appliances.filter(appliance => appliance.platform == Platforms.Explore);
  }

  getETAs() {
    return this.appliances.filter(appliance => appliance.platform == Platforms.Trace);
  }
}
