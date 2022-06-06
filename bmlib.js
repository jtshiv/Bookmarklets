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

function playbackSpeed(){
    let answer = prompt("What playback speed? Set as 1 for 100%.");/* Pausing will reset the playback speed");*/
    if(answer!=null){
        let elems = document.getElementsByTagName('video');
        if(elems.length){
            elems[0].playbackRate=parseInt(answer);
        } else{
            alert("Video element not found");
        };
    };
    document.querySelector('#myModal').style.display = "none";
};

function rmListYt(close=true){
    let reg = /&list=.*&index=\d+/;
    /*desktop*/
    let elem;
    for (elem of document.querySelectorAll('#video-title')){
        elem.href = elem.href.replace(reg,"");
    }
    /*mobile image*/
    for (elem of document.querySelectorAll('.compact-media-item-image')){
        elem.href = elem.href.replace(reg,"");
    }
    /*mobile other*/
    for (elem of document.querySelectorAll('.compact-media-item-metadata-content')){
        elem.href = elem.href.replace(reg,"");
    }

    // close modal
    if (close){
        document.querySelector('#myModal').style.display = "none";
    }
}

function rmWatchedYt(){
    let elems = document.querySelectorAll('ytd-playlist-video-renderer.ytd-playlist-video-list-renderer');
    let ratio = .8;
    for (let item of Array.from(elems)){
        let prog = item.querySelector('#progress');
        try {
            if(prog.offsetWidth / prog.parentNode.offsetWidth >= ratio){
                item.remove();
            };
        } catch(e){};
    }
    //try{
    //	elems[elems.length-1].scrollIntoView();
    //} catch(e){};

    elems = document.querySelectorAll('ytm-playlist-video-renderer');
    for (let item of Array.from(elems)){
        let prog = item.querySelector('div.thumbnail-overlay-resume-playback-progress');
        try {
            if(prog.offsetWidth / prog.parentNode.offsetWidth >= ratio){
                item.style.display = 'none';
            };
        } catch(e){};
    }
    //try{
    //	elems[elems.length-1].scrollIntoView();
    //} catch(e){};


    // run remove playlist links
    rmListYt(false)

    //check if there's loading spinner in the bottom
    // mobile is: ytm-continuation-item-renderer class=spinner
    if(document.querySelectorAll('ytd-continuation-item-renderer').length > 0 | 
    document.querySelectorAll('ytm-continuation-item-renderer.spinner').length > 0){
        //scroll down
        try{
            //desktop
            window.scrollTo(0,document.getElementsByTagName('ytd-app')[0].scrollHeight);
        }catch(e){};
        try{
            //mobile
            window.scrollTo(0,document.getElementsByTagName('ytm-browse')[0].scrollHeight);
        }catch(e){};
        //redo it again. if modal is closed then don't try again
        if (document.querySelector('#myModal').style.display!=='none'){
            setTimeout(function(){rmWatchedYt()}, 500);
        };
    } else {
        console.log("... IS DONE! *metal riffs*");  
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
 * !javascript:(function(){window.Bm_bLibraryRequest=true;let i =0;function loop(){setTimeout(function() {if (window.Bm_bLibraryLoadedComp==true){window['mainScript']();} else if (i<=10){i++;loop();}}, 500)};loop();})()
 */
function mainScript(){
    // Basing modals off this:
    // https://www.w3schools.com/howto/howto_css_modals.asp

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
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
    /* Modal Header */
    .modal-header {
      padding: 2px 16px;
      background-color: #f44336;
      color: white;
    }
    /* Modal Body */
.modal-body {padding: 2px 16px;}

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
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
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
        <h3>Scripts</h3>
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
    createNodes('p','rmListYt','Remove List from YT Urls',modal.querySelector('.modal-body'),rmListYt);
    createNodes('p','rmWatchedYt','Remove Watched from YT Playlist',modal.querySelector('.modal-body'),rmWatchedYt);
    createNodes('p','ytChannelToPlaylist','YT Channel to Upload Playlist',modal.querySelector('.modal-body'),ytChannelToPlaylist);

    // Set rmListYt function
    //let rmListYt= document.querySelector('#rmListYt');
    //rmListYt.addEventListener('click', e =>{
    // rmListYt()   	
    //});


}
