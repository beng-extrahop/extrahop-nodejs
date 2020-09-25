// Node.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Node = require('../models/node/Node.model');
const NodeSet = require('../models/node/NodeSet.model');

const OBJECT_NAME = 'node';

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
    return this.process(this.appliance.getNodes(), OBJECT_NAME);
  }

  getNode(node) {
    return this.process(this.appliance.getNode(node.id), OBJECT_NAME);
  }

  patchNode(node, data) {
    return this.process(this.appliance.patchNode(node, data), OBJECT_NAME);
  }
};
