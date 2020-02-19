
// import the required dependencies
var express = require('express');

// initialize the library
var app = express();

// global variable declaration
const PORT = 3000;


// body parser
app.use(express.json());

app.listen(PORT, console.log('listening on port ' + PORT));
