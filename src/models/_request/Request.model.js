// Request.model.js

const Response = require('../../models/_request/Response.model');
const SyncRequest = require('sync-request');

module.exports = class Request {
  constructor(host, apikey, params = {}) {
    this.host = host;
    this.apikey = apikey;
    this.url = params.url || `https://${this.host}/api/v1`;

    this.config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `ExtraHop apikey=${this.apikey}`
      },
      cache: params.cache || 'file'
    };
  }

  send(method, uri, body) {
    let request, response, errors;

    try {
      this.config.json = body;
      request = SyncRequest(method, this.url + uri, this.config);
      response = JSON.parse(request.getBody('utf-8'));
    }
    catch (err) {
      errors = err;
      console.log(`ERROR: ${err}`);
    }

    return new Response({ request, response, errors });
  }

  get(uri) {
    return this.send('GET', uri);
  }

  post(uri, body) {
    return this.send('POST', uri, body);
  }

  patch(uri, body) {
    return this.send('PATCH', uri, body);
  }

  put(uri, body) {
    return this.send('PUT', uri, body);
  }

  delete(uri, body) {
    return this.send('DELETE', uri, body);
  }
}
