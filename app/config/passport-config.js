"use strict";
const TwitterStrategy = require("passport-twitter").Strategy;
const path = require("path");
const User = require(path.join(process.cwd(), "/app/models/user.js"));

module.exports = function configurePassport(passport) {
    passport.use("twitter", new TwitterStrategy({
        "consumerKey": process.env.TWITTER_ID,
        "consummerSecret": process.env.TWITTER_SECRET,
        "callbackURL": path.join(process.env.APP_URL, "/auth/twitter/callback")
    },
    function(token, tokenSecret, profile, done) {
        User.findOrCreate({"twitter.twitterID": profile.id}, function(err, user) {
            return done(err, user);
        });
    }
    ));
};
