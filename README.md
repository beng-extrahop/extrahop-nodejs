# extrahop-nodejs

## Requirements:
- Node
- npm

## Install
```
mkdir my-extrahop-cli
cd ./my-extrahop-cli
npm install extrahop-nodejs
touch index.js
```

## Import (index.js)
```
const Extrahop = require('extrahop-nodejs')

const config = {
  hostname: 'extrahop.mydomain.tld',
  apikey: 'XXXXXXXXXXXXXX',
  type: eca
};

const eca = new Extrahop(config);
```

## Run
```
node index.js
```

## Usage (index.js)
### Records
```
// Initialize appliance
const eca = new Extrahop(config);

// Search parameters
const params = {
  types: ['~ssl_open', '~ssl_close'], // default: any
  limit: 500, // default: 1000
  from: '-60m', // default: 30m
  until: '-30m', // default: now
};

// Call records controller & save
const recordSearch = eca.records().search(params);
recordSearch.saveToCSV(search);
```


