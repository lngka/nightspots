"use strict";
/*eslint-disable no-unused-vars*/
/*
* function to update search result on index.hbs
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
    var footerText = newDOMElement("small", {"class": "text-muted"});
    var goingButton = newDOMElement("button", {"class": "btn btn-success"});
    goingButton.innerHTML = "0 Going";
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
        "footerText": footerText
    };
    return retObj;
}
// newResultCard output this :
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
function newDOMElement(type, attributes) {
    var el = document.createElement(type);
    for (var key in attributes) {
        if (key == "class") {
            el.className = attributes[key];
        } else {
            el[key] = attributes[key];
        }
    }
    return el;
}
