// Axios.model.js

const Response = require('../../models/_request/AxiosRsp.model');
const Axios = require('axios');

module.exports = class Request {
  constructor(hostname, apikey, params) {
    this.hostname = hostname;
    this.apikey = apikey;
    this.url = `https://${hostname}/api/v1`;
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'ExtraHop apikey=' + apikey
    };
  }

  checkStatus(response, resolve, reject) {
    if ( ['4','5'].includes((response.status + '')[0]) ) {
      return reject(response)
    } else {
      return resolve(response)
    }
  }

  send(method, uri, data) {
    return new Promise((resolve, reject) => {
        Axios(`https://${this.hostname}/api/v1/${uri}`, {
        method: method,
        headers: this.headers,
        data: JSON.stringify(data)
      })
      .then(response => this.checkStatus(response, resolve, reject))
      .catch(error => this.checkStatus(error, resolve, reject))
      .catch(reject)
    });
  }

  async send(method, uri, body) {
    return await this.send(method, uri, body)
      .then(response => {
        return new Response(response);
      })
      .catch(error => {
        console.error(error);
        return new Response(error);
      })
  }

  async get(uri) {
    return await this.send('GET', uri);
    // console.log(this.response);
    // return this.response;
  }

  async post(uri, body) {
    return await this.send('POST', uri);
    // console.log(JSON.stringify(response, null, 2));
    // return response;
  }

  async patch(uri, body) {
    return await this.send('PATCH', uri);
    // console.log(JSON.stringify(response, null, 2));
    // return response;
  }

  async put(uri, body) {
    return await this.send('PUT', uri);
    //console.log(JSON.stringify(response, null, 2));
    return response;
  }

  async delete(uri, body) {
    return await this.send('DELETE', uri);
    // console.log(JSON.stringify(response, null, 2));
    // return response;
  }
}
