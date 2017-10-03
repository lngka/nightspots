module.exports = function(app) {
    app.get("/", function(req, res) {
        var options = {
            "css": "/public/css/index.css"
        };

        // render user ID in html, client script find this to
        // know if user's logged in, without having to ask server
        if (req.isAuthenticated()) {
            options.user = {"userID": req.user.id};
        }

        res.render("index", options);
    });
};
