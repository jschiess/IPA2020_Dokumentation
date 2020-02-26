
exports.up = async function (knex) {
	// relations for table itemsClass
	await knex.schema.table('itemsClass', (table) => {
		table.foreign('FK_types_ID').references('types.PK_types_ID');
		table.foreign('FK_manufacturers_ID').references('manufacturers.PK_manufacturers_ID')
	});

	// relations for table users
	await knex.schema.table('users', (table) => {
		table.foreign('FK_roles_ID').references('roles.PK_roles_ID');
	});

	// relations for table items
	await knex.schema.table('items', (table) => {
		table.foreign('FK_locations_ID').references('locations.PK_locations_ID');
		table.foreign('lentTo').references('users.PK_users_ID');
		table.foreign('FK_itemsClass_ID').references('itemsClass.PK_itemsClass_ID');
	});
};

exports.down = async function (knex) {

};
