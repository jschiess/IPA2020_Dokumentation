// import packages
var express = require('express');
// import database connection
var knex = require('../knex');
// initialize router
var router = express.Router();
// get all locations
router.get('/locations', async (req, res) => {
	try {
		// database request
		var result = await knex('locations').columns('PK_locations_ID as locationsId', 'locationsName').select();
		// error handling
	} catch (error) {
		// send Status 500
		res.sendStatus(500);
	}
	// send response
	res.send(result);
});

// get all types
router.get('/types', async (req, res) => {
	try {
		// database request
		var result = await knex('types').columns('PK_types_ID as typesId', 'typesName').select();
		// error handling
	} catch (error) {
		// send Status 500
		res.sendStatus(500);
	}
	// send response
	res.send(result);
});

// get all manufacturer
router.get('/manufacturers', async (req, res) => {
	try {
		// database request
		var result = await knex('manufacturers').columns('PK_manufacturers_ID as manufacturersId', 'manufacturersName').select();
		// error handling
	} catch (error) {
		// send Status 500
		res.sendStatus(500);
	}
	// send response
	res.send(result);
});

router.get('/itemsClass', async (req, res) => {
	try {
		// database request
		var result = await knex('itemsClass').select('PK_itemsClass_ID as itemsClassId', 'itemsClassName');
		// error handling
	} catch (error) {
		// log error
		console.error(error);
		// send Status 500
		res.sendStatus(500);
	}
	// send response
	res.send(result);
});

// get lendings
router.get('/lendings', async (req, res) => {
	try {
		// database request
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
		// error handling
	} catch (error) {
		// send Status 500
		res.sendStatus(500);
	}
	// send response
	res.send(result);
});

// edit item
router.put('/inventory/:id', async (req, res) => {
	// get id from url
	var id = req.params.id;
	var serialnumber = req.body.serialnumber;
	try {
		// database request
		await knex('items')
			// where itemid is the same as in the params
			.where('PK_items_ID', '=', id)
			// update serialnumber
			.update({
				serialnumber: serialnumber
			});

		// error handling
	} catch (error) {
		// log error
		console.error(error);
		// send Status 500
		res.sendStatus(500);
	}
	// send Status 200
	res.sendStatus(200);
});

// add new items
router.post('/items', async (req, res) => {
	var {
		serialNumber,
		FK_itemsClass_ID,
		FK_locations_ID
	} = req.body;
	try {
		// database request
		await knex('items').insert({
			serialNumber,
			FK_itemsClass_ID,
			FK_locations_ID
		});

		// send Status 200
		res.sendStatus(200);
		// error handling
	} catch (error) {
		// log error
		console.error(error);
		// send Status 500
		res.sendStatus(500);
	}
});

// adds new itemsclass
router.post('/itemsClass', async (req, res) => {
	// Object deconstruktion
	var {
		itemsClassName,
		description,
		FK_manufacturers_ID,
		FK_types_ID
	} = req.body;
	try {
		// database request
		await knex('itemsClass').insert({
			itemsClassName,
			description,
			FK_manufacturers_ID,
			FK_types_ID
		});

		// send Status 200
		res.sendStatus(200);
		// error handling
	} catch (error) {
		// log error
		console.error(error);
		// send Status 500
		res.sendStatus(500);
	}
});

router.delete('/lendings/:id', async (req, res) => {
	var id = req.params.id;
	try {
		// database request
		await knex('items')
			.where('PK_items_ID', id)
			.update({
				lentTo: null
			});

		// send Status 200
		res.sendStatus(200);
		// error handling
	} catch (error) {
		// log error
		console.error(error);
		// send Status 500
		res.sendStatus(500);
	}
});

router.delete('/inventory/:id', async (req, res) => {
	// get id from url
	var id = req.params.id;
	try {
		// database request
		await knex('items')
			// where itemid is the same as in the params
			.where('PK_items_ID', '=', id)
			// delete
			.del();
		// error handling
	} catch (error) {
		// log error
		console.error(error);
		// send Status 500
		res.sendStatus(500);
	}
	// send Status 200
	res.sendStatus(200);
});

// export the function
module.exports = router;