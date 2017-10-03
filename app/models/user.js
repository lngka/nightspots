"use strict";
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-find-or-create");

// the schema itself
const Schema = mongoose.Schema;
const mySchema = new Schema({
    "twitter": {
        "twitterID": {
            "type": String,
            "unique": true
        },
        "displayName": String,
        "token": String,
        "tokenSecret": String,
        "accessLevel": String
    }
});

// findOrCreate is a plugin for mongoose
// this function is used to create a user object for the first time he
// logs in with twitter
mySchema.plugin(findOrCreate);

// expose the schema
const User = mongoose.model("User", mySchema);
module.exports = User;
