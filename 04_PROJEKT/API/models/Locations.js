var BaseModel = require('./Base.js');

class Locations extends BaseModel {

	static fields() {
		return {
			PK_locations_ID: { type: 'integer', minLength: 1 },
			locationsName: { type: 'string', minLength: 1 }
		};
	}

	static get idColumn() {
		return 'PK_locations_ID';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: this.fields(),
		};
	}

	static relationMappings() {
		const { Model } = require('objection');
		const { Items } = require('./all');
		return {
			items: {
				relation: Model.HasManyRelation,
				modelClass: Items,
				join: {
					from: 'items.FK_locations_ID',
					to: 'locations.PK_locations_ID'
				}
			}
		};
	}

}


module.exports = Locations;