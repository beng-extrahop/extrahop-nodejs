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

### Import
```
const Extahop = require('extrahop-nodejs');
```

### Configure
#### Single Appliance
```
const Extahop = require('extrahop-nodejs');

const config = {
  hostname: 'extrahop.domain.internal',
  apikey: 'XXXXXXXXXXXXXX',
  type: 'ECA'
};

const eca = new Extrahop(config);
```

#### Multiple Appliances
```
const Extrahop = require('extrahop-nodejs');

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

const extrahopEnv = new Extrahop(config);
```

#### From File
```
const Extrahop = require('extrahop-nodejs');
const config = require('./config.json');

const extrahopEnv = new Extrahop(config);
```
### Records
#### Search
```
const eca = extrahopEnv.getECA();

const params = {
  types: ['~ssl_open', '~ssl_close'], // default: any
  limit: 500, // default: 1000
  from: '-60m', // default: 30m
  until: '-30m', // default: now
};

const recordSearch = eca.records().search(params);
```

#### Save
```
const eca = extrahopEnv.getECA();
const recordSearch = eca.records().search(params);

recordSearch.saveToCSV(search);
```


