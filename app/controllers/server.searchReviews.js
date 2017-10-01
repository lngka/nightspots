"use strict";
const https = require("https");
/*
* use this function to query for reviews based on business id
* @param id {string}: id of a business on YELP
* @param callback {function}: will be passed 2 parameters (err, reviews)
    @callback-arguments err {Error} : error object with a message
    @callback-arguments reviews {array}: an array of reviews returned from YELP
*/
module.exports = function searchReviewsByID(id, callback) {
    var getreview_options = {
        "method": "GET",
        "host": "api.yelp.com",
        "path": "/v3/businesses/" + encodeURIComponent(id) + "/reviews",
        "headers": {
            "Authorization": "Bearer" + " " + process.env.YELP_TOKEN
        }
    };

    var reqReviewByID = https.request(getreview_options, function(response) {
        var data = "";

        // collect data asyncly
        response.setEncoding("utf8");
        response.on("data", function (chunk) {
            data += chunk;
        });

        response.on("end", function() {
            try {
                data = JSON.parse(data);
            } catch (e) {
                e.message = "YELP gave invalid JSON for id=" + id + ": " + e.message;
                return callback(e, data);
            }
            // YELP sometime returns a JSON with a "error" key
            // {"error":{"code": "SOME_ERROR", "description": "SOME_ERROR_DESCRIPTION"}}
            if (data.error) {
                var yelpError = new Error(data.error.description);
                yelpError.code = data.error.code;
                return callback(yelpError, null);
            }

            // if success, YELP return {"reviews": <array of reviews>}
            if(!data.reviews) {
                var someError = new Error("Couldn't fetch reviews from YELP");
                return callback(someError, null);
            } else {
                return callback(null, data.reviews);
            }
        });

        response.on("error", function(err) {
            callback(err, null);
        });
    });

    reqReviewByID.end();
};
