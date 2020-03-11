/**
 * Author: Josiah Schiess
 * defines the routes for the teacher role
 */

var express = require('express');
var knex = require('../knex');
var router = express.Router();

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
		var result = await knex('itemsClass')
			.select('PK_itemsClass_ID as itemsClassId', 'itemsClassName');
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
	res.send(result);
});



router.put('/inventory/:id', async (req, res) => {
	var id = req.params.id;
	var serialnumber = req.body.serialnumber;
	var locationsId = req.body.FK_locations_ID;

	try {
		await knex('items')
			.where('PK_items_ID', '=', id)
			.update({
				FK_locations_ID: locationsId,
				serialnumber: serialnumber
			});
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
	res.sendStatus(200);
});

router.post('/items', async (req, res) => {
	try {
		await knex('items').insert(req.body);
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

router.post('/manufacturers', async (req, res) => {
	try {
		await knex('manufacturers')
			.insert(req.body);
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

router.post('/types', async (req, res) => {
	try {
		await knex('manufacturers')
			.insert(req.body);
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

router.post('/itemsClass', async (req, res) => {
	try {
		await knex('itemsClass')
			.insert(req.body);
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

router.delete('/lendings/:id', async (req, res) => {
	try {
		await knex('items')
			.where('PK_items_ID', req.params.id)
			.update({ lentTo: null });
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

router.delete('/inventory/:id', async (req, res) => {
	try {
		await knex('items')
			.where('PK_items_ID', '=', req.params.id)
			.del();
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
	res.sendStatus(200);
});

module.exports = router;