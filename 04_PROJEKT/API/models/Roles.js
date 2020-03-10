var BaseModel = require('./Base.js');

class Roles extends BaseModel {

	static fields() {
		return {
			PK_roles_ID: { type: 'integer', minLength: 1 },
			rolesName: { type: 'string', minLength: 1 }
		};
	}

	static get idColumn() {
		return 'PK_roles_ID';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: this.fields(),
		};
	}

	static relationMappings() {
		const { Model } = require('objection');
		const { Users } = require('./all');
		return {
			users: {
				relation: Model.HasManyRelation,
				modelClass: Users,
				join: {
					from: 'users.FK_roles_ID',
					to: 'roles.PK_roles_ID'
				}
			}
		};
	}

}


module.exports = Roles;