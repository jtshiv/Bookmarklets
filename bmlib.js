/**
 * These functions are called with a bookmarklet that is injected with the 
 * Tampermonkey script bookmarkLibrary.js.
 * 
 * Here's an example to call:
 * javascript:(function(){window.Bm_bLibraryRequest=true;let i =0;function loop(){setTimeout(function() {if (window.Bm_bLibraryLoadedComp==true){window['createSnackbar']('this is a test');} else if (i<=10){i++;loop();}}, 500)};loop();})()
 * This adds jquery. Is directly inside tampermonkey script
 * javascript:(function(){window.Bm_bLibraryjQuery=true;setTimeout(function(){console.log('bookmarklet ran');},2000);})()
 */


let Bm_bLibraryLoaded = true;      // stops library from being loaded twice (just in case)
let Bm_bLibraryjQuery;
let Bm_bLibraryjQueryComp;
let jqueryWorking;

console.log('Script library loaded');

/**
 * @param  {string} message
 * Creates a snackbar on the bottom of the screen
 * Can be dismissed with snackbar.style.opacity='0'
 */
function createSnackbar(message) {
    if (window.jQuery){
        if ($('#snackbarstyle').length) {
            $('#snackbarstyle').remove();
        };
        let style = document.createElement('style');
        style.id = "snackbarstyle";
        style.innerHTML = atob('I3NuYWNrYmFyIHsgdmlzaWJpbGl0eTogaGlkZGVuOyAvKiBIaWRkZW4gYnkgZGVmYXVsdC4gVmlzaWJsZSBvbiBjbGljayAqLyB0cmFuc2l0aW9uOiBvcGFjaXR5IDFzOyBtaW4td2lkdGg6IDI1MHB4OyAvKiBTZXQgYSBkZWZhdWx0IG1pbmltdW0gd2lkdGggKi8gbWFyZ2luLWxlZnQ6IC0xMjVweDsgLyogRGl2aWRlIHZhbHVlIG9mIG1pbi13aWR0aCBieSAyICovIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IC8qIEJsYWNrIGJhY2tncm91bmQgY29sb3IgKi8gY29sb3I6ICNmZmY7IC8qIFdoaXRlIHRleHQgY29sb3IgKi8gdGV4dC1hbGlnbjogY2VudGVyOyAvKiBDZW50ZXJlZCB0ZXh0ICovIGJvcmRlci1yYWRpdXM6IDJweDsgLyogUm91bmRlZCBib3JkZXJzICovIHBhZGRpbmc6IDE2cHg7IC8qIFBhZGRpbmcgKi8gcG9zaXRpb246IGZpeGVkOyAvKiBTaXQgb24gdG9wIG9mIHRoZSBzY3JlZW4gKi8gei1pbmRleDogMTsgLyogQWRkIGEgei1pbmRleCBpZiBuZWVkZWQgKi8gbGVmdDogNTAlOyAvKiBDZW50ZXIgdGhlIHNuYWNrYmFyICovIGJvdHRvbTogMzBweDsgLyogMzBweCBmcm9tIHRoZSBib3R0b20gKi99LyogU2hvdyB0aGUgc25hY2tiYXIgd2hlbiBjbGlja2luZyBvbiBhIGJ1dHRvbiAoY2xhc3MgYWRkZWQgd2l0aCBKYXZhU2NyaXB0KSAqLyNzbmFja2Jhci5zaG93IHsgdmlzaWJpbGl0eTogdmlzaWJsZTsgLyogU2hvdyB0aGUgc25hY2tiYXIgKi8gLyogQWRkIGFuaW1hdGlvbjogVGFrZSAwLjUgc2Vjb25kcyB0byBmYWRlIGluIGFuZCBvdXQgdGhlIHNuYWNrYmFyLiBIb3dldmVyLCBkZWxheSB0aGUgZmFkZSBvdXQgcHJvY2VzcyBmb3IgMi41IHNlY29uZHMgKi8gLXdlYmtpdC1hbmltYXRpb246IGZhZGVpbiAwLjVzOyBhbmltYXRpb246IGZhZGVpbiAwLjVzO30vKiBBbmltYXRpb25zIHRvIGZhZGUgdGhlIHNuYWNrYmFyIGluIGFuZCBvdXQgKi9ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHsgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9fUBrZXlmcmFtZXMgZmFkZWluIHsgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRlb3V0IHsgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO30gdG8ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9fUBrZXlmcmFtZXMgZmFkZW91dCB7IGZyb20ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9IHRvIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fX0=');
        document.head.appendChild(style);
        if ($('#snackbar').length) {
            $('#snackbar').remove();
        };
        let snackbar = document.createElement('div');
        snackbar.id = "snackbar";
        snackbar.innerText = message;
        snackbar.addEventListener('transitionend', function () {
            snackbar.remove();
            style.remove();
        });
        document.body.appendChild(snackbar);

        snackbar.setAttribute('class', 'show');
        return snackbar;
    } else {
        if(jqueryWorking!=true){
            addJQuery(createSnackbar,message);
        };
    }
}

