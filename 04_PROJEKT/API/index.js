
// import the required dependencies
var express = require('express');
var cors = require('cors');


// import the middleware
// var isStudent = require('./middleware/isStudent');
var isTeacher = require('./middleware/isTeacher');
var authorization = require('./middleware/authorization');

// import the routes
var studentRoutes = require('./routes/student');
var teacherRoutes = require('./routes/teacher');
var publicRoutes = require('./routes/public');

// global variable declaration
const PORT = 3000;

// initialize the library
var app = express();

// use cors 
app.use(cors());

// logger
app.use(function (req, res, next) {
	console.log(`${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()} | ${req.method} request on ${req.originalUrl}`);
	next();
});


// converts the body to json format
app.use(express.json());

// // public routes
app.use('/', publicRoutes);

// student routes
app.use('/student', authorization, studentRoutes);

// teacher routes
app.use('/teacher', authorization, isTeacher, teacherRoutes);


app.listen(PORT, console.log('listening on port ' + PORT));
