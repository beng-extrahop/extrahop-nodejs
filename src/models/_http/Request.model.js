// Request.model.js

const SyncRequest = require('sync-request');
const BaseObject = require('../_base/BaseObject.model');
const Response = require('./Response.model');
const { Icons } = require('../../constants/Global.constants');

module.exports = class Request extends BaseObject {
  constructor(hostname, apikey, params = {}) {
    super();

    this.hostname = hostname;
    this.apikey = apikey;
    this.url = params.url || `https://${hostname}/api/v1`;
    this.headers = { Authorization: `ExtraHop apikey=${this.apikey}` };

    this.config = {
      cache: params.cache || 'file',
      gzip: params.gzip || true,
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

      response.data = JSON.parse(response.getBody('utf-8'));
      response.success = true;
    } catch (err) {
      const error = (response.body || '').toString('utf-8');

      response.data = error.startsWith('{') ? JSON.parse(error).error_message : error;
      response.error = `[HTTP ${response.statusCode}] ${response.data.split('\n')[0]}`;
      response.success = false;
    }

    delete response.body;
    delete response.headers;

    return new Response({ method: request.method, ...response });
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
