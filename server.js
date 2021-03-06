"use strict";
const express      = require("express");
const mongoose     = require("mongoose");
const handlebars   = require("express-handlebars");
const path         = require("path");
const getYelpToken = require("./app/common/get-yelp-token.js");
const cookieParser = require("cookie-parser");
const bodyParser   = require("body-parser");
const session      = require("express-session");
const passport     = require("passport");

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
app.use("/app", express.static(path.join(process.cwd(), "app")));

// parse JSON through POST request
app.use(bodyParser.json());

// init cookie parser and session
app.use(cookieParser("sup2erdu21per1836&secret"));
app.use(session({
    "resave": false,
    "saveUninitialized": false,
    "secret": "sup2erdu21per1836&secret"
}));

// config passportJS
app.use(passport.initialize());
app.use(passport.session());
require("./app/config/passport-config.js")(passport);

// routes config
require("./app/routes/index.js")(app);
require("./app/routes/api.js")(app);
require("./app/routes/auth.js")(app, passport);


// start, default PORT is 3000
app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on " + process.env.PORT || 3000);    
});
