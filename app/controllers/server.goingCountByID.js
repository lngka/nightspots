"use strict";
const path = require("path");
const Business = require(path.join(process.cwd(), "app/models/business.js"));


module.exports = function(yelpID, callback) {
    if (!yelpID || typeof yelpID !== "string") {
        var err = new Error("Invalid/Missing yelpID: get going count without yelpID impossible");
        return callback(err, null);
    } else {
        Business.findOne({"yelpID": yelpID}, "goingCount yelpID", function(err, doc) {
            if (err) return callback(err, null);
            if (doc) {
                return callback(null, doc);
            } else { // create if not found
                var goingCount = fakeGoingCount();
                var newBusiness = new Business({
                    "yelpID": yelpID,
                    "goingCount": goingCount,
                    "going": []
                });

                // save and find again
                newBusiness.save(function(err) {
                    if (err) return callback(err, null);
                    Business.findOne({"yelpID": yelpID}, "goingCount yelpID", function(err, doc) {
                        return callback(err, doc);
                    });
                });
            }
        });
    }
};

function fakeGoingCount() {
    var firstRoll = Math.random().toFixed(2) * 100;
    var secondRoll = 0;
    if (firstRoll < 40) {
        return secondRoll;
    }

    if (firstRoll < 60) {
        secondRoll = Math.random().toFixed(2) * 10;
        return Math.floor(secondRoll);
    }

    if (firstRoll < 80) {
        secondRoll = Math.random().toFixed(2) * 20;
        return Math.floor(secondRoll);
    }

    if (firstRoll < 90) {
        secondRoll = Math.random().toFixed(2) * 50;
        return Math.floor(secondRoll);
    }

    if (firstRoll < 100) {
        secondRoll = Math.random().toFixed(2) * 100;
        return Math.floor(secondRoll);
    }
}
