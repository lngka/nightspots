const path = require("path");
const searchYELPbyLocation = require(path.join(process.cwd(), "app/controllers/server.searchYELP.js"));
const searchReviewsByID = require(path.join(process.cwd(), "app/controllers/server.searchReviews.js"));

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
            var id = review_for;
            searchReviewsByID(id, function(err, reviews) {
                if (err) {
                    var errorJSON = {
                        "error": {
                            "code": err.code,
                            "description": err.message
                        }
                    };
                    return res.status(500).json(errorJSON);
                } else {
                    res.status(200).json({"reviews": reviews});
                }
            });
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
