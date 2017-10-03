const path = require("path");
const loadLastSearch = require(path.join(process.cwd(), "app/controllers/server.loadLastSearch.js"));

module.exports = function(app) {
    app.get("/", function(req, res) {
        var options = {
            "css": "/public/css/index.css"
        };

        // render user ID in html, client script find this to
        // know if user's logged in, without having to ask server
        if (req.isAuthenticated()) {
            loadLastSearch(req.user.id, function(err, doc){
                options.user = {"userID": req.user.id};
                options.user.lastSearchedLocation = doc.lastSearchedLocation;
                console.log(options);
                res.render("index", options);
            });
        } else {
            res.render("index", options);
        }
    });
};
