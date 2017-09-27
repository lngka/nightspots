"use strict";
/*eslint-disable no-unused-vars*/
//used in index.hbs
function ajaxRequest(method, url, payload, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            callback(xmlhttp.response);
        }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.write(payload);
    xmlhttp.send();
}
