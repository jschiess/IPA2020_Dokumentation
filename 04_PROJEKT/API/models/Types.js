var BaseModel = require('./Base.js');

class Types extends BaseModel {

	static fields() {
		return {
			PK_types_ID: { type: 'integer', minLength: 1 },
			typesName: { type: 'string', minLength: 1 }
		};
	}

	static get idColumn() {
		return 'PK_types_ID';
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
					from: 'itemsclass.FK_types_ID',
					to: 'types.PK_types_ID'
				}
			}
		};
	}

}


module.exports = Types;