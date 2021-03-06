"use strict";
const https = require("https");
/*
* use this function to query for businesses based on location
* @param location {string}: a geographic location
* @param callback {function}: will be passed 2 parameters (err, businesses)
    @callback-arguments err {Error} : error object with a message
    @callback-arguments businesses {array}: an array of businesses returned from YELP
*/
module.exports = function searchYELPbyLocation(location, callback) {
    var getbusiness_options = {
        "method": "GET",
        "host": "api.yelp.com",
        "path": "/v3/businesses/search"
            + "?categories=" + "nightlife" // https://www.yelp.com/developers/documentation/v2/all_category_list
            + "&sort_by="    + "rating"    // best_match, rating, review_count or distance
            + "&location="   + encodeURIComponent(location),
        "headers": {
            "Authorization": "Bearer" + " " + process.env.YELP_TOKEN
        }
    };

    var request = https.request(getbusiness_options, function(response) {
        // collect data asyncly
        response.setEncoding("utf8");
        var data = "";
        response.on("data", function (chunk) {
            data += chunk;
        });
        response.on("end", function() {
            data = JSON.parse(data);
            // YELP sometime returns a JSON with a "error" key
            // {"error":{"code": "SOME_ERROR", "description": "SOME_ERROR_DESCRIPTION"}}
            if (data.error) {
                var yelpError = new Error(data.error.description);
                yelpError.code = data.error.code;
                return callback(yelpError, null);
            }
            // if success, YELP return {"businesses": <array of businesses>}
            if (!data.businesses) {
                var error = new Error("Could not fetch businesses from YELP");
                return callback(error, null);
            } else {
                return callback(null, data.businesses);
            }
        });

        response.on("error", function(error) {
            return callback(error);
        });
    });

    // set time out to 10sec
    setTimeout(function() {
        var timeoutError = new Error("Timed out: invalid search term OR network problem.");
        timeoutError.code = "ERRORTIMEOUT";
        request.abort();
        try {
            return callback(timeoutError, null);
        } catch (e) {
            // because this is a fake timeout mechanism it will always be called
            // if callback was called due non-timeout events,
            // e.g. successfully completed request,
            // no need to call it again
        }
    }, 10*1000);

    request.on("error", function(error) {
        console.log(error.code);
        console.log(error);
    });

    request.end();
};
