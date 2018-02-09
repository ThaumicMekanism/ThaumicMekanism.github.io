/*
This script contains my jQuery Utilities.
*/

if (!window.jQuery) {
    throw new Error("JQuery not loaded!");
    filename = "../scripts/jquery.min.js";
    var fileref=document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", filename);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}


/*
    This is the JQuery way of loading a script, and it then executes some commands based off of it. Ex.
    if (typeof someObject == 'undefined') $.loadScript('url_to_someScript.js', function(){
        //Stuff to do after someScript has loaded
    });
*/
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: function(data) {
            eval(data);
            callback();
        },
        dataType: "text",
        async: true
    });
}

function refreshOnUpdate(delay){
    console.log("Setting page to refresh on base page update every " + delay + "ms.");
    var currenthtml;
    var latesthtml;

    $.get(window.location.href, function(data) {
        currenthtml = data;
        latesthtml = data;
    });

    setInterval(function() {

        $.get(window.location.href, function(data) {
            latesthtml = data;
        });

        if(currenthtml != latesthtml) {
            console.log("Page updated! Refreshing...");
            location.reload();
        } 
    }, delay);
}