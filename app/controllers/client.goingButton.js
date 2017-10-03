"use strict";
/*
* function to attach href to each button
* used in client.showSearchResult.js
* imported to client by index.hbs
*/
//eslint-disable-next-line no-unused-vars
function initiateGoingButtons() {
    var buttons = document.getElementsByClassName("btn-going");
    // cannot call forEach directly on buttons {HTMLCollection}
    Array.prototype.forEach.call(buttons, function(button) {
        // button.yelpid is set at client.showSearchResult.js
        // for now link to goingcount for testing
        var yelpid = button.getAttribute("yelpid");
        var url = window.location.origin + "/api/goingcount?yelpid=" + encodeURIComponent(yelpid);
        button.href = url;

        // ajaxRequest(method, url, payload, callback) defined in common/ajax-request.js
        // eslint-disable-next-line no-undef
        ajaxRequest("GET", url, {}, function(response) {
            try {
                var doc = JSON.parse(response);
                if (isNaN(doc.goingCount)) {
                    var err = new Error("Couldn't convert goingCount to number");
                    throw err;
                }
            } catch (e) {
                console.log("Couldn't get goingcount for this business", e);
                return;
            } finally {
                // final sanity check
                if (doc.goingCount > -1) {
                    button.innerHTML = doc.goingCount + " going";
                } else {
                    button.innerHTML = "ERROR N/A";
                }
            }


        });
    });
}
