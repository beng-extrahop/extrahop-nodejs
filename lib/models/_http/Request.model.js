'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Request.model.js

var BaseObject = require('../../models/_base/BaseObject.model');
var Response = require('../../models/_http/Response.model');

var _require = require('../../constants/Global.constants'),
    Icons = _require.Icons;

var syncRequest = require('sync-request');

module.exports = function (_BaseObject) {
  _inherits(Request, _BaseObject);

  function Request(hostname, apikey) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Request);

    var _this = _possibleConstructorReturn(this, (Request.__proto__ || Object.getPrototypeOf(Request)).call(this));

    _this.hostname = hostname;
    _this.url = params.url || 'https://' + hostname + '/api/v1';
    _this.headers = { Authorization: 'ExtraHop apikey=' + apikey };

    _this.config = {
      cache: params.cache || 'file',
      gzip: params.gzip || true,
      timeout: params.timeout || 5000,
      retry: params.retry || true,
      retryDelay: params.retryDelay || 1000,
      maxRetries: params.maxRetries || 3
    };
    return _this;
  }

  _createClass(Request, [{
    key: 'send',
    value: function send(_ref) {
      var method = _ref.method,
          uri = _ref.uri,
          qs = _ref.qs,
          json = _ref.json;

      var headers = this.headers;
      var config = Object.assign({ headers: headers, qs: qs, json: json }, this.config);

      var response = {};

      try {
        response = syncRequest(method, this.url + uri, config);
        response.data = response.getBody('utf8');
      } catch (err) {
        response.error = err;
        console.log(Icons.Error + ' ' + err);
      }

      response.method = method;

      return new Response(response);
    }
  }, {
    key: 'get',
    value: function get(uri, query) {
      return this.send({ method: 'GET', uri: uri, qs: query });
    }
  }, {
    key: 'post',
    value: function post(uri, body) {
      return this.send({ method: 'POST', uri: uri, json: body });
    }
  }, {
    key: 'patch',
    value: function patch(uri, body) {
      return this.send({ method: 'PATCH', uri: uri, json: body });
    }
  }, {
    key: 'put',
    value: function put(uri, body) {
      return this.send({ method: 'PUT', uri: uri, json: body });
    }
  }, {
    key: 'delete',
    value: function _delete(uri, body) {
      return this.send({ method: 'DELETE', uri: uri, json: body });
    }
  }]);

  return Request;
}(BaseObject);
//# sourceMappingURL=Request.model.js.map