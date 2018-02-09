/*
    This script contains my basic javascript utilities.
*/

/*
    This function (currently only supporting javascrit and css files) will load any scripts into your page.
*/
function loadfile(filename) {
    filetype = filename.substring(filename.indexOf(".") + 1);
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (fileref) {
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
}

const isAlphaNumeric = ch => {
    return ch.match(/^[a-z0-9]+$/i) !== null;
}


String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}