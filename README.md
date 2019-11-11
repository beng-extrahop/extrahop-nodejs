## extrahop-nodejs

### Requirements:
- Node
- npm

### Install

Create project directory:
```sh
mkdir my-extrahop-cli
cd ./my-extrahop-cli
```

Install package files:
```sh
npm install extrahop-nodejs
```

Create main JS file, data dirs:
```sh
mkdir -p data/{db,csv}
touch index.js
```

### Run
```js
node index.js
```

### Configure
#### Single Appliance
```js
const Extrahop = require('extrahop-nodejs');

const config = {
  hostname: 'extrahop.domain.internal',
  apikey: 'XXXXXXXXXXXXXX',
  type: 'ECA'
};

const eca = new Extrahop(config);
```

#### Multiple Appliances
```js
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

#### From Config File
```js
const Extrahop = require('extrahop-nodejs');
const config = require('./config.json');

const extrahopEnv = new Extrahop(config);
```

### Usage

#### Activity Groups
```js
const activityGroups = eca.activityGroups().find();

activityGroups.forEach(activityGroup => {
  const dashboards = eca.activityGroups().getDashboards(activityGroup);
  dashboard.forEach(dashboard => dashboard.print());
});
```

### Records
#### Search
```js
const params = {
  types: ['~ssl_open', '~ssl_close'], // default: any
  limit: 500, // default: 1000
  from: '-60m', // default: 30m
  until: '-30m', // default: now
};

const records = eca.records();
const search = records.search(params);
```

#### Search & Save
```js
const params = {
  types: ['~ssl_open', '~ssl_close'], // default: any
  limit: 500, // default: 1000
  from: '-60m', // default: 30m
  until: '-30m', // default: now
};

const records = eca.records();
const search = records.search(params);

records.saveToCSV(search);
```


