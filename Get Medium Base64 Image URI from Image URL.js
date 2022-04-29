javascript: (function(){
	/*
	* Run this script and put in the url of image. It's helpful
	* to have the image url open in the event of cross domain security.
	* It converts to a base64 uri. When complete, creates a snackbar
	* that when clicked copies the uri to the clipboard.
	*/
	var url = window.prompt("Enter Image URL", window.location.href);
	var dataURLToBlob = function(dataURL) {
		var BASE64_MARKER = ';base64,';
		if (dataURL.indexOf(BASE64_MARKER) == -1) {
			var parts = dataURL.split(',');
			var contentType = parts[0].split(':')[1];
			var raw = parts[1];
			return new Blob([raw], {
				type: contentType
			});
		}
		var parts = dataURL.split(BASE64_MARKER);
		var contentType = parts[0].split(':')[1];
		var raw = window.atob(parts[1]);
		var rawLength = raw.length;
		var uInt8Array = new Uint8Array(rawLength);
		for (var i = 0; i < rawLength; ++i) {
			uInt8Array[i] = raw.charCodeAt(i);
		};
		return new Blob([uInt8Array], {
			type: contentType
		});
	};

	function toDataUrl(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var image = new Image();
			var resizedImage;
			image.onload = function(imageEvent) {
				var canvas = document.createElement('canvas'),
					max_size = 500,
					width = image.width,
					height = image.height;
				if (width >= height) {
					height *= max_size / width;
					width = max_size;
				} else {
					width *= max_size / height;
					height = max_size;
				};
				canvas.width = max_size;
				canvas.height = max_size;
				console.log(canvas);
				canvas.getContext('2d').drawImage(image, canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height);
				document.querySelector("img").src = canvas.toDataURL();
				document.querySelector("img").width = max_size;
				document.querySelector("img").height = max_size;
				var dataUrl = canvas.toDataURL('image/png');
				var image_blob = (function() {
					var binary = atob(dataUrl.split(',')[1]);
					var array = [];
					for (var i = 0; i < binary.length; i++) {
						array.push(binary.charCodeAt(i));
					}
					return new Blob([new Uint8Array(array)], {
						type: 'image/png'
					});
				})();
				callback(dataUrl);
			};
			image.src = URL.createObjectURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}
	var snackbar = document.createElement('div');
	snackbar.id = "snackbar";
	snackbar.innerText = "Copy";
	if (!document.getElementById("snackbar")) document.body.appendChild(snackbar);
	if (document.getElementById("snackbar")) snackbar = document.getElementById("snackbar");
	var style = document.createElement('style');
	style.id = "style";
	style.innerHTML = `#snackbar {    visibility: hidden; /* Hidden by default. Visible on click */    min-width: 250px; /* Set a default minimum width */    margin-left: -125px; /* Divide value of min-width by 2 */    background-color: #333; /* Black background color */    color: #fff; /* White text color */    text-align: center; /* Centered text */    border-radius: 2px; /* Rounded borders */    padding: 16px; /* Padding */    position: fixed; /* Sit on top of the screen */    z-index: 1; /* Add a z-index if needed */    left: 50%; /* Center the snackbar */    bottom: 30px; /* 30px from the bottom */}/* Show the snackbar when clicking on a button (class added with JavaScript) */#snackbar.show {    visibility: visible; /* Show the snackbar */    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.    However, delay the fade out process for 2.5 seconds */   -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;   animation: fadein 0.5s, fadeout 0.5s 2.5s;}/* Animations to fade the snackbar in and out */@-webkit-keyframes fadein {    from {bottom: 0; opacity: 0;}     to {bottom: 30px; opacity: 1;}}@keyframes fadein {    from {bottom: 0; opacity: 0;}    to {bottom: 30px; opacity: 1;}}@-webkit-keyframes fadeout {    from {bottom: 30px; opacity: 1;}     to {bottom: 0; opacity: 0;}}@keyframes fadeout {    from {bottom: 30px; opacity: 1;}    to {bottom: 0; opacity: 0;}}%60;if (!document.getElementById('style')) document.head.appendChild(style);toDataUrl(window.url, function(myBase64) {    var snackbar = document.getElementById("snackbar");    snackbar.onclick = function() {        document.execCommand("copy");    };    snackbar.addEventListener("copy", function(event) {        event.preventDefault();        if (event.clipboardData) {            snackbar.innerText = "Copied";            event.clipboardData.setData("text/plain", myBase64);            setTimeout(function() {                snackbar.className = snackbar.className.replace("show", "");            }, 3000);        };    });    snackbar.innerText = "Copy";    snackbar.className = "show";    setTimeout(function() {        snackbar.className = snackbar.className.replace("show", "");    }, 30000);});
})();