"use strict";
const path                 = require("path");
const searchYELPbyLocation = require(path.join(process.cwd(), "app/controllers/server.searchYELP.js"));
const searchReviewsByID    = require(path.join(process.cwd(), "app/controllers/server.searchReviews.js"));
/*
* use this function to query for businesses based on location
* and then include reviews for each business
* @param location {string}: a geographic location
* @param callback {function}: will be passed 2 parameters (err, businesses)
    @callback-arguments err {Error} : error object with a message
    @callback-arguments businesses {array}: an array of businesses returned from YELP
*/
module.exports = function searchYELPwithReviews(location, callback) {
    searchYELPbyLocation(location, function(err, businesses) {
        if (err) {
            return callback(err, null);
        }

        var callback_count = 0;
        var businessesTotal = businesses.length;

        businesses.forEach(function(business) {
            searchReviewsByID(business.id, function(err, reviews) {
                if (err) {
                    // contiue counting callbacks even if err exists
                    business.reviews = {
                        "error": {
                            "code": "NO_YELP_REVIEWS",
                            "description": err.message
                        }
                    };
                } else {
                    business.reviews = reviews;
                }
                // only call callback when all businesses has its reviews attached
                callback_count++;
                if (callback_count == businessesTotal) {
                    return callback(null, businesses);
                }

            });
        });
    });
};
