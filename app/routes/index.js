module.exports = function(app) {
    app.get("/", function(req, res) {
        var options = {
            "css": "/public/css/index.css"
        };
        res.render("index", options);
    });
};
