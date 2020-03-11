const graphQLBuilder = require('objection-graphql');
const knex = require('../knex');
const graphqlHTTP = require('express-graphql');
const { Model } = require('objection');
const {
	Locations, Roles, Users, Items,
	ItemsClass, Manufacturers, Types
} = require('../models/all');

function createSchema() {
	Model.knex(knex);
	const builder = graphQLBuilder
		.builder()
		.model(Roles, {
			listFieldName: 'roles',
			fieldName: 'role'
		})
		.model(Items, {
			listFieldName: 'items',
			fieldName: 'item'
		})
		.model(ItemsClass, {
			listFieldName: 'itemsClasses',
			fieldName: 'itemsClass'
		})
		.model(Manufacturers, {
			listFieldName: 'manufacturers',
			fieldName: 'manufacturer'
		})
		.model(Types, {
			listFieldName: 'types',
			fieldName: 'type'
		})
		.model(Locations, {
			listFieldName: 'locations',
			fieldName: 'location'
		})
		.model(Users, {
			listFieldName: 'users',
			fieldName: 'user'
		});

	return builder.build();
}

const express = require('express');
const router = express.Router();

router.use('/graphql', graphqlHTTP({
	schema: createSchema(),
	graphiql: true,
}));

module.exports = router;