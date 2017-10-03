"use strict";
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("Logged in browser session required");
    }
};
