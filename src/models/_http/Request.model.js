// Request.model.js

const BaseObject = require('../../models/_base/BaseObject.model');
const Response = require('../../models/_http/Response.model');
const { Icons } = require('../../constants/Global.constants');

const SyncRequest = require('sync-request');

module.exports = class Request extends BaseObject {

  constructor(hostname, apikey, params = {}) {
    super();
    this.hostname = hostname;
    this.url = params.url || `https://${hostname}/api/v1`;
    this.headers = { Authorization: `ExtraHop apikey=${apikey}` };

    this.config = {
      cache: params.cache           || 'file',
      gzip: params.gzip             || true,
      timeout: params.timeout       || 5000,
      retry: params.retry           || true,
      retryDelay: params.retryDelay || 1000,
      maxRetries: params.maxRetries || 3
    };
  }

  send({ method, uri, qs, json }) {
    const headers = this.headers;
    const config = Object.assign({ headers, qs, json }, this.config);

    let response = {};

    try {
      response = SyncRequest(method, this.url + uri, config);
      response.data = response.getBody('utf8');
    }
    catch (err) {
      response.error = err;
      console.log(`${Icons.Error} ${err}`);
    }

    response.method = method;
    return new Response(response);
  }

  get(uri, query) {
    return this.send({ method: 'GET', uri, qs: query });
  }

  post(uri, body) {
    return this.send({ method: 'POST', uri, json: body });
  }

  patch(uri, body) {
    return this.send({ method: 'PATCH', uri, json: body });
  }

  put(uri, body) {
    return this.send({ method: 'PUT', uri, json: body });
  }

  delete(uri, body) {
    return this.send({ method: 'DELETE', uri, json: body });
  }
}
