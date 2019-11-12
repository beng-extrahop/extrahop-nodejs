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

### Import
```js
const Extrahop = require('extrahop-nodejs');
```

### Config
Module accepts the following structure, either whole or in part:
```js
const config = [
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
  },
  { ...Environment }
];
```

#### Single Appliance
```js
const eca = new Extrahop(config[0].appliances[0]); // provide { hostname, apikey }
```

#### Multiple Appliances
```js
const appliances = new Extrahop(config[0].appliances); // provide Array[{ hostname, apikey }]
```

#### Single Environment
```js
const environment = new Extrahop(config.environments[0]); // provide { name, appliances: Array[{ hostname, apikey }] }
```

#### Multiple Environments
```js
const environments = new Extrahop(config); // provide Array[{ name, appliances: Array[{ hostname, apikey }] }]
```

#### From File
```js
const Extrahop = require('extrahop-nodejs');
const config = require('./config.json');

const extrahop = new Extrahop(config);
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

#### Activity Maps
```js
const activityMaps = eca.activityMaps().find();

activityMaps.forEach(activityMap => {
  activityMap.print();
});
```

#### Alerts
```js
const alerts = eca.alerts().find();

alerts.forEach(alert => {
  alert.print());
});
```

#### Custom Devices
```js
const customDevices = eca.customDevices().find();

customDevices.forEach(customDevice => {
  customDevice.print());
});
```

#### Dashboards
```js
const dashboards = eca.dashboards().find();

dashboards.forEach(dashboard => {
  dashboard.print());
});
```

#### Devices
```js
const devices = eca.devices().find();

devices.forEach(device => {
  device.print());
});
```

#### Device Groups
```js
const deviceGroups = eca.deviceGroups().find();

deviceGroups.forEach(deviceGroup => {
  deviceGroup.print());
});
```

#### Licenses
```js
const license = eca.license();

license.print();
```

### Records

#### Search & Save
```js
const params = {
  types: ['~ssl_open', '~ssl_close'], // default: any
  limit: 500, // default: 1000
  from: '-60m', // default: 30m
  until: '-30m', // default: now
};

const search = eca.records().search(params);
eca.records().saveToCSV(search);
```

#### Triggers
```js
const triggers = eca.triggers().find();

triggers.forEach(trigger => {
  trigger.print());
});
```
