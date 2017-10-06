"use strict";
/*
* function to attach href to each button
* used in client.showSearchResult.js
* imported to client by index.hbs
*/
//eslint-disable-next-line no-unused-vars
function initiateGoingButtons() {
    var buttons = document.getElementsByClassName("btn-going");

    // cannot call forEach directly on buttons {HTMLCollection}
    Array.prototype.forEach.call(buttons, function(button) {
        updateButtonLabel(button);

        // now that we're done with the look, lets add the logic
        button.addEventListener("click", function(event) {
            event.preventDefault();

            // #user rendered if user is logged in and contain user ID
            // this means we mark a business as "going" fot the user
            try {
                var userID = document.querySelector("#user").innerHTML;
                var yelpID = button.getAttribute("yelpid");
                var url = window.location.origin + "/api/metoo";
                var payload = {"yelpID": yelpID, "userID": userID};
                // eslint-disable-next-line no-undef
                ajaxRequest("POST", url, payload, function(response){
                    // this route give a "soft" error (meaning with http code 200) when:
                    // user already marked a business als "going" before
                    try {
                        response = JSON.parse(response);
                        if (response.error) {
                            alert(response.error);
                        } else {
                            updateButtonLabel(button);
                        }
                    } catch (e) {
                        console.log(e);
                        updateButtonLabel(button); // update the button anyway just to be sure 
                    }
                });
            } catch (e) {
                // redirect to login otherwise
                var loginURL = window.location.origin + "/auth/twitter";
                window.location.assign(loginURL);
            }
        });
    });
}

/*
* function make get request and update button label with current goingCount
* @param button {object}: DOM Object for a button
*/
function updateButtonLabel(button) {
    // button.yelpid is set at client.showSearchResult.js
    var yelpid = button.getAttribute("yelpid");
    var url = window.location.origin + "/api/goingcount?yelpid=" + encodeURIComponent(yelpid);

    // ajaxRequest(method, url, payload, callback) defined in common/ajax-request.js
    // eslint-disable-next-line no-undef
    ajaxRequest("GET", url, {}, function(response) {
        try {
            var doc = JSON.parse(response);
            if (isNaN(doc.goingCount)) {
                var err = new Error("Couldn't convert goingCount to number");
                throw err;
            }
        } catch (e) {
            console.log("Couldn't get goingcount for this business", e);
            return;
        } finally {
            // final sanity check
            if (doc.goingCount > -1) {
                button.innerHTML = doc.goingCount + " going";
            } else {
                button.innerHTML = "ERROR N/A";
            }
        }
    });
}
