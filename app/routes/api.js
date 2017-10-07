const path = require("path");
const searchYELPbyLocation  = require(path.join(process.cwd(), "app/controllers/server.searchYELP.js"));
const searchReviewsByID     = require(path.join(process.cwd(), "app/controllers/server.searchReviews.js"));
const searchYELPwithReviews = require(path.join(process.cwd(), "app/controllers/server.searchYELPwithReviews.js"));
const ensureAuthenticated   = require(path.join(process.cwd(), "app/common/ensure-authenticated.js"));
const goingCountByID        = require(path.join(process.cwd(), "app/controllers/server.goingCountByID.js"));
const addGoingCountByUserID   = require(path.join(process.cwd(), "app/controllers/server.addGoingCountByUserID.js"));
const saveLastSeachedLocation = require(path.join(process.cwd(), "app/controllers/server.saveLastSeachedLocation.js"));

module.exports = function(app) {
    app.get("/api/search", function(req, res) {
        var location = req.query.location;
        var review_for =  req.query.review_for;
        var withReview = (req.query.withReview == "true") ? true : false;

        if (!location && !review_for) {
            res.status(400).send("Request must specify either a location or review_for={id} as url query");
        }

        if (location && review_for) {
            res.status(400).send("Request must specify either a location OR review_for={id} as url query. Not both.");
        }

        if (review_for) {
            var id = review_for;
            searchReviewsByID(id, function(err, reviews) {
                if (err) {
                    return res.status(500).json({
                        "error": {
                            "code": err.code,
                            "description": err.message
                        }
                    });
                } else {
                    res.status(200).json({"reviews": reviews});
                }
            });
        }

        if (location && !withReview) {
            searchYELPbyLocation(location, function(err, businesses){
                if (err) {
                    return res.status(500).json({
                        "error": {
                            "code": err.code,
                            "description": err.message
                        }
                    });
                } else {
                    // return a json because other routes do
                    res.json({"businesses": businesses});
                }
            });
        }

        if(location && withReview) {
            searchYELPwithReviews(location, function(err, businesses) {
                if (err) {
                    return res.status(500).json({
                        "error": {
                            "code": err.code,
                            "description": err.message
                        }
                    });
                } else {

                    // save the location in DB if user is logged in
                    if (req.isAuthenticated()) {
                        saveLastSeachedLocation(req.user.id, location, function(err) {
                            console.log(err);
                        });
                    } else {
                        // save as a cookie for others
                        res.cookie("location", location, {"maxAge": 1000 * 60 * 60 * 24 * 7});
                    }
                    return res.status(200).json({"businesses": businesses});
                }
            });
        }
    });

    // return the goingcount of the yelpid in query
    app.get("/api/goingcount", function(req, res) {
        var yelpid = req.query.yelpid;
        if (!yelpid) {
            return res.status(400).send("Request must specify a yelpid in query");
        } else {
            goingCountByID(yelpid, function(err, doc) {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    return res.status(200).json(doc);
                }
            });
        }
    });

    app.post("/api/metoo", ensureAuthenticated, function(req, res) {
        var yelpID = req.body.yelpID;
        var userID = req.body.userID;
        if (userID !== req.user.id) {
            return res.status(401).send("User not logged in server");
        }
        addGoingCountByUserID(userID, yelpID, function(err, doc) {
            if (err) return res.status(500).send(err.message);
            res.status(200).json(doc);
        });
    });
};
