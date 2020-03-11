var express = require('express');
var router = express.Router();

// Routes
const teacherRoute = require('./teacher');
const studentRoute = require('./student');
const publicRoute = require('./public');
const graphqlRoute = require('./graphql');
// middleware
const authorization = require('../middleware/authorization');
const isTeacher = require('../middleware/isTeacher');

// define routes
router.use('/', graphqlRoute);
router.use('/', publicRoute);
router.use('/teacher/', authorization, isTeacher, teacherRoute);
router.use('/student', authorization, studentRoute);

// export
module.exports = router;