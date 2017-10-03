"use strict";
const path = require("path");
const User = require(path.join(process.cwd(), "/app/models/user.js"));

/*
* module to save user's last searched location
* callback only gets an error object if something's wrong
*/

module.exports = function saveLastSeachedLocation(userID, location, callback) {
    if (typeof userID !== "string" || typeof location !== "string") {
        var err = new Error("Invalid userID or location, couldn't update user's last search");
        return callback(err);
    }
    User.findByIdAndUpdate(userID,
        {
            $set: {
                "lastSearchedLocation": location
            }
        },
        function(err) {
            callback(err);
        }
    );
};
