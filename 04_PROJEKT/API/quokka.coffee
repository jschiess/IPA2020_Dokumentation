kek = 'kek'
log = console.log


knex = require './knex'

getItems = () ->
	items = await knex 'items'
	return items

oof = Promise.resolve getItems()

log oof