// import packages
var express = require('express');
var knex = require('../knex.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// initialize router
var router = express.Router();

// login path
router.post('/login', async (req, res) => {
	// get username and password from body
	var { username, password } = req.body;

	try {
		// user matching the username is gotten from the database
		var user = await knex('users')
			.join('roles', 'users.FK_roles_ID', 'roles.PK_roles_ID')
			.where({ username }).first();

		// database password is read out of the database
		var databasePassword = user.password;
	} catch (error) {
		// log error
		console.error(error);

		// send error
		res.status(403).send('invalid username or password');
	}

	if (typeof user !== 'undefined' && await bcrypt.compare(password, databasePassword)) {
		// tokendata is send separate to the token
		var tokenData = {
			userId: user.PK_users_ID,
			username: user.username,
			role: user.rolesName
		};

		// jwt token generiene
		var token = jwt.sign(tokenData, process.env.JWT_TOKEN);

		// because of convention Bearer is add in the beginning
		var auth = 'Bearer ' + token;

		// send data
		res.send({ auth, tokenData });
	} else {
		// send error
		res.status(403).send('invalid username or password');
	}
});

// export the router
module.exports = router;
