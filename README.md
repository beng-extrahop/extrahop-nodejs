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

## Run
```
node index.js
```

## Usage

Within index.js:

### Import - Single Appliance
```
const Extrahop = require('extrahop-nodejs')
const config = {
  hostname: 'extrahop.domain.internal',
  apikey: 'XXXXXXXXXXXXXX',
  type: eca
};

const eca = new Extrahop(config);

```

### Import - Multiple Appliances
```
const Extrahop = require('extrahop-nodejs')
const config = {
  environments: [
    {
      name: 'my-environment',
      appliances: [
        {
          hostname: 'extrahop.domain.internal',
          apikey: 'XXXXXXXXXXXXXX',
          type: eca
        },
        {
          hostname: 'eda01.domain.internal',
          apikey: 'XXXXXXXXXXXXXX',
          type: eda
        },
        {
          hostname: 'eda02.domain.internal',
          apikey: 'XXXXXXXXXXXXXX',
          type: eda
        }
      ]
    }
  ]
};

const extrahop = new Extrahop(config);
const eca = extrahop.getECA();

```

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


