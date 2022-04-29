javascript: (function(){
	/*
	* When at a url of image (not on a page), run this script
	* to crop the image into a square
	*/
	function draw(elem) {
		elem.style = "";
    var canvas = document.createElement('canvas'),
        /*max_size = 500,*/
        width = elem.naturalWidth,
        height = elem.naturalHeight;
    if (width >= height) {
				max_size = width;
        height *= max_size / width;
        width = max_size;
    } else {
				max_size = height;
        width *= max_size / height;
        height = max_size;
    };
    canvas.width = max_size;
    canvas.height = max_size;
    console.log(canvas);
    canvas.getContext('2d').drawImage(elem, canvas.width / 2 - width / 2,canvas.height / 2 - height / 2, width, height);
    document.querySelector("img").src = canvas.toDataURL();
    elem.width = canvas.width;
    elem.height = canvas.height;
		elem.outerHTML = `<a download="download.png" href="` + document.querySelector("img").src +`">` + elem.outerHTML + `</a>`;
};
var image = document.getElementsByTagName('img')[0];
var snackbar = document.createElement('div');
snackbar.id = "snackbar";
snackbar.innerText = "Processing";
if (!document.getElementById("snackbar")) document.body.appendChild(snackbar);
if (document.getElementById("snackbar")) snackbar = document.getElementById("snackbar");
var style = document.createElement('style');
style.id = "style";
style.innerHTML = `#snackbar {    visibility: hidden; /* Hidden by default. Visible on click */    width: 250px; /* Set a default minimum width */    margin-left: -125px; /* Divide value of min-width by 2 */    background-color: #333; /* Black background color */    color: #fff; /* White text color */    text-align: center; /* Centered text */    border-radius: 2px; /* Rounded borders */    padding: 16px; /* Padding */    position: fixed; /* Sit on top of the screen */    z-index: 1; /* Add a z-index if needed */    left: 50%; /* Center the snackbar */    bottom: 30px; /* 30px from the bottom */}/* Show the snackbar when clicking on a button (class added with JavaScript) */#snackbar.show {    visibility: visible; /* Show the snackbar */    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.    However, delay the fade out process for 2.5 seconds */   -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;   animation: fadein 0.5s, fadeout 0.5s 2.5s;}/* Animations to fade the snackbar in and out */@-webkit-keyframes fadein {    from {bottom: 0; opacity: 0;}     to {bottom: 30px; opacity: 1;}}@keyframes fadein {    from {bottom: 0; opacity: 0;}    to {bottom: 30px; opacity: 1;}}@-webkit-keyframes fadeout {    from {bottom: 30px; opacity: 1;}     to {bottom: 0; opacity: 0;}}@keyframes fadeout {    from {bottom: 30px; opacity: 1;}    to {bottom: 0; opacity: 0;}}`;
if (!document.getElementById('style')) document.head.appendChild(style);
snackbar.className = "show";
setTimeout(function() {
		draw(image);
		snackbar.className = snackbar.className.replace("show", "");
}, 1000);
})();