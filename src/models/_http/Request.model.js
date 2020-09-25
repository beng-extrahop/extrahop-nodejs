// Request.model.js

const SyncRequest = require('sync-request');
const BaseObject = require('../_base/BaseObject.model');
const Response = require('./Response.model');
const { Icons } = require('../../constants/Global.constants');

module.exports = class Request extends BaseObject {
  constructor(hostname, apikey, params = {}) {
    super();

    this.hostname = hostname;
    this.url = params.url || `https://${hostname}/api/v1`;
    this.headers = { Authorization: `ExtraHop apikey=${apikey}` };

    this.config = {
      cache: params.cache || 'file',
      gzip: params.gzip || false,
      timeout: params.timeout || 5000,
      retry: params.retry || true,
      retryDelay: params.retryDelay || 1000,
      maxRetries: params.maxRetries || 3,
    };
  }

  send(request) {
    let response = {};

    try {
      response = SyncRequest(request.method, this.url + request.uri, {
        headers: this.headers,
        qs: request.qs,
        json: request.json,
        ...this.config,
      });

      response.data = response.getBody('utf8');
    } catch (err) {
      response.error = err;
      console.log(`${Icons.Error} ${err}`);
    }

    return new Response({ ...response, method: request.method });
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
};
