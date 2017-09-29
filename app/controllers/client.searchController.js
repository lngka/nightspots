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

        findBusinessesByLocation(location, function(businesses) {
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
    */
    function findBusinessesByLocation(location, callback) {
        // build url
        var url = window.location.href + "api/search?location=" + encodeURIComponent(location);

        // ajaxRequest(method, url, payload, callback)
        ajaxRequest("GET", url, {}, function(response) {
            response = JSON.parse(response);
            callback(response.businesses);
        });
    }
});
