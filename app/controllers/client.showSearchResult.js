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
        card.img.src = business.image_url;
        card.title.innerHTML = business.name;
        parentDiv.appendChild(card.cardNode);
    });
    return;
}

function newResultCard() {
    var cardBlock = newDOMElement("div", {"class": "card-block"});
    var title = newDOMElement("h4", {"class": "card-title"});
    var text = newDOMElement("p", {"class": "card-text"});
    cardBlock.appendChild(title);
    cardBlock.appendChild(text);

    var cardFooter = newDOMElement("div", {"class": "card-footer"});
    var footerText = newDOMElement("small", {"class": "text-muted"});
    cardFooter.appendChild(footerText);

    var cardNode = newDOMElement("div", {"class": "card"});
    var img = newDOMElement("img", {"class": "card-img-top", "src": "#", "alt": "business's pic"});
    cardNode.appendChild(img);
    cardNode.appendChild(cardBlock);
    cardNode.appendChild(cardFooter);

    // put everything together and return
    var retObj = {
        "cardNode": cardNode,
        "img": img,
        "title": title,
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
//         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     </div>
//     <div class="card-footer">
//         <small class="text-muted">0 are going</small>
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
