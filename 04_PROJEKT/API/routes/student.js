// import the required dependencies
var express = require('express');
var router = express.Router();

// knex config
var knex = require('../knex.js');

router.get('/test', async (req, res) => {
	res.send(await knex.from('items')
		// .leftJoin('itemsClass', 'FK_itemsClass_ID', 'PK_itemsClass_ID')
		// .join('types', 'PK_types_ID', 'FK_types_ID')
		// .join('manufacturers', 'PK_manufacturers_ID', 'FK_manufacturers_ID')
		// .join('locations', 'PK_locations_ID', 'FK_locations_ID')
		.select('*'));
});

// get all inventory
router.get('/inventory', async (req, res) => {
	var inventory = await knex.from('items')
		.leftJoin('itemsClass', 'FK_itemsClass_ID', 'PK_itemsClass_ID')
		.join('types', 'PK_types_ID', 'FK_types_ID')
		.join('manufacturers', 'PK_manufacturers_ID', 'FK_manufacturers_ID')
		.join('locations', 'PK_locations_ID', 'FK_locations_ID')
		.leftJoin('users', 'PK_users_ID', 'lentTo')
		.select('*');


	// converting data

	// variable declaration
	var temp = {};
	var result = [];

	for (var item of inventory) {
		if (!temp[item.PK_itemsClass_ID]) {
			temp[item.PK_itemsClass_ID] = [];
		}
		temp[item.PK_itemsClass_ID].push(item);
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


router.get('/lendings', async (req, res) => {


	try {
		var result = await knex('lendings');

		res.send(result);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
})

// new lending
router.post('/lendings', async (req, res) => {
	var userId = req.decodedToken.userId;
	var idList = req.body;
	console.log(req.body);


	try {

		for (var id of idList) {
			console.log(userId);

			var result = await knex('items')
				.where('lentTo', null)
				.where('PK_items_ID', id)
				.update({ lentTo: userId });

			if (result === 0) {
				console.error('no entry found ');
				res.sendStatus(500);
			}

		}
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

// delete lending
router.delete('/lendings', async (req, res) => {
	var userId = req.decodedToken.userId;
	var { PK_items_ID } = req.body;

	try {
		await knex('items')
			.where('lendTo', userId)
			.where('PK_items_ID', PK_items_ID)
			.update({ lentTo: null });
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

// export the module
module.exports = router; 
