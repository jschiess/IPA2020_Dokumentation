// import packages
var express = require('express');
var knex = require('../knex');

// initialize router
var router = express.Router();

// add new items
router.post('/items', async (req, res) => {
	var {
		PK_items_ID,
		serialnumber,
		FK_itemsClass_ID
	} = req.body;

	try {
		// insert statement into knex
		await knex('items').insert({
			PK_items_ID,
			serialnumber,
			FK_itemsClass_ID,
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

	var {
		description,
		FK_locations_ID,
		FK_manufacturer_ID,
		FK_type_ID,
	} = req.body;

	try {
		await knex('itemsClass').insert({
			description,
			FK_locations_ID,
			FK_manufacturer_ID,
			FK_type_ID,
		});

		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

// adds new Manufacturers
router.post('/manufacturer', async (req, res) => {

	// define manufacturers
	var manufacturer = req.body.manufacturerName;

	try {
		// insert manufacturers into the database
		await knex('manufacturer').insert({
			manufacturerName: manufacturer
		});

		// sends status 200
		res.sendStatus(200);
	} catch (error) {
		// log error and send status 500
		console.error(error);
		res.sendStatus(500);
	}
});



// export the function
module.exports = router;
