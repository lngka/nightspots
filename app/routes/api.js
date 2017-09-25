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
                "path": "/v3/businesses/search" + "?location=" + encodeURIComponent(location),
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
