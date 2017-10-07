"use strict";
/*
* client script to load user last search after logged in
*/
//eslint-disable-next-line no-undef
onDOMready(function() {
    let searchField = document.querySelector("#searchField");

    try { //#lastSearchedLocation is rendered if user logged in
        let location = document.querySelector("#lastSearchedLocation").innerHTML;
        searchField.value = location;

        if (location) {
            //eslint-disable-next-line no-undef
            displayNightspotsByLocation(location, function(err) {//defined in client.searchController.js
                if (err) alert(err.message);
            });
        }
    } catch (e) {
        try { // even if not logged in...
            let location = document.querySelector("#cookieLocation").innerHTML;
            searchField.value = location;
        
            //there might be a cookie from last user's session
            if (location) {
                //eslint-disable-next-line no-undef
                displayNightspotsByLocation(location, function(err) {// defined in client.searchController.js
                    if (err) alert(err.message);
                });
            }
        } catch (e) {
            return console.log(e);
        }
    }
});
