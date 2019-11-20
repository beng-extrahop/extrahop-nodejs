'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Bundle.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Bundle = require('../models/bundle/Bundle.model');
var BundleSet = require('../models/bundle/BundleSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(BundleCtrl, _BaseCtrl);

  function BundleCtrl() {
    _classCallCheck(this, BundleCtrl);

    return _possibleConstructorReturn(this, (BundleCtrl.__proto__ || Object.getPrototypeOf(BundleCtrl)).apply(this, arguments));
  }

  _createClass(BundleCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(bundle) {
      return bundle ? new Bundle(this.getBundle(bundle)) : new (Function.prototype.bind.apply(BundleSet, [null].concat(_toConsumableArray(this.getBundles()))))();
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.postBundle(this.build(data));
    }
  }, {
    key: 'update',
    value: function update(bundle, data) {
      return this.patchBundle(bundle, data);
    }
  }, {
    key: 'delete',
    value: function _delete(bundle) {
      return this.deleteBundle(bundle);
    }
  }, {
    key: 'apply',
    value: function apply(bundle) {
      return this.postBundleApply(bundle);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getBundles',
    value: function getBundles() {
      return this.process(this.appliance.getBundles(), 'bundles');
    }
  }, {
    key: 'getBundle',
    value: function getBundle(bundle) {
      return this.process(this.appliance.getBundle(bundle.id), 'bundle');
    }
  }, {
    key: 'postBundle',
    value: function postBundle(bundle) {
      return this.process(this.appliance.postBundle(bundle), 'bundle');
    }
  }, {
    key: 'deleteBundle',
    value: function deleteBundle(id) {
      return this.process(this.appliance.deleteBundle(id), 'bundle');
    }

    // -------------------------------------
    // Apply Functions
    // -------------------------------------

  }, {
    key: 'postBundleApply',
    value: function postBundleApply(bundle) {
      return this.process(this.appliance.postBundleApply(bundle.id), 'bundle apply');
    }
  }]);

  return BundleCtrl;
}(BaseCtrl);
//# sourceMappingURL=Bundle.controller.js.map