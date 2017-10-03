"use strict";
/*eslint-disable no-unused-vars*/
//used in index.hbs
function ajaxRequest(method, url, payload, callback) {
    var xmlhttp = new XMLHttpRequest();


    // true for async
    xmlhttp.open(method, url, true);

    // check if payload is NOT an empty object
    // because Object.keys(new Date()).length === 0;
    // we have to do some additional check
    if (!(Object.keys(payload).length === 0) && payload.constructor === Object) {
        xmlhttp.setRequestHeader("Content-Type", "application/json");
    }
    // xmlhttp.setRequestHeader("Content-Type", "application/json");


    xmlhttp.send(JSON.stringify(payload));

    // when response comes
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            callback(xmlhttp.response);
        }
    };
}
