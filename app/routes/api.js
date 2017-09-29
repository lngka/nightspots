const https = require("https");
module.exports = function(app) {
    app.get("/api/search", function(req, res) {
        var location = req.query.location;
        var review_for =  req.query.review_for;

        if (!location && !review_for) {
            res.status(400).send("Request must specify either a location or review_for={id} as url query");
        }

        if (location && review_for) {
            res.status(400).send("Request must specify either a location OR review_for={id} as url query. Not both.");
        }
        
        if (review_for) {
            var getreview_options = {
                "method": "GET",
                "host": "api.yelp.com",
                "path": "/v3/businesses/" + review_for + "/reviews",
                "headers": {
                    "Authorization": "Bearer" + " " + process.env.YELP_TOKEN
                }
            };

            var reqReviewByID = https.request(getreview_options, function(response) {
                // collect data asyncly
                response.setEncoding("utf8");
                var data = "";
                response.on("data", function (chunk) {
                    data += chunk;
                });
                response.on("end", function() {
                    res.send(data);
                });
            });

            reqReviewByID.end();
        }

        if (location) {
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

            var reqBusinessByLocation = https.request(getbusiness_options, function(response) {
                // collect data asyncly
                response.setEncoding("utf8");
                var data = "";
                response.on("data", function (chunk) {
                    data += chunk;
                });
                response.on("end", function() {
                    res.send(data);
                });
            });

            reqBusinessByLocation.end();
        }
    });
};
