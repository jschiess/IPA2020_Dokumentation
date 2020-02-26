

exports.seed = async function (knex) {

	// import packages
	var bcrypt = require('bcrypt');

	// Deletes ALL existing entries
	await knex('locations').del()
		.then(function () {
			// Inserts seed entries
			return knex('locations').insert([
				{ locationsName: 'LOA03' },
				{ locationsName: 'LOA04' },
				{ locationsName: 'LOA10' }
			]);
		});

	// Deletes ALL existing entries
	await knex('types').del()
		.then(function () {
			// Inserts seed entries
			return knex('types').insert([
				{ typesName: 'Tastatur' },
				{ typesName: 'Bildschirm' },
				{ typesName: 'Raspberry Pi' }
			]);
		});

	// Deletes ALL existing entries
	await knex('manufacturers').del()
		.then(function () {
			// Inserts seed entries
			return knex('manufacturers').insert([
				{ manufacturersName: 'Samsung' },
				{ manufacturersName: 'Logitech' },
				{ manufacturersName: 'Raspberry Pi' }
			]);
		});

	// Deletes ALL existing entries
	await knex('itemsClass').del()
		.then(function () {
			// Inserts seed entries
			return knex('itemsClass').insert([
				{
					itemsClassName: 'Raspberry PI model 3s 16gb ram',
					description: 'micro computer',
					FK_types_ID: 3,
					FK_manufacturers_ID: 3
				},
			]);
		});

	// Deletes ALL existing entries
	await knex('items').del()
		.then(function () {
			// Inserts seed entries
			return knex('items').insert([
				{
					serialnumber: '12312353453463456567567823324',
					FK_locations_ID: 1,
					FK_itemsClass_ID: 1,
				},
			]);
		});

	// Deletes ALL existing entries
	await knex('roles').del()
		.then(function () {
			// Inserts seed entries
			return knex('roles').insert([
				{ rolesName: 'teacher' },
				{ rolesName: 'student' },
			]);
		});

	// Deletes ALL existing entries
	await knex('users').del()
		.then(async function () {
			// Inserts seed entries
			return knex('users').insert([
				{
					username: 'josc',
					password: await bcrypt.hash('kek', 10),
					FK_roles_ID: 1,
				},
				{
					username: 'in17scma',
					password: await bcrypt.hash('gibbix12345', 10),
					FK_roles_ID: 2,
				},
				{
					username: 'in19sika',
					password: await bcrypt.hash('passwort1', 10),
					FK_roles_ID: 2,
				},
			]);
		});
};
