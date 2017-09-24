"use strict";
const https = require("https");

module.exports = function getYelpToken() {
    if (process.env.YELP_TOKEN) {
        return process.env.YELP_TOKEN;
    } else {
        // ask YELP for access token
        var post_data = {
            "client_id": process.env.YELP_ID,
            "client_secret": process.env.YELP_SECRET,
            "grant_type": "client_credentials"
        };
        var post_data_urlencoded = "";
        for (var key in post_data) {
            post_data_urlencoded += encodeURIComponent(key) + "=" + encodeURIComponent(post_data[key]) + "&";
        }
        var options = {
            "method": "POST",
            "host": "api.yelp.com",
            "path": "/oauth2/token",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(post_data_urlencoded)
            }

        };

        var yelpTokenRequest = https.request(options, function(res) {
            res.setEncoding("utf8");
            var data = "";
            res.on("data", function (chunk) {
                data += chunk;
            });

            res.on("end", function() {
                var response =  JSON.parse(data);
                if (response["access_token"]) {
                    process.env.YELP_TOKEN = response["access_token"];
                    console.log("Got access_token from YELP: ");
                    console.log(process.env.YELP_TOKEN);
                } else {
                    console.log(data);
                    console.log("FATAL could not get YELP access_token");
                    console.log("Exit code 1");
                    return process.exit(1);
                }
            });
        });
        yelpTokenRequest.write(post_data_urlencoded);
        yelpTokenRequest.end();
    }
};
