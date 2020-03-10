// Update with your config settings.

module.exports = {

	development: {
		client: 'sqlite3',
		connection: { filename: 'database.sqlite' },
		migrations: './migrations',
		seeds: './seeds',
		useNullAsDefault: true
	},

	staging: {
		client: 'mysql',
		version: '8.0',
		connection: {
			host: 'localhost',
			database: 'kek',
			user: 'root',
			password: 'admin',
			insecureAuth: true,
			port: 3306
		},
		migrations: {
			directory: './migrations'
		},
		seeds: {
			directory: './seeds'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
