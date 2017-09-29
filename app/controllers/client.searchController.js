"use strict";
/*eslint-disable no-undef*/
//used in index.hbs
onDOMready(function() {
    var submitBtn = document.querySelector("#submitBtn");

    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();

        // get user input
        var location = document.forms.searchForm.searchField.value;
        if (!location) {
            return alert("Please specify a location");
        }

        findBusinessesByLocation(location, function(err, businesses) {
            if (err) {
                return alert(err);
            }

            var resultDiv = document.querySelector("#resultDiv");
            // showSearchResult(parentDiv, businesses)
            loadingScreen(resultDiv);
            showSearchResult(resultDiv, businesses);
        });
    });

    /*
    * clear old result and display loading screen
    */
    function loadingScreen(resultDiv) {
        resultDiv.innerHTML = "";
    }

    /*
    * search for businesses by location
    * @param location {string}: a geographic location
    * @param callback {function}
    *   @callback-argument err {error}: thrown when fails
    *   @callback-argument response.businesses {array}: an array of objects containing info about businesses near location
    */
    function findBusinessesByLocation(location, callback) {
        var url = window.location.href + "api/search?location=" + encodeURIComponent(location);

        // ajaxRequest(method, url, payload, callback)
        ajaxRequest("GET", url, {}, function(response) {
            response = JSON.parse(response);
            console.log(response);
            if (response.businesses) {
                return callback(null, response.businesses);
            } else {
                var err = new Error("Could not find businesses by location");
                return callback(err);
            }

        });
    }
});
