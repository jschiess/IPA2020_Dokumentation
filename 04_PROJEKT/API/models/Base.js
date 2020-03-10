// dependencies
var { Model } = require('objection');

class BaseModel extends Model {
	static get tableName() {
		return this.name;
	}
}

module.exports = BaseModel;