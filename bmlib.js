/**
 * These functions are called with a bookmarklet that is injected with the 
 * Tampermonkey script bookmarkLibrary.js.
 * 
 * Here's an example to call:
 * javascript:(function(){window.Bm_bLibraryRequest=true;var i =0;function loop(){setTimeout(function() {if (window.Bm_bLibraryLoadedComp==true){window['createSnackbar']('this is a test');} else if (i<=10){i++;loop();}}, 500)};loop();})()
 * This adds jquery. Is directly inside tampermonkey script
 * javascript:(function(){window.Bm_bLibraryjQuery=true;setTimeout(function(){console.log('bookmarklet ran');},2000);})()
 */
 

var Bm_bLibraryLoaded = true;      // stops library from being loaded twice (just in case)
var Bm_bLibraryjQuery;
var Bm_bLibraryjQueryComp;
var jqueryWorking;

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
        var style = document.createElement('style');
        style.id = "snackbarstyle";
        style.innerHTML = atob('I3NuYWNrYmFyIHsgdmlzaWJpbGl0eTogaGlkZGVuOyAvKiBIaWRkZW4gYnkgZGVmYXVsdC4gVmlzaWJsZSBvbiBjbGljayAqLyB0cmFuc2l0aW9uOiBvcGFjaXR5IDFzOyBtaW4td2lkdGg6IDI1MHB4OyAvKiBTZXQgYSBkZWZhdWx0IG1pbmltdW0gd2lkdGggKi8gbWFyZ2luLWxlZnQ6IC0xMjVweDsgLyogRGl2aWRlIHZhbHVlIG9mIG1pbi13aWR0aCBieSAyICovIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IC8qIEJsYWNrIGJhY2tncm91bmQgY29sb3IgKi8gY29sb3I6ICNmZmY7IC8qIFdoaXRlIHRleHQgY29sb3IgKi8gdGV4dC1hbGlnbjogY2VudGVyOyAvKiBDZW50ZXJlZCB0ZXh0ICovIGJvcmRlci1yYWRpdXM6IDJweDsgLyogUm91bmRlZCBib3JkZXJzICovIHBhZGRpbmc6IDE2cHg7IC8qIFBhZGRpbmcgKi8gcG9zaXRpb246IGZpeGVkOyAvKiBTaXQgb24gdG9wIG9mIHRoZSBzY3JlZW4gKi8gei1pbmRleDogMTsgLyogQWRkIGEgei1pbmRleCBpZiBuZWVkZWQgKi8gbGVmdDogNTAlOyAvKiBDZW50ZXIgdGhlIHNuYWNrYmFyICovIGJvdHRvbTogMzBweDsgLyogMzBweCBmcm9tIHRoZSBib3R0b20gKi99LyogU2hvdyB0aGUgc25hY2tiYXIgd2hlbiBjbGlja2luZyBvbiBhIGJ1dHRvbiAoY2xhc3MgYWRkZWQgd2l0aCBKYXZhU2NyaXB0KSAqLyNzbmFja2Jhci5zaG93IHsgdmlzaWJpbGl0eTogdmlzaWJsZTsgLyogU2hvdyB0aGUgc25hY2tiYXIgKi8gLyogQWRkIGFuaW1hdGlvbjogVGFrZSAwLjUgc2Vjb25kcyB0byBmYWRlIGluIGFuZCBvdXQgdGhlIHNuYWNrYmFyLiBIb3dldmVyLCBkZWxheSB0aGUgZmFkZSBvdXQgcHJvY2VzcyBmb3IgMi41IHNlY29uZHMgKi8gLXdlYmtpdC1hbmltYXRpb246IGZhZGVpbiAwLjVzOyBhbmltYXRpb246IGZhZGVpbiAwLjVzO30vKiBBbmltYXRpb25zIHRvIGZhZGUgdGhlIHNuYWNrYmFyIGluIGFuZCBvdXQgKi9ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHsgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9fUBrZXlmcmFtZXMgZmFkZWluIHsgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRlb3V0IHsgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO30gdG8ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9fUBrZXlmcmFtZXMgZmFkZW91dCB7IGZyb20ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9IHRvIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fX0=');
        document.head.appendChild(style);
        if ($('#snackbar').length) {
            $('#snackbar').remove();
        };
        var snackbar = document.createElement('div');
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
    var i =0;
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
    var answer = prompt("What playback speed? Set as 1 for 100%.");/* Pausing will reset the playback speed");*/
    if(answer!=null){
        var elems = document.getElementsByTagName('video');
        if(elems.length){
            elems[0].playbackRate=parseInt(answer);
        } else{
        alert("Video element not found");
        };
    };
};


/**
 * @param  {string} type
 * @param  {string} id
 * @param  {string} innerHTML
 * @param  {node} loc
 * 
 * This function will auto create a node with the provided parameters
 */
 var createNodes = function(type,id,innerHTML,loc){
    if (document.getElementById(id)){
        document.getElementById(id).remove();
    }
    var elem = document.createElement(type);
    elem.id=id;
    elem.innerHTML=innerHTML;
    loc.appendChild(elem);
    return elem;
}

/**
 * This will be the script to open a menu for the others
 * TODO pretty much everything
 * Called with:
 * !javascript:(function(){window.Bm_bLibraryRequest=true;var i =0;function loop(){setTimeout(function() {if (window.Bm_bLibraryLoadedComp==true){window['mainScript']();} else if (i<=10){i++;loop();}}, 500)};loop();})()
 */
function mainScript(){
    // Basing modals off this:
    // https://www.w3schools.com/howto/howto_css_modals.asp

    // Create the CSS
    var style=`/* The Modal (background) */
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

    /* Modal Content/Box */
    .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    }

    /* The Close Button */
    .close {
    color: #aaa;
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
    var modal =
        `<div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
            <div id=playbackSpeed>Playback Speed</div>
        </div>`;
    modal = createNodes("div","myModal",modal,document.body);
    modal.classList.add('modal');

    // Show and add listener to close on x
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
    modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // Set playbackSpeed function
    let play = document.querySelector('#playbackSpeed');
    play.addEventListener('click', e =>{
	 playbackSpeed()   	
    });
}
