// CustomizationStatus.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class CustomizationStatus extends BaseObject {
  constructor(customizationStatus = {}) {
    super(customizationStatus);{
    this.did_last_succeed = customizationStatus.did_last_succeed;
    this.last_attempt_time = customizationStatus.last_attempt_time;
    this.last_success_time = customizationStatus.last_success_time;
  }
}
