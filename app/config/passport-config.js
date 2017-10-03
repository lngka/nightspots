"use strict";
const TwitterStrategy = require("passport-twitter").Strategy;
const path = require("path");
const User = require(path.join(process.cwd(), "/app/models/user.js"));

module.exports = function configurePassport(passport) {
    passport.use("twitter", new TwitterStrategy({
        "consumerKey": process.env.TWITTER_ID,
        "consumerSecret": process.env.TWITTER_SECRET,
        "callbackURL": path.join(process.env.APP_URL, "/auth/twitter/callback")
    },
    function(token, tokenSecret, profile, done) {
        var newUser = {
            "twitter": {
                "twitterID": profile.id,
                "displayName": profile.displayName,
                "token": token,
                "tokenSecret": tokenSecret,
                "accessLevel": profile._accessLevel
            }
        };

        //collection.findOrCreate(query object, object to create, callback)
        User.findOrCreate({"twitter.twitterID": profile.id}, newUser, function(err, user) {
            return done(err, user);
        });
    }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
