"use strict";
/*eslint-disable no-undef*/
//used in index.hbs
onDOMready(function() {

    var submitBtn = document.querySelector("#submitBtn");
    var searchForm = document.forms.searchForm;
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();

        // get user input
        var location = searchForm.searchField.value;
        if (!location) {
            return alert("Please specify a location");
        }

        // build url
        var url = window.location.href + "api/search?location=" + encodeURIComponent(location);
        console.log(url);
        // ajaxRequest(method, url, payload, callback)
        ajaxRequest("GET", url, {}, function(response) {
            console.log(JSON.parse(response));
        });
    });
});
