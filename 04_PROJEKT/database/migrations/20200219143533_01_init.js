
exports.up = async function (knex) {
	const uuid = require('uuid-v4');
	// create users table
	await knex.schema.createTable('users', table => {
		table.increments('PK_users_ID').primary()
		table.string('firstname').notNullable()
		table.string('lastname').notNullable()
		table.string('username').notNullable()
		table.string('password').notNullable()

		// foreign keys
		table.integer('FK_roles_ID').unsigned()
	});

	// create the roles table
	await knex.schema.createTable('roles', table => {
		table.integer('PK_roles_ID').unsigned().primary()
		table.string('rolesName').notNullable()
	});

	// create the  manufacturers table
	await knex.schema.createTable('manufacturers', table => {
		table.increments('PK_manufacturers_ID').primary()
		table.string('manufacturersName').notNullable()
	});

	// create locations table
	await knex.schema.createTable('locations', table => {
		table.increments('PK_locations_ID').primary()
		table.string('locationsName').notNullable()
	});

	// create types table
	await knex.schema.createTable('types', table => {
		table.increments('PK_types_ID').primary()
		table.string('typesName').notNullable()
	});

	// create itemsClass table
	await knex.schema.createTable('itemsClass', table => {
		table.increments('PK_itemsClass_ID').primary()
		table.string('itemsClassName').notNullable()
		table.string('description')

		// foreign keys
		table.integer('FK_types_ID').unsigned().notNullable()
		table.integer('FK_manufacturers_ID').unsigned().notNullable()
	});

	// create items table
	await knex.schema.createTable('items', table => {
		table.increments('PK_items_ID').primary()
		table.string('serialnumber').notNullable()
		table.uuid('uuid').notNullable().defaultTo(uuid())
		table.timestamp('createdAt').defaultTo(knex.fn.now());

		// foreign keys
		table.integer('FK_locations_ID').unsigned().notNullable()
		table.integer('FK_itemsClass_ID').unsigned().notNullable()
		table.integer('lentTo').unsigned()
	});
};

// delete tables
exports.down = async function (knex) {
	await knex.schema.dropTable('items')
	await knex.schema.dropTable('itemsClass')
	await knex.schema.dropTable('manufacturers')
	await knex.schema.dropTable('types')
	await knex.schema.dropTable('roles')
	await knex.schema.dropTable('users')
	await knex.schema.dropTable('locations')
};
