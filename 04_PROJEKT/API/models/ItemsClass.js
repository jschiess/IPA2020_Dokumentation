var BaseModel = require('./Base.js');

class ItemsClass extends BaseModel {
	static fields() {
		return {
			PK_itemsClass_ID: { type: 'integer' },
			itemsClassName: { type: 'string', minLength: 1, maxLength: 255 },
			description: { type: ['string', 'null'] }
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
		const { Items, Manufacturers, Types } = require('./all');

		return {
			items: {
				relation: Model.HasManyRelation,
				modelClass: Items,
				join: {
					from: 'items.FK_itemsClass_ID',
					to: 'itemsclass.PK_itemsClass_ID',
				}
			},
			manufacturers: {
				relation: Model.BelongsToOneRelation,
				modelClass: Manufacturers,
				join: {
					from: 'itemsclass.FK_manufacturers_ID',
					to: 'manufacturers.PK_manufacturers_ID'
				}
			},
			types: {
				relation: Model.BelongsToOneRelation,
				modelClass: Types,
				join: {
					from: 'itemsclass.FK_types_ID',
					to: 'types.PK_types_ID'
				}
			}
		};
	}
}


module.exports = ItemsClass;