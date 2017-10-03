"use strict";
const path = require("path");
const Business = require(path.join(process.cwd(), "/app/models/business.js"));
/*
* function to increment going count by 1
* @param userID {string}: valid objectID string
* @param yelpID {string}: business ID string provided by YELP
* @param callback {function}: will be passed (err, doc)
*   @callback-arg err {Error}: most likely error from mongoose
*   @callback-arg doc {object}: JSON object with the new goingCount
*/
module.exports = function addGoingCountByUserID(userID, yelpID, callback) {
    Business.findOneAndUpdate(
        {"yelpID" : yelpID},
        {
            $inc: {"goingCount": 1},
            $addToSet : {"going": userID}
        },
        {
            "projection": {
                "goingCount": true,
                "_id": false,
                "yelpID": true,
                "going": true
            },
        },
        function (err, doc) {
            if (err) return callback(err, null);
            return callback(null, doc);

        }
    );
};
