// Node.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Node = require('../models/node/Node.model');
const NodeSet = require('../models/node/NodeSet.model');

module.exports = class NodeCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(node) {
    return node ? new Node(this.getNode(node)) : new NodeSet(this.getNodes());
  }

  update(node, data) {
    return this.patchNode(node, data);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getNodes() {
    return this.process(this.appliance.getNodes(), 'nodes');
  }

  getNode(node) {
    return this.process(this.appliance.getNode(node.id), 'node');
  }

  patchNode(node, data) {
    return this.process(this.appliance.patchNode(node, data), 'node');
  }
};
