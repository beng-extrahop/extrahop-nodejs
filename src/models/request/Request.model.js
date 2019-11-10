// Request.model.js

const BaseObject = require('../../models/base/BaseObject.model');
const Response = require('../../models/request/Response.model');
const SyncRequest = require('sync-request');

module.exports = class Request extends BaseObject {
  constructor(host, apikey, params = {}) {
    super();
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

  send(type, uri, body) {
    let request, response, errors;

    try {
      this.config.json = body;
      request = SyncRequest(type, this.url + uri, this.config);
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
