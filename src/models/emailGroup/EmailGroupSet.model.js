// EmailGroupSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const EmailGroup = require('./EmailGroup.model');

module.exports = class EmailGroupSet extends BaseObjectSet {
  constructor(emailGroups = []) {
    super(Array.from(emailGroups).map((emailGroup) => new EmailGroup(emailGroup)));
  }
};
