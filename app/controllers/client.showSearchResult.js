"use strict";
/*eslint-disable no-unused-vars*/
/*
* function to render search result on index.hbs
* also render the goingButton
* @param parentDiv {object}: a DOM element which contains result
* @param businesses {array}: a array of objects representing businesses returned from YELP
*/
function showSearchResult(parentDiv, businesses) {
    businesses.forEach(function(business) {
        var card = newResultCard();
        // adding content: basic info
        card.img.src = business.image_url;
        card.title.innerHTML = business.name;
        card.anchor_on_img.href = business.url;
        card.anchor_on_title.href = business.url;

        // remember the business ID on each button
        // button is a styled <a>
        card.goingButton.setAttribute("yelpid", business.id);

        // adding content: reviews, if possible
        if (business.reviews.length) {
            // business.reviews = [{"url": "someurl", "text": "sometext"}, {...}, {...}]
            card.text.innerHTML = business.reviews[0].text;
        } else {
            card.text.innerHTML = "[Review Unavailable]";
        }

        parentDiv.appendChild(card.cardNode);
    });
}

/*
* function to create a card element to ccontain search results
* @return retObj {object}: a object points to the created card and its child-elements
*/
// <div class="card">
//     <img class="card-img-top" src="" alt="Card image cap">
//     <div class="card-block">
//         <h4 class="card-title">Card title</h4>
//         <p class="card-text">txtextext</p>
//     </div>
//     <div class="card-footer">
//         <small class="text-muted">textextext</small>
//     </div>
// </div>
function newResultCard() {
    var cardBlock = newDOMElement("div", {"class": "card-block"});
    var title     = newDOMElement("a", {"class": "card-title", "href": "#"});
    var hr        = newDOMElement("hr");
    var text      = newDOMElement("p", {"class": "card-text"});
    cardBlock.appendChild(title);
    cardBlock.appendChild(hr);
    cardBlock.appendChild(text);


    var img      = newDOMElement("img", {"class": "card-img-top", "src": "#", "alt": "business's pic"});
    var anchor_on_img = newDOMElement("a", {"href": "#"});
    anchor_on_img.appendChild(img);

    var cardFooter = newDOMElement("div", {"class": "card-footer"});
    var footerText = newDOMElement("small");
    var goingButton = newDOMElement("a", {"class": "btn btn-going"});// element with btn-going will be impemented with script
    goingButton.href = "#";
    footerText.appendChild(goingButton);
    cardFooter.appendChild(footerText);

    var cardNode = newDOMElement("div", {"class": "card"});
    cardNode.appendChild(anchor_on_img);
    cardNode.appendChild(cardBlock);
    cardNode.appendChild(cardFooter);

    // put everything together and return
    var retObj = {
        "cardNode": cardNode,
        "img": img,
        "anchor_on_img": anchor_on_img,
        "title": title,
        "anchor_on_title": title, // styling reason, title is already an anchor
        "text": text,
        "footerText": footerText,
        "goingButton": goingButton
    };
    return retObj;
}

/*
* use this function to create any DOM element and set its attributes
* @param type {string}: a string representing a html tag, for example: "html", "p", "img"
* @param attributes {object}: attributes, if any, to be set on the element
* @return el {object}: the created DOM object
*/
function newDOMElement(type, attributes) {
    if(!type) {
        var err = new Error("Couldn't create DOM element, invalid 'type' argument");
        throw err;
    }
    var el = document.createElement(type);
    if (attributes) {
        for (var key in attributes) {
            if (key == "class") {
                el.className = attributes[key];
            } else {
                el[key] = attributes[key];
            }
        }
    }
    return el;
}
