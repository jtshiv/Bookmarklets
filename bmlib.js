var Bm_bLibraryLoaded = true;      // stops library from being loaded twice (just in case)

/**
 * Adds jQuery to the page
 */
var addjQuery = function(){
    var id = 'jqueryscript';
    if (!document.getElementById(id)) {
        var a = document.createElement('script');
        a.id = id;
        a.setAttribute("type", "text/javascript");
        a.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
        document.head.appendChild(a);
    };
};