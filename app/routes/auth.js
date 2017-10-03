"use strict";
const path = require("path");
const loadLastSearch = require(path.join(process.cwd(), "app/controllers/server.loadLastSearch.js"));

module.exports = function(app, passport) {
    app.get("/auth/twitter", passport.authenticate("twitter"));

    app.get("/auth/twitter/callback", passport.authenticate("twitter"),
        function(req, res) {
            if (req.isAuthenticated()) {
                loadLastSearch(req.user.id, function(err, doc){
                    var options = {
                        "css": "/public/css/index.css"
                    };
                    options.user = {"userID": req.user.id};
                    options.user.lastSearchedLocation = doc.lastSearchedLocation;
                    res.render("index", options);
                });
            } else {
                res.redirect("/");
            }
        });
};
