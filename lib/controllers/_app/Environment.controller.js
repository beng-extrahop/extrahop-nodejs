'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Environment.controller.js

module.exports = function () {
  function EnvironmentCtrl(environment) {
    _classCallCheck(this, EnvironmentCtrl);

    this.environment = environment;
  }

  _createClass(EnvironmentCtrl, [{
    key: 'get',
    value: function get(platform) {
      return this.appliances.filter(function (appliance) {
        return appliance.platform === (platform || appliance.platform);
      });
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return this.get(platform);
    }
  }, {
    key: 'getECA',
    value: function getECA() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ecm';

      return this.get(platform);
    }
  }, {
    key: 'getEDAs',
    value: function getEDAs() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'extrahop';

      return this.get(platform);
    }
  }, {
    key: 'getEXAs',
    value: function getEXAs() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'exa';

      return this.get(platform);
    }
  }, {
    key: 'getETAs',
    value: function getETAs() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'eta';

      return this.get(platform);
    }
  }]);

  return EnvironmentCtrl;
}();
//# sourceMappingURL=Environment.controller.js.map