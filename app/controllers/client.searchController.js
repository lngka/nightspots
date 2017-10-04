"use strict";
/*eslint-disable no-undef*/
//used in index.hbs
onDOMready(function() {
    var submitBtn = document.querySelector("#submitBtn");

    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();

        //"searchForm", "searchField"
        // are ids of a <form> and a <input>, check index.hbs for more
        var location = document.forms.searchForm.searchField.value;
        if (!location) {
            return alert("Please specify a location");
        }

        displayNightspotsByLocation(location, function(err) {
            if (err) {
                return alert(err.message);
            }
        });
    });
});
/*
* Use this to query YELP & render results
* @param location {string}: a geographic location
* @param callback {function}
*   @callback-argument err {error}: thrown when findBusinessesByLocation fails
*/
function displayNightspotsByLocation(location, callback) {
    findBusinessesByLocation(location, function(err, businesses) {
        if (err) {
            return callback(err);
        }

        var resultDiv = document.querySelector("#resultDiv");
        // showSearchResult(parentDiv, businesses)
        loadingScreen(resultDiv);
        showSearchResult(resultDiv, businesses); // client.showSearchResult.js
        initiateGoingButtons(); //app/controllers/client.goingButton.js

        return callback(null);
    });
}

/*
* query YELP for businesses by location
* @param location {string}: a geographic location
* @param callback {function}
*   @callback-argument err {error}: thrown when fails
*   @callback-argument response.businesses {array}: an array of objects containing info about businesses near location
*/
function findBusinessesByLocation(location, callback) {
    var url = window.location.origin + "/api/search?location=" + encodeURIComponent(location);

    // to include reviews in the result add parameter "withReview" to the query
    url += "&withReview=true";

    // ajaxRequest(method, url, payload, callback)
    ajaxRequest("GET", url, {}, function(response) {
        try {
            response = JSON.parse(response);
        } catch (e) {
            return callback(e, null);
        }
        // in case of error, server replies with {"error":{"code": "foobar", "description": "barbaz"}}
        if (response.error) {
            var err = new Error(response.error);
            return callback(err, null);
        } else {
            return callback(null, response.businesses);
        }
    });
}

/*
* clear old result and display loading screen
*/
function loadingScreen(resultDiv) {
    resultDiv.innerHTML = "";
}
