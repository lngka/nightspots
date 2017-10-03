module.exports = function(app) {
    app.get("/", function(req, res) {
        var options = {
            "css": "/public/css/index.css"
        };
        res.render("index", options);
    });

    app.get("/success", (req, res) => {
        console.log(req.session.passport);
        res.json(req.user);
    });
};
