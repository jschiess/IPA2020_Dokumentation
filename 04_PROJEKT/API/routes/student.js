// import the required dependencies
var express = require('express');
var router = express.Router();

// knex config
var knex = require('../knex.js');

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

router.get('/inventory', async (req, res) => {
	var inventory = await knex.from('items')
		.join('itemsClass', 'FK_itemsClass_ID', 'PK_itemsClass_ID')
		.join('types', 'PK_types_ID', 'FK_types_ID')
		.join('manufacturers', 'PK_manufacturers_ID', 'FK_manufacturers_ID')
		.join('locations', 'PK_locations_ID', 'FK_locations_ID')
		.select('*');


	// converting data

	// variable declaration
	var temp = {};
	var result = [];

	for (var item of inventory) {
		if (!temp[item.PK_items_ID]) {
			temp[item.PK_items_ID] = [];
		}
		temp[item.PK_items_ID].push(item);
	}

	for (var index in temp) {
		result.push({
			PK_itemsClass_ID: temp[index][0].PK_itemsClass_ID,
			itemsClassName: temp[index][0].itemsClassName,
			manufacturersName: temp[index][0].manufacturersName,
			typesName: temp[index][0].typesName,
			locationsName: temp[index][0].locationsName,
			description: temp[index][0].description,
			items: temp[index]
		});
	}

	res.send(result);
});








// export the module
module.exports = router; 
