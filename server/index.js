require("dotenv").config();
const express = require('express');
const app = express();
const db = require('../dbs/index.js');
const model = require('../dbs/model/model.js');
const yelpHelper = require('./controller.js');
const router = require('./router.js')

/* Set up static content and middlewares */
app.use('/', router);
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

/* Start up the server */
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);