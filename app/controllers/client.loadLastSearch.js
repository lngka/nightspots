"use strict";
/*
* client script to load user last search after logged in
*/
//eslint-disable-next-line no-undef
onDOMready(function() {
    try {
        var location = document.querySelector("#lastSearchedLocation").innerHTML;
        var searchField = document.querySelector("#searchField");
        searchField.value = location;
        document.forms[0].submit();
    } catch (e) {
        return console.log(e);
    }
});
