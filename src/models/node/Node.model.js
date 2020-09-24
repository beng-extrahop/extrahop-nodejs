// Node.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Node extends BaseObject {
  constructor(node = {}) {
    super();
    Object.keys(node).forEach((key) => this[key] = node[key]);
  }
};
