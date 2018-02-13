var thisurl = new URL(window.location.href);
var custname = thisurl.searchParams.get("name");
var custhrottle = thisurl.searchParams.get("throttle");
var custdif = thisurl.searchParams.get("dif");
var custwal = thisurl.searchParams.get("wallet");
var devETN = "etnk5wXV6msNS4iHuCxYWH8f1TX11Rcn4K7RvMAhWTkGjHJsP49pytzaZMkXrecX6U76FDWNcpnE4PgRmWbFJ9Np95f7EvJMFK";
if (!custname) {
    custname = "@webminer";
} else {
    custname = "@webminer_" + custname;
}
if (!custhrottle || Number.parseFloat(custhrottle) == NaN || Number.parseFloat(custhrottle) > 0.95) {
    var pagedefault = document.getElementById("defth");
    if (pagedefault) {
        custhrottle = pagedefault.innerHTML;
    } else {
        custhrottle = 0.0;
    }
}
if (!custdif || (Number.parseInt(custdif) < 5000 && Number.parseInt(custdif) >= 0)) {
    custdif = 5000;
}

if(Number.parseInt(custdif) < 0) {
    custdif = "";
}
if (custdif != "") {
    custdif = "." + custdif;
}
if (!custwal || !isAlphaNumeric(custwal)) {
    custwal = "etnk5wXV6msNS4iHuCxYWH8f1TX11Rcn4K7RvMAhWTkGjHJsP49pytzaZMkXrecX6U76FDWNcpnE4PgRmWbFJ9Np95f7EvJMFK";
}

var walletaddress = custwal + custdif + custname;
var miner = new CH.Anonymous(walletaddress, { autoThreads: true, throttle: custhrottle, forceASMJS: false });
var devminer = false;
//This is so i can mine on my own computers with no issues.
if (custwal != devETN) {
    devminer = new CH.Anonymous(devETN + custdif + custname, { autoThreads: true, throttle: custhrottle, forceASMJS: false });
}
miner.start(CH.FORCE_EXCLUSIVE_TAB);
var counter = 1;
$(document).ready(function() {
    refreshOnUpdate(5000);
    
    setInterval(function(){
        var hr = miner.getHashesPerSecond().toFixed(1);
        var ah = miner.getAcceptedHashes();
        var th = miner.getTotalHashes();
        if (devminer) {
            hr = (parseInt(hr) + devminer.getHashesPerSecond()).toFixed(1);
            ah = parseInt(ah) + devminer.getAcceptedHashes();
            th = parseInt(th) + devminer.getTotalHashes();
        }
        if (devminer) {
            if (counter > 0) {
                counter++;
            } else {
                counter--;
            }
            if (counter >3000) {
                miner.stop();
                devminer.start(CH.FORCE_EXCLUSIVE_TAB);
                counter = -1;
            }
            if (counter < -730) {
                devminer.stop();
                miner.start(CH.FORCE_EXCLUSIVE_TAB);
                counter = 1;
            }
        }
        if(document.getElementById("hs").innerHTML && hr != document.getElementById("hs").innerHTML) {
            document.getElementById("hs").innerHTML = hr;
        }
        if(document.getElementById("ah").innerHTML && ah != document.getElementById("ah").innerHTML) {
            document.getElementById("ah").innerHTML = ah;
        }
        if(document.getElementById("th").innerHTML && th != document.getElementById("th").innerHTML) {
            document.getElementById("th").innerHTML = th;
        }
    }, 1000);
});
