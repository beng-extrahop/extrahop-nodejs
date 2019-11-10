# extrahop-nodejs

## Requirements:
- Node
- npm

## Install

Create project directory:
```
mkdir my-extrahop-cli
cd ./my-extrahop-cli
```

Install package files:
```
npm install extrahop-nodejs
```

Create main JS file, data dirs:
```
mkdir -p data/{db,csv}
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
  type: 'ECA'
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
          type: 'ECA'
        },
        {
          hostname: 'eda01.domain.internal',
          apikey: 'XXXXXXXXXXXXXX',
          type: 'EDA'
        },
        {
          hostname: 'eda02.domain.internal',
          apikey: 'XXXXXXXXXXXXXX',
          type: 'EDA'
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


