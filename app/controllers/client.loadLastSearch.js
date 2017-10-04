"use strict";
/*
* client script to load user last search after logged in
*/
//eslint-disable-next-line no-undef
onDOMready(function() {
    try { //if user is logged in
        var location = document.querySelector("#lastSearchedLocation").innerHTML;
        var searchField = document.querySelector("#searchField");
        searchField.value = location;
        //eslint-disable-next-line no-undef
        displayNightspotsByLocation(location, function(err) {// defined in client.searchController.js
            if (err) alert(err.message);
        });
    } catch (e) {
        return console.log(e);
    }
});
