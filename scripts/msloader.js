basetitle = document.title;
h1title = document.getElementById("h1title");
counter = 0;
var loadingInterval = setInterval(function() {
    if (counter > 2) {
        document.title = basetitle;
        counter = 0;
    }
    document.title += ".";
    h1title.innerHTML = "|" + basetitle + "...".replaceAt(counter, " ") + "|";
    counter++;
}, 1000);

var thisurl = new URL(window.location.href);
var currency = thisurl.searchParams.get("currency");
var settingcurrency = false;
if (!currency) {
    currency = document.getElementById("currency");
    if (!currency) {
        currency = "ETN";
    } else {
        currency = currency.innerHTML;
    }
}

switch(currency) {
    case "ETN":
        break;

    case "TRTL":
        break;

    case "GRFT":
        break;

    default:
        console.log("Unknown currency!");
        currency = "ETN";
        break;
}

setTimeout(function(){
var bdy = document.getElementById("body");
bdy.innerHTML = `
    <p>This is the place to mine! It is still a heavy work in progress. Click to toggle on and off. Here are some numbers you may like</p>
    <div style="color:blue;cursor:pointer;" id="hashdiv" onclick="toggleminer();">
        |<span id="hs">0</span> H/s|<span id="ah">0</span> Accepted Hashes|<span id="th">0</span> Total Hashes|
    </div>
`;
var title = currency;
if (typeof obscure !== 'undefined' && obscure) {
    bdy.innerHTML = `
    <p>This is a test site. It is still a heavy work in progress. Click to toggle on and off. Here are some numbers you may like</p>
    <div style="color:blue;cursor:pointer;" id="hashdiv" onclick="toggleminer();">
        |<span id="hs">0</span>|<span id="ah">0</span>|<span id="th">0</span>|
    </div>
`;
title = "Test";
}
console.log("Loading script...");

$.getScript('../scripts/pickaxe.js', function(){
        clearInterval(loadingInterval);
        document.title = title + " Mineshaft (WIP)";
        h1title.innerHTML = document.title;
        document.getElementById("loading").hidden = true;
});
}, 2500);
