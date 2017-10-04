const path = require("path");
const loadLastSearch = require(path.join(process.cwd(), "app/controllers/server.loadLastSearch.js"));

module.exports = function(app) {
    app.get("/", function(req, res) {
        var options = {
            "css": "/public/css/index.css"
        };

        // render user ID in html, client script finds this to...
        // know if user's logged in, without having to ask server
        if (req.isAuthenticated()) {
            loadLastSearch(req.user.id, function(err, doc){
                options.user = {"userID": req.user.id};

                // render this to help client.loadLastSearch.js
                options.user.lastSearchedLocation = doc.lastSearchedLocation;
                res.render("index", options);
            });
        } else {
            // render this to help client.loadLastSearch.js
            // this cookie is set in api.js
            options.cookieLocation = (req.cookies.location) ? req.cookies.location : "";
            console.log(options);
            res.render("index", options);
        }
    });
};
