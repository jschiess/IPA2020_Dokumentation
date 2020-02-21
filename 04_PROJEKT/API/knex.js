
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
var knex = require('knex')(config);


module.exports = knex;
