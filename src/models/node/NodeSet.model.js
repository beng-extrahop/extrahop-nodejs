// NodeSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Node = require('./Node.model');

module.exports = class NodeSet extends BaseObjectSet {
  constructor(nodes = []) {
    super(Array.from(nodes).map((node) => new Node(node)));
  }
};
