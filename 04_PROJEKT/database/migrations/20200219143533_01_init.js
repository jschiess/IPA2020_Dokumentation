
exports.up = async function (knex) {

	// create users table
	await knex.schema.createTable('users', table => {
		table.integer('PK_users_ID').primary()
		table.string('username')
		table.string('password')

		// foreign keys
		table.integer('FK_roles_ID')
	});
	await knex.raw("ALTER TABLE `inventory`.`users` CHANGE COLUMN `PK_users_ID` `PK_users_ID` INT(11) NOT NULL AUTO_INCREMENT")

	// create the roles table
	await knex.schema.createTable('roles', table => {
		table.integer('PK_roles_ID').primary()
		table.string('rolesName')
	});
	await knex.raw("ALTER TABLE `inventory`.`roles` CHANGE COLUMN `PK_roles_ID` `PK_roles_ID` INT(11) NOT NULL AUTO_INCREMENT")

	// create the  manufacturers
	await knex.schema.createTable('manufacturers', table => {
		table.integer('PK_manufacturers_ID').primary()
		table.string('manufacturersName')
	});
	await knex.raw("ALTER TABLE `inventory`.`manufacturers` CHANGE COLUMN `PK_manufacturers_ID` `PK_manufacturers_ID` INT(11) NOT NULL AUTO_INCREMENT")

	// create locations table
	await knex.schema.createTable('locations', table => {
		table.integer('PK_locations_ID').primary()
		table.string('locationsName')
	});
	await knex.raw("ALTER TABLE `inventory`.`locations` CHANGE COLUMN `PK_locations_ID` `PK_locations_ID` INT(11) NOT NULL AUTO_INCREMENT")

	// create types table
	await knex.schema.createTable('types', table => {
		table.integer('PK_types_ID').primary()
		table.string('typesName')
	});
	await knex.raw("ALTER TABLE `inventory`.`types` CHANGE COLUMN `PK_types_ID` `PK_types_ID` INT(11) NOT NULL AUTO_INCREMENT")

	// create itemsClass table
	await knex.schema.createTable('itemsClass', table => {
		table.integer('PK_itemsClass_ID').primary()
		table.string('itemsClassName')
		table.string('description')

		// foreign keys
		table.integer('FK_types_ID')
		table.integer('FK_manufacturers_ID')
	});
	await knex.raw("ALTER TABLE `inventory`.`itemsClass` CHANGE COLUMN `PK_itemsClass_ID` `PK_itemsClass_ID` INT(11) NOT NULL AUTO_INCREMENT")

	// create items table
	await knex.schema.createTable('items', table => {
		table.integer('PK_items_ID').primary()
		table.string('serialnumber')
		table.timestamp('createdAt').defaultTo(knex.fn.now());

		// foreign keys
		table.integer('FK_locations_ID')
		table.integer('FK_itemsClass_ID')
		table.integer('lentTo')
	});
	await knex.raw("ALTER TABLE `inventory`.`items` CHANGE COLUMN `PK_items_ID` `PK_items_ID` INT(11) NOT NULL AUTO_INCREMENT")
};

// delete tables
exports.down = async function (knex) {
	await knex.schema.dropTable('items')
	await knex.schema.dropTable('itemsClass')
	await knex.schema.createTable('manufacturers')
	await knex.schema.createTable('types')
	await knex.schema.dropTable('roles')
	await knex.schema.dropTable('users')
};
