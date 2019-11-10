// Global.constants.js

const Colors = require('colors/safe');

module.exports = Object.freeze({
	Config: {
		ENV_FILE: ',/config.toml',
    DATA_DIR: './data',
    CSV_DIR: 'csv',
    DB_DIR: 'db'
	},
	Icons: {
		Success: Colors.green('[]'),
		Info: Colors.blue('[]'),
		Warn: Colors.yellow('[]'),
		Error: Colors.red('[]'),
	}
});
