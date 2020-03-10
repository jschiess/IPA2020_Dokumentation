var Model = require('./Base.js');



class Users extends Model {

	static fields() {
		return {
			id: { type: ['number', 'null'] },
			fullname: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
			// PK_users_ID: { type: 'integer', minLength: 1 },
			username: { type: 'string', minLength: 1, maxLength: 255 },
			firstname: { type: 'string', minLength: 1, maxLength: 255 },
			lastname: { type: 'string', minLength: 1, maxLength: 255 },
			// password: { type: 'string', minLength: 1, maxLength: 255 },
			FK_roles_ID: { type: 'integer', minLength: 1, maxLength: 255 }
		};
	}

	static get virtualJsonSchemaProperties() {
		return this.fields();
	}

	id() {
		return this.PK_users_ID;
	}

	static get idColumn() {
		return 'id';
	}

	fullname() {
		return this.firstname + ' ' + this.lastname;
	}


	static get jsonSchema() {
		return {
			type: 'object',
			properties: this.fields()
		};
	}

	static relationMappings() {
		const { Model } = require('objection');
		const { Roles, Items } = require('./all');

		return {
			roles: {
				relation: Model.BelongsToOneRelation,
				modelClass: Roles,
				join: {
					from: 'users.FK_roles_ID',
					to: 'roles.PK_roles_ID'
				}
			},
			lent: {
				relation: Model.BelongsToOneRelation,
				modelClass: Items,
				join: {
					from: 'users.PK_items_ID',
					to: 'items.lentTo'
				}
			}
		};
	}
}


module.exports = Users;