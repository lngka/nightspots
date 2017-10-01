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
        var yelpid = button.getAttribute("yelpid");
        var url = window.location.origin + "/api/goingcount?yelpid=" + encodeURIComponent(yelpid);

        button.href = url;
    });
}
