"use strict";
/*
* client script to load user last search after logged in
*/
//eslint-disable-next-line no-undef
onDOMready(function() {
    let searchField = document.querySelector("#searchField");

    try { //if user is logged in
        let location = document.querySelector("#lastSearchedLocation").innerHTML;
        searchField.value = location;
        //eslint-disable-next-line no-undef
        displayNightspotsByLocation(location, function(err) {// defined in client.searchController.js
            if (err) alert(err.message);
        });
    } catch (e) {
        try { // we may have saved a cookie for this before
            let location = document.querySelector("#cookieLocation").innerHTML;
            searchField.value = location;
            //eslint-disable-next-line no-undef
            displayNightspotsByLocation(location, function(err) {// defined in client.searchController.js
                if (err) alert(err.message);
            });
        } catch (e) {
            return console.log(e);
        }
    }
});
