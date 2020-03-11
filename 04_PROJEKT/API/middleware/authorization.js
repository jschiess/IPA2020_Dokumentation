/**
 * Author: Josiah Schiess
 * gets token from header, verifies if correct.
 */

var jwt = require('jsonwebtoken');

// authorization function
async function checkAuthorization(req, res, next) {
	var head = req.headers.authorization;

	// check if head is not undefined
	if (typeof head !== 'undefined') {
		// separate the token from the Bearer
		var token = req.headers.authorization.split(' ')[1];

		// this lets future middleware use the token by passing it to the req object
		req.token = token;
		try {
			// verify the token
			req.decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
		}
		// if it is not falid send error
		catch (error) {
			console.error(error);
			res.send('invalid token').status(403);
		}
		// send user to the next function in the stack
		next();
	}
	// if head is not defined
	else {
		res.sendStatus(403);
	}
}

// exports the function
module.exports = checkAuthorization;