/**
 * Set jquery trigger for tampermonkey then wait until complete to return true
 */
function addJQuery(callback,params) {
    jqueryWorking=true;
    Bm_bLibraryjQuery=true;
    let i =0;
    function loop(){
        setTimeout(function() {   
            if (Bm_bLibraryjQueryComp==true){
                callback(params);
            } else if (i<=10){
                i++;
                loop();
            }
        }, 500)
    };
    loop();
}

function osrsToc() {
  /* Check if the floating-toc style element already exists */
  if (document.getElementById('floating-toc-style')) {
    return; /* Exit if the style element already exists */
  }

  /* Select the table of contents element */
  var tocElement = document.querySelector('#toc');

  /* Get the initial offset position of the table of contents */
  var tocOffset = tocElement.offsetTop;

  /* Create a new <style> element for the floating-toc CSS */
  var styleElement = document.createElement('style');
  styleElement.id = 'floating-toc-style';
  styleElement.innerHTML = `
    /* CSS for the floating-toc */
    .floating-toc {
      position: fixed;
      top: 0;
      z-index: 9999;
    }
  `;

  /* Inject the <style> element into the <head> of the document */
  document.head.appendChild(styleElement);

  /* Add a scroll event listener */
  window.addEventListener('scroll', function() {
    /* Calculate the current scroll position */
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    /* Check if the scroll position has passed the table of contents */
    if (scrollPosition >= tocOffset) {
      /* Add a CSS class to make the table of contents float */
      tocElement.classList.add('floating-toc');
    } else {
      /* Remove the CSS class if the scroll position is above the table of contents */
      tocElement.classList.remove('floating-toc');
    }
  });
    document.querySelector('#myModal').style.display = "none";
};


function playbackSpeed(){
    let answer = prompt("What playback speed? Set as 1 for 100%.");/* Pausing will reset the playback speed");*/
    if(answer!=null){
        let elems = document.getElementsByTagName('video');
        if(elems.length){
            elems[0].playbackRate=parseFloat(answer);
        } else{
            alert("Video element not found");
        };
    };
    document.querySelector('#myModal').style.display = "none";
};

function copyTextClicked(){
    let elementMouseIsOver;

    let style = document.createElement('style');
    style.id = 'selectStyle';
    style.innerHTML = `
    .selectStyle{
            border:2px solid red;
    }
    `;
    if (document.querySelector('#selectStyle')) { document.querySelector('#selectStyle').remove() };
    document.head.appendChild(style);

    document.body.addEventListener('mousedown', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        let x = e.clientX, y = e.clientY;
        elementMouseIsOver = document.elementFromPoint(x, y);
        console.log(elementMouseIsOver);
        let sel = window.getSelection();
        let rng = document.createRange();
        rng.selectNodeContents(elementMouseIsOver);
        sel.removeAllRanges();
        sel.addRange(rng);
        document.execCommand('copy');
        elementMouseIsOver.classList.add('selectStyle');
        setTimeout(function () {
            elementMouseIsOver.classList.remove('selectStyle');
        }, 1500);

    }, { once: true });

    // hide modal
    document.querySelector('#myModal').style.display = "none";
};

function rmListYt(close=true){
    let reg = /&list=.*&index=\d+/;
    /*desktop*/
    let elem;
    for (elem of document.querySelectorAll('#video-title')){
        try{
            elem.href = elem.href.replace(reg,"");
        }catch(e){};
    }
    /*mobile image*/
    for (elem of document.querySelectorAll('.compact-media-item-image')){
        try{
            elem.href = elem.href.replace(reg,"");
        }catch(e){};
    }
    /*mobile other*/
    for (elem of document.querySelectorAll('.compact-media-item-metadata-content')){
        try{
            elem.href = elem.href.replace(reg,"");
        }catch(e){};
    }

    // close modal
    if (close){
        document.querySelector('#myModal').style.display = "none";
    }
}

function rmWatchedYt(n=0){
    let elems = document.querySelectorAll('ytd-playlist-video-renderer.ytd-playlist-video-list-renderer,ytm-playlist-video-renderer');

    //check if there's loading spinner in the bottom
    // mobile is: ytm-continuation-item-renderer class=spinner
    if(n!==-1 && document.querySelectorAll('ytd-continuation-item-renderer,ytm-continuation-item-renderer').length > 0){
        //scroll down
        if(n>=elems.length){
            n=elems.length-1;
        };
        try{
            elems[n].scrollIntoView();
        }catch(e){};
        
        //redo it again. if modal is closed then don't try again
        console.log(n);
        console.log(elems.length-1);
        if(n===elems.length){
            window.scrollTo(0,0);
            n=-21;
        };
        if (document.querySelector('#myModal').style.display!=='none'){
            setTimeout(function(){rmWatchedYt(n+10)}, 500);
        } else{
            window.scrollTo(0,0);
            let ratio = .8;
            elems.forEach(x=>{
                let y = x.querySelectorAll('#progress,div.thumbnail-overlay-resume-playback-progress');
                y.forEach(prog=>{
                    try {
                        if(prog.offsetWidth / prog.parentNode.offsetWidth >= ratio){
                            x.remove();
                        };
                    } catch(e){};
                });
            });
            setTimeout(function(){rmWatchedYt(-1)}, 1000);
            window.scrollTo(0,0);
            // run remove playlist links
            rmListYt(false)
        };
    } else {
        window.scrollTo(0,0);
        let ratio = .8;
        elems.forEach(x=>{
            let y = x.querySelectorAll('#progress,div.thumbnail-overlay-resume-playback-progress');
            y.forEach(prog=>{
                try {
                    if(prog.offsetWidth / prog.parentNode.offsetWidth >= ratio){
                        x.remove();
                    };
                } catch(e){};
            });
        });
        console.log("... IS DONE! *metal riffs*");  
        document.querySelector('#myModal').style.display = "none";
        window.scrollTo(0,0);
        // run remove playlist links
        rmListYt(false)
    }

};

