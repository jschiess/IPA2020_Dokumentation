// Middleware function
// checks if the users role is teacher
function isTeacher(req, res, next) {

	// get the role from the previous middleware function
	var role = req.decodedToken;

	// check if role is teacher
	if (role === 'teacher') {
		// send user to the next function in the stack
		next();
	} else {

		// send error
		res.sendStatus(403);
	}
}
// export the module
module.exports = isTeacher;
