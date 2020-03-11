/**
 * Author: Josiah Schiess
 * routes that the client with the role student kann access
 */
var express = require('express');
var router = express.Router();
var knex = require('../knex.js');

router.get('/inventory', async (req, res) => {
	try {
		// database request
		var inventory = await knex.from('items')
			.leftJoin('itemsClass', 'FK_itemsClass_ID', 'PK_itemsClass_ID')
			.join('types', 'PK_types_ID', 'FK_types_ID')
			.join('manufacturers', 'PK_manufacturers_ID', 'FK_manufacturers_ID')
			.join('locations', 'PK_locations_ID', 'FK_locations_ID')
			.leftJoin('users', 'PK_users_ID', 'lentTo')
			.select(
				'PK_items_ID',
				'serialnumber',
				'createdAt',
				'FK_locations_ID',
				'FK_itemsClass_ID',
				'lentTo',
				'PK_itemsClass_ID',
				'itemsClassName',
				'description',
				'FK_types_ID',
				'FK_manufacturers_ID',
				'PK_types_ID',
				'typesName',
				'PK_manufacturers_ID',
				'manufacturersName',
				'PK_locations_ID',
				'locationsName',
				'PK_users_ID',
				'username',
			);
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
				description: temp[index][0].description,
				items: temp[index]
			});

		}
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
		console.error(error);
		res.sendStatus(500);
	}
	res.send(result);
});


router.post('/lendings', async (req, res) => {
	// id of user from taken from token
	var userId = req.decodedToken.userId;
	// list of ids to lend
	var idList = req.body;
	try {
		for (var id of idList) {
			// database request
			var result = await knex('items')
				.where('lentTo', null)
				.where('PK_items_ID', id)
				.update({ lentTo: userId });

			if (result === 0) {
				// log error
				console.error('no entry found ');
				// send Status 500
				res.sendStatus(500);
			} else {
				// send Status 200
				res.sendStatus(200);
			}
		}
		// error handling
	} catch (error) {
		// log error
		console.error(error);
		// send Status 500
		res.sendStatus(500);
	}
});

router.delete('/lendings/:id', async (req, res) => {
	// id of user from taken from token
	var userId = req.decodedToken.userId;
	// id of the lending to delete
	var id = req.params.id;
	try {
		// database request
		await knex('items')
			.where('lentTo', userId)
			.where('PK_items_ID', id)
			.update({ lentTo: null });

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

// export the module
module.exports = router;
