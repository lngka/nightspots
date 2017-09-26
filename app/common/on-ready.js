"use strict";
/*eslint-disable no-unused-vars*/
// used in: index.hbs
function onDOMready(callback) {
    if (typeof callback != "function") {
        return console.log("Invalid argument, callback must be a function");
    }

    if (document.readyState == "complete") {
        return callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}
/*eslint-enable*/
