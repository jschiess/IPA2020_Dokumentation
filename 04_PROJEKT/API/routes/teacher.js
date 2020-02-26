// import packages
var express = require('express');
var knex = require('../knex');

// initialize router
var router = express.Router();

// get all locations 
router.get('/locations', async (req, res) => {
	try {
		var result = await knex('locations').columns('PK_locations_ID as locationsId', 'locationsName').select();
	} catch (error) {
		res.sendStatus(500);
	}
	res.send(result);
});

// get all types 
router.get('/types', async (req, res) => {
	try {
		var result = await knex('types').columns('PK_types_ID as typesId', 'typesName').select();
	} catch (error) {
		res.sendStatus(500);
	}
	res.send(result);
});

// get all manufacturer 
router.get('/manufacturers', async (req, res) => {
	try {
		var result = await knex('manufacturers').columns('PK_manufacturers_ID as manufacturersId', 'manufacturersName').select();
	} catch (error) {
		res.sendStatus(500);
	}
	res.send(result);
});

router.get('/itemsClass', async (req, res) => {

	try {
		// insert statement into knex
		var result = await knex('itemsClass').select('PK_itemsClass_ID as itemsClassId', 'itemsClassName');

	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}

	res.send(result);

});

// get lendings
router.get('/lendings', async (req, res) => {
	try {
		var result = await knex('items')
			.leftJoin('itemsClass', 'FK_itemsClass_ID', 'PK_itemsClass_ID')
			.join('types', 'PK_types_ID', 'FK_types_ID')
			.join('manufacturers', 'PK_manufacturers_ID', 'FK_manufacturers_ID')
			.join('locations', 'PK_locations_ID', 'FK_locations_ID')
			.join('users', 'PK_users_ID', 'lentTo')
			.select(
				'PK_items_ID as itemId',
				'typesName',
				'locationsName',
				'username',
				'description',
				'manufacturersName',
				'serialNumber'

			);

	} catch (error) {
		res.sendStatus(500);
	}
	res.send(result);
});

// edit item
router.put('/inventory/:id', async (req, res) => {
	// get id from url
	var id = req.params.id;
	var serialnumber = req.body.serialnumber;
	try {
		// knex request
		await knex('items')
			// where itemid is the same as in the params
			.where('PK_items_ID', '=', id)
			// update serialnumber
			.update({ serialnumber: serialnumber });

	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
	res.sendStatus(200);
});


// add new items
router.post('/items', async (req, res) => {
	var {
		serialNumber,
		FK_itemsClass_ID,
		FK_locations_ID,
	} = req.body;

	try {
		// insert statement into knex
		await knex('items').insert({
			serialNumber,
			FK_itemsClass_ID,
			FK_locations_ID
		});

		// send status 200
		res.sendStatus(200);

	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

// adds new itemsclass
router.post('/itemsClass', async (req, res) => {
	// Object deconstruktion
	var {
		itemsClassName,
		description,
		FK_locations_ID,
		FK_manufacturers_ID,
		FK_types_ID,
	} = req.body;

	try {

		// knex insert statement
		await knex('itemsClass').insert({
			itemsClassName,
			description,
			FK_manufacturers_ID,
			FK_types_ID,
		});

		// sendstatus 200
		res.sendStatus(200);

		// if error 
	} catch (error) {
		// log error
		console.error(error);
		// send status 500
		res.sendStatus(500);
	}
});


router.delete('/lendings/:id', async (req, res) => {
	var id = req.params.id;
	try {
		await knex('items')
			.where('PK_items_ID', id)
			.update({ lentTo: null });
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

router.delete('/inventory/:id', async (req, res) => {
	// get id from url
	var id = req.params.id;

	try {
		// knex request
		await knex('items')
			// where itemid is the same as in the params
			.where('PK_items_ID', '=', id)
			// delete
			.del();
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
	res.sendStatus(200);
});

// export the function
module.exports = router;
