"use strict";
/*eslint-disable no-undef*/
onDOMready(function() {

    var submitBtn = document.querySelector("#submitBtn");
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("im here");
    });
});
