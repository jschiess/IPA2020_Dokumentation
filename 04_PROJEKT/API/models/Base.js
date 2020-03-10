// dependencies
var { Model } = require('objection');

class BaseModel extends Model {
	static get tableName() {


		return this.name.toLowerCase();
	}


	// weird workarount so i can call virtual attributes from objection-graphql
	static get virtualAttributes() {
		var temp = [];
		for (let n in this.fields()) {
			temp.push(n);
		}
		return temp;
	}
}

module.exports = BaseModel;