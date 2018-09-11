const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./routes/api');

//set up express app
const app = express();

//resource sharing from different potts/domains
app.use(cors());

mongoose.Promise = global.Promise;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/noote_plus');

//set static folder
app.use(express.static('public'));

//parse various different custom JSON types as JSON
app.use(bodyParser.json());

//set routes
app.use('/api', route);

//make connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listning to port '+port);
});