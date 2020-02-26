// configuration
var config = {
	client: 'mysql',
	version: '8.0',
	connection: {
		host: 'localhost',
		database: 'inventory',
		user: 'root',
		password: 'admin',
		insecureAuth: true,
		port: 3306
	}
};
// esport
module.exports = require('knex')(config);
