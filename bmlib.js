/**
 * These functions are called with a bookmarklet that is injected with the 
 * Tampermonkey script bookmarkLibrary.js.
 * 
 * Here's an example to call:
 * javascript:(function(){window.Bm_bLibraryRequest=true;setTimeout(function(){window['createSnackbar']('this is a test');},2000);})()
 * This adds jquery. Is directly inside tampermonkey script
 * javascript:(function(){window.Bm_bLibraryjQuery=true;setTimeout(function(){console.log('bookmarklet ran');},2000);})()
 */

//  javascript:(function(){
//     window.Bm_bLibraryRequest=true;
//     var i =0;
//     function loop(){
//         setTimeout(function() {   
//             if (window.Bm_bLibraryLoadedComp==true){
//                 window['createSnackbar']('this is a test');
//             } else if (i<=10){
//                 i++;
//                 loop();
//             }
//           }, 500)
//     };
//     loop();
// })()
 
 
    


var Bm_bLibraryLoaded = true;      // stops library from being loaded twice (just in case)
var Bm_bLibraryjQuery;
var Bm_bLibraryjQueryComp;

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
        addJQuery(createSnackbar(message));
    }
}

/**
 * Set jquery trigger for tampermonkey then wait until complete to return true
 */
function addJQuery(callback) {
    Bm_bLibraryjQuery=true;
    var i =0;
    function loop(){
        setTimeout(function() {   
            if (Bm_bLibraryjQueryComp==true){
                callback;
            } else if (i<=10){
                i++;
                loop();
            }
          }, 500)
    };
    loop();
}