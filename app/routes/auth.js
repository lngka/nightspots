"use strict";

module.exports = function(app, passport) {
    app.get("/auth/twitter", passport.authenticate("twitter"));

    app.get("/auth/twitter/callback", passport.authenticate("twitter"),
        function(req, res) {
            if (req.isAuthenticated()) {
                var options = {
                    "user": {
                        "userID": req.user.id
                    },
                    "css": "/public/css/index.css"
                };
                res.render("index", options);
            } else {
                res.redirect("/");
            }
        });
};