// Go from YouTube Channel to the uploads playlist full
function ytChannelToPlaylist(){
    let base = document.querySelector('meta[property="og:url"][content*="channel\/UC"]');
    if (base===null){return};
    let id = "UU" + base.content.replace(/.*channel\/UC/,'');
    window.open('https://www.youtube.com/playlist?list=' + id,'_self');
}

/**
 * @param  {string} type
 * @param  {string} id
 * @param  {string} innerHTML
 * @param  {node} loc
 * 
 * This function will auto create a node with the provided parameters
 */
function createNodes(type,id,innerHTML,loc,callback = null){
    if (document.getElementById(id)){
        document.getElementById(id).remove();
    }
    let elem = document.createElement(type);
    elem.id=id;
    elem.innerHTML=innerHTML;
    if (callback) {
        elem.addEventListener('click',e => {
            callback();
        });
    }
    loc.appendChild(elem);
    return elem;
}

/**
 * This will be the script to open a menu for the others
 * TODO pretty much everything
 * Called with:
 * javascript:(function(){window.Bm_bLibraryRequest=true;let i =0;function loop(){setTimeout(function() {if (window.Bm_bLibraryLoadedComp==true){window['mainScript']();} else if (i<=10){i++;loop();}}, 500)};loop();})()
 */
function mainScript(){
    // Basing modals off this:
    // https://www.w3schools.com/howto/howto_css_modals.asp

    let host = document.location.host;
    let href = document.location.href;

    // Create the CSS
    let style=`/* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 9999; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        font-size: 20px;
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
    /* Modal Header */
    .modal-header {
        padding: 2px 16px;
        font-size: 120%;
        font-weight: bold;
        background-color: #f44336;
        color: white;
    }
    /* Modal Body */
    .modal-body {
        padding: 2px 16px;
        color: black;
    }

    .modal-body:hover{
        cursor: pointer;
    }

    /* Modal Content */
    .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        max-width: 400px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    }
    @media only screen and (max-width: 600px) {
        .modal{
            font-size: 18px;
        }
        .modal-content {
            width: 90%;
        }
    }

    /* The Close Button */
    .close {
        color: black;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }`
    style = createNodes("style","mainstyle",style,document.head);


    // Create the modal
    let modal =
        `<div class="modal-content">
        <div class="modal-header">
        <span class="close">&times;</span>
        <div>Scripts</div>
        </div>
        <div class="modal-body">

        </div>
        </div>`;
    modal = createNodes("div","myModal",modal,document.body);
    modal.classList.add('modal');

    // Show and add listener to close on x
    modal.style.display = "block";
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // Set functions
    createNodes('p','playbackSpeed','Playback Speed',modal.querySelector('.modal-body'),playbackSpeed);
    createNodes('p','copyTextClicked','Copy text of clicked element',modal.querySelector('.modal-body'),copyTextClicked);
    // functions by host
    if (host == 'oldschool.runescape.wiki'){
        createNodes('p','hostheader','~~~Host Specific~~~',modal.querySelector('.modal-body'));
        createNodes('p', 'osrsToc', 'OSRS Floating ToC', modal.querySelector('.modal-body'), osrsToc);
    } else if (host == 'www.youtube.com' || host == 'm.youtube.com'){
        createNodes('p','hostheader','~~~Host Specific~~~',modal.querySelector('.modal-body'));
        createNodes('p', 'rmListYt', 'Remove List from YT Urls', modal.querySelector('.modal-body'), rmListYt);
        createNodes('p', 'rmWatchedYt', 'Remove Watched from YT Playlist', modal.querySelector('.modal-body'), rmWatchedYt);
        createNodes('p', 'ytChannelToPlaylist', 'YT Channel to Upload Playlist', modal.querySelector('.modal-body'), ytChannelToPlaylist);
    }
    // functions by href
    if (href == 'https://oldschool.runescape.wiki/w/Optimal_quest_guide'){
        createNodes('p','hrefheader','~~~Page Specific~~~',modal.querySelector('.modal-body'));

    }



}
