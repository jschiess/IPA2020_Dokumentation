var BaseModel = require('./Base.js');

class Manufacturers extends BaseModel {

	static fields() {
		return {
			PK_manufacturers_ID: { type: 'integer', minLength: 1 },
			manufacturersName: { type: 'string', minLength: 1 }
		};
	}

	static get idColumn() {
		return 'PK_manufacturers_ID';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: this.fields(),
		};
	}

	static relationMappings() {
		const { Model } = require('objection');
		const { ItemsClass } = require('./all');
		return {
			itemsClass: {
				relation: Model.HasManyRelation,
				modelClass: ItemsClass,
				join: {
					from: 'itemsclass.FK_manufacturers_ID',
					to: 'manufacturers.PK_manufacturers_ID'
				}
			}
		};
	}

}


module.exports = Manufacturers;