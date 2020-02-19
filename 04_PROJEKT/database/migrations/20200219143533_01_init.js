
exports.up = await function (knex) {
	await await knex.schema.createTable('users', table => {
		table.increments('PK_users_ID')
		table.string('username')
		table.string('password')

	});
};

exports.down = function (knex) {

};
