"use strict";
const path = require("path");
const User = require(path.join(process.cwd(), "/app/models/user.js"));
/*
* function to load last search on server
* @param userID {string}: the current user, ObjectID
* @param callback {function}: will be passed (err, location)
*   @callback-arg err {Error}: mongoDB error
*   @callback-arg location {string}: the last saved location
*/

module.exports = function loadLastSearch(userID, callback) {
    if (!userID) {
        var err = new Error("Invalid userID: Could not load last search");
        return callback(err, null);
    }

    User.findById(userID, "lastSearchedLocation", function(err, doc) {
        return callback(err, doc);
    });
};
