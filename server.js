"use strict";
const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const path = require("path");
const getYelpToken = require("./app/common/get-yelp-token.js");

// init environment variables
require("dotenv").config();

//init database
mongoose.connect(process.env.MONGO_URI, {"useMongoClient": true});

// init app
var app = express();

// init viewengine
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", ".hbs"); // default file extension for a view
app.engine("hbs", handlebars({"extname": "hbs", "layoutsDir": "./views/layouts", "defaultLayout": "main.hbs"}));

// set public folder
app.use("/public", express.static(path.join(process.cwd(), "public")));

// get access token from YELP and save in process.env.YELP_TOKEN
getYelpToken();


// routes config
require("./app/routes/index.js")(app);
require("./app/routes/api.js")(app);

// start, default PORT is 3000
app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on " + process.env.PORT || 3000);
});
