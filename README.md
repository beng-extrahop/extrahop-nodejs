# extrahop-nodejs

## Requirements:
- Node v8.11.1-ish
- npm

## Install:
- `git clone https://gitlab.i.extrahop.com/sa/cargobay-git.git`
- `cd cargobay-git/projects/extrahop-nodejs`
- `npm install`

## Run:
- `cp config.toml.example config.toml`
- Add appliances in config.toml (min: hostname & API key)
- Customize index.js with desired imports & functionality
- `npm start` or `node index.js`

## Test:
- `npm install -g mocha`
- `npm test`

## Screenshot:

<img src="./extrahop-nodejs/raw/branch/master/assets/screenshot.png" width="900"/>
