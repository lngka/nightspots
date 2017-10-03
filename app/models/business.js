"use strict";
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-find-or-create");

// the schema
const Schema = mongoose.Schema;
const mySchema = new Schema({
    "yelpID": {
        "type": String,
        "unique": true
    },
    "going": {
        "type": Array,
        "default": []
    },
    "goingCount": {
        "type": Number,
        "default": 0
    }
});

// findOrCreate is a plugin for mongoose
// this function is used to create a business object for the first time
// the client ask for goingCount
mySchema.plugin(findOrCreate);

// expose the schema
const Business = mongoose.model("Business", mySchema);
module.exports = Business;
