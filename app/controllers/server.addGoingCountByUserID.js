"use strict";
const path = require("path");
const Business = require(path.join(process.cwd(), "/app/models/business.js"));
/*
* function to increment going count by 1
* @param userID {string}: valid objectID string
* @param yelpID {string}: business ID string provided by YELP
* @param callback {function}: will be passed (err, doc)
*   @callback-arg err {Error}: most likely error from mongoose
*   @callback-arg doc {object}: JSON object with the old goingCount
*/
module.exports = function addGoingCountByUserID(userID, yelpID, callback) {
    Business.count({"yelpID": yelpID, "going": userID}, function(err, count) {
        if (err) {
            return callback(err, null);
        }

        if (count) {
            // treat repeated registration as a "soft" error
            var doc = {"error": "Already going"};
            return callback(null, doc);
        } else {
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
                    "new": true
                },
                function (err, doc) {
                    if (err) return callback(err, null);
                    return callback(null, doc);
                }
            );
        }
    });
};
