"use strict";

module.exports = function(app, passport) {
    app.get("/auth/twitter", passport.authenticate("twitter"));

    app.get("/auth/twitter/callback", passport.authenticate("twitter", {
        "successRedirect": "/success",
        "failureRedirect": "/failure"
    }));
};