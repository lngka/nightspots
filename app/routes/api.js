const https = require("https");
module.exports = function(app) {
    app.get("/api/search", function(req, res) {
        var location = req.query.location;
        if (!location) {
            res.status(400).send("Request must specify a location as url query");
        } else {
            var options = {
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
            var reqBusinessByLocation = https.request(options, function(response) {
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
