// ==UserScript==
// @name         Bookmarklet Library
// @namespace    http://tampermonkey.net/
// @version      2023.10.10.04
// @description  try to take over the world!
// @author       jtshiv
// @include      *
// @downloadURL	 https://raw.githubusercontent.com/jtshiv/Bookmarklets/main/bookmarkLibrary.user.js
// @supportURL	 https://github.com/jtshiv/Bookmarklets/issues/new
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_getResourceText
// @grant        unsafeWindow
// @grant        GM_addElement
// @grant        GM_xmlhttpRequest
// @connect      github.com
// @connect		 raw.githubusercontent.com
// @connect		 ajax.googleapis.com
// ==/UserScript==

(function() {
    'use strict';

    console.log("Bookmarklets loaded");

    // load scripts if youtube
    let d = document.domain;
    if (d === 'www.youtube.com'){
        youtube();
    } else if (d === 'm.youtube.com'){
        youtube();
    };

    // on youtube playlist urls, show snackbar that when clicked will go through the remove watched function
    function youtube(){

        let url = document.location.href;

        // Define regular expressions for both URL formats
        const regex = /youtube.com\/playlist/;

        // Try to match the URL with the regular expressions
        const match = url.match(regex);

        // Check which regex matched and return the playlist ID
        if (match) {

            // run two functions since the main modal has to be open for this particular script
            function runTwo(a,b){
                /*if (typeof a !== 'function') {
                    setTimeout(runTwo(a,b),200);
                    return;
                };*/
                checkLibraryLoadRequest(true);
                setTimeout(function(){
                    unsafeWindow['mainScript']();
                    unsafeWindow['rmWatchedYt']();
                },1000);
            }
            console.log("load the snackbar!");
            setTimeout(unsafeWindow.createSnackbarFn1("Remove watched",runTwo),1000)
        } else {
            return null; // Return null if the URL format doesn't match
        }

    }



    function checkLibraryLoadRequest(){
        if (typeof (unsafeWindow.Bm_bLibraryRequest) != 'undefined') {      // value set as request from bookmarklet
            if (typeof (unsafeWindow.Bm_bLibraryLoaded) == 'undefined') {    // value set inside library script
                let oScript = document.createElement ('script');
                oScript.type = 'text/javascript';
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: "https://github.com/jtshiv/Bookmarklets/raw/main/bmlib.js?v=" + Date.now(),
                    onload: function(response){
                        GM_addElement(document.body,'script',{
                            textContent: response.responseText
                        });
						unsafeWindow.Bm_bLibraryLoadedComp = true;
                    }
                })

            }

        } else {
            setTimeout (checkLibraryLoadRequest, 100);   // check every 100 ms
        }

        return;
    } // checkLibraryLoadRequest


    checkLibraryLoadRequest();

    function checkjQueryLoadRequest(){
        if (typeof (Bm_bLibraryjQuery) != 'undefined') {
            if (typeof (unsafeWindow.Bm_bLibraryJQLoaded) == 'undefined') {
                unsafeWindow.Bm_bLibraryJQLoaded=true;

                let oScript = document.createElement ('script');
                oScript.type = 'text/javascript';
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
                    onload: function(response){
                        GM_addElement(document.body,'script',{
                            textContent: response.responseText
                        });
						unsafeWindow.Bm_bLibraryjQueryComp = true;
                    }
                })
            }
        } else {
            setTimeout (checkjQueryLoadRequest, 100);   // check every 100 ms
        }

        return;
    }

    checkjQueryLoadRequest()

    // EXAMPLE Bookmarklet shell/template:
    // javascript:(function(){window.Bm_bLibraryRequest=true;setTimeout(function(){window['addjQuery']();},200);})()
    // add jquery
    // javascript:(function(){window.Bm_bLibraryjQuery=true;setTimeout(function(){console.log('bookmarklet ran');},200);})()
})();
