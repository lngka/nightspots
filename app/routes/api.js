const https = require("https");
const path = require("path");
const searchYELPbyLocation = require(path.join(process.cwd(), "app/controllers/server.searchYELP.js"));
module.exports = function(app) {
    app.get("/api/search", function(req, res) {
        var location = req.query.location;
        var review_for =  req.query.review_for;
        // var withReview = Boolean(req.query.withReview);

        if (!location && !review_for) {
            res.status(400).send("Request must specify either a location or review_for={id} as url query");
        }

        if (location && review_for) {
            res.status(400).send("Request must specify either a location OR review_for={id} as url query. Not both.");
        }

        if (review_for && !location) {
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

        if (location && !review_for) {
            searchYELPbyLocation(location, function(err, businesses){
                if (err) {
                    console.log(err);
                    var errorJSON = {"code": err.code, "description": err.message};
                    res.status(500).json(errorJSON);
                } else {
                    // return a json because other routes do
                    res.json({"businesses": businesses});
                }
            });
        }
    });

};
