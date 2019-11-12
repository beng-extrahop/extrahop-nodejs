// Request.model.js

const BaseObject = require('../../models/_base/BaseObject.model');
const Response = require('../../models/_http/Response.model');
const httpRequest = require('sync-request');

module.exports = class Request extends BaseObject {

  constructor(hostname, apikey, params = {}) {
    super();
    this.hostname = hostname;
    this.apikey = apikey;
    this.url = params.url || `https://${this.hostname}/api/v1`;
    this.authHeader = `ExtraHop apikey=${this.apikey}`;

    this.config = {
      cache: params.cache           || 'file',
      gzip: params.gzip             || true,
      timeout: params.timeout       || 3000,
      retry: params.retry           || true,
      retryDelay: params.retryDelay || 1000,
      maxRetries: params.maxRetries || 3
    };
  }

  buildConfig({ query, body }) {
    const headers = {
      'Authorization': this.authHeader,
      'Content-Length': body ? Buffer.byteLength(JSON.stringify(body)) : undefined
    };

    return Object.assign({}, this.config, { headers, qs: query, json: body });
  }

  buildRequest(params = {}) {
    const { method, uri, query, body } = params;
    const config = this.buildConfig({ query, body });

    return Object.assign({}, params, { config, url: this.url + uri });
  }

  send(request = {}) {
    const { method, url, config } = request;
    let response, data, error;

    try {
      response = httpRequest(method, url, config);
      data = JSON.parse(response.getBody('utf8'));
    }
    catch (err) {
      error = err;
      console.error(error);
    }

    return new Response({ response, data, error });
  }

  get(uri, query) {
    const request = this.buildRequest({ method: 'GET', uri, query });
    return this.send(request);
  }

  post(uri, body) {
    const request = this.buildRequest({ method: 'POST', uri, body });
    return this.send(request);
  }

  patch(uri, body) {
    const request = this.buildRequest({ method: 'PATCH', uri, body });
    return this.send(request);
  }

  put(uri, body) {
    const request = this.buildRequest({ method: 'PUT', uri, body });
    return this.send(request);
  }

  delete(uri, body) {
    const request = this.buildRequest({ method: 'DELETE', uri, body });
    return this.send(request);
  }
}
