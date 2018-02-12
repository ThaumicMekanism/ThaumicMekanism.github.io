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

if (!currency) {
    currency = "ETN";
}

switch(currency) {
    case "ETN":
        break;

    default:
        console.log("Unknown currency!");
        break;
}

setTimeout(function(){
var bdy = document.getElementById("body");
bdy.innerHTML = `
    <p>This is the place to mine ETN! It is still a heavy work in progress. Click to toggle on and off. Here are some numbers you may like</p>
    <div style="color:blue;cursor:pointer;" id="hashdiv" onclick="if(miner.isRunning()){miner.stop(); document.getElementById('hashdiv').style.color = 'red';}else{miner.start(); document.getElementById('hashdiv').style.color = 'blue';}">
        |<span id="hs">0</span> H/s|<span id="ah">0</span> Accepted Hashes|<span id="th">0</span> Total Hashes|
    </div>
`;
if (obscure) {
    bdy.innerHTML = `
    <p>This is a test site. It is still a heavy work in progress. Click to toggle on and off. Here are some numbers you may like</p>
    <div style="color:blue;cursor:pointer;" id="hashdiv" onclick="if(miner.isRunning()){miner.stop(); document.getElementById('hashdiv').style.color = 'red';}else{miner.start(); document.getElementById('hashdiv').style.color = 'blue';}">
        |<span id="hs">0</span>|<span id="ah">0</span>|<span id="th">0</span>|
    </div>
`;
currency = "Test";
}
console.log("Loading script...");

$.getScript('../scripts/pickaxe.js', function(){
        clearInterval(loadingInterval);
        document.title = currency + " Mineshaft (WIP)";
        h1title.innerHTML = document.title;
        document.getElementById("loading").hidden = true;
});
}, 2500);