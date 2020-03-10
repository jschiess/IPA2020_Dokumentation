var BaseModel = require('./Base.js');

class Items extends BaseModel {
	static fields() {
		return {
			PK_items_ID: { type: 'integer' },
			serialnumber: { type: 'string', minLength: 1, maxLength: 255 },
			createdAt: { type: 'string' },
			uuid: { type: 'string' },
			FK_locations_ID: { type: 'integer' },
			FK_itemsClass_ID: { type: 'integer' },
			lentTo: { type: ['integer', 'null'] },
		};
	}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: this.fields(),
		};
	}

	static relationMappings() {
		const { Model } = require('objection');
		const { ItemsClass, Users, Locations } = require('./all');

		return {
			itemClass: {
				relation: Model.BelongsToOneRelation,
				modelClass: ItemsClass,
				join: {
					from: 'items.FK_itemsClass_ID',
					to: 'itemsclass.PK_itemsClass_ID',
				}
			},
			location: {
				relation: Model.BelongsToOneRelation,
				modelClass: Locations,
				join: {
					from: 'items.FK_locations_ID',
					to: 'locations.PK_locations_ID',
				}
			},
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: Users,
				join: {
					from: 'users.PK_users_ID',
					to: 'items.lentTo'
				}
			}
		};
	}
}


module.exports = Items;