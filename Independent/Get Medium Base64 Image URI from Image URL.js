javascript: (function(){
	/*
	* Run this script and put in the url of image. It's helpful
	* to have the image url open in the event of cross domain security.
	* It converts to a base64 uri. When complete, creates a snackbar
	* that when clicked copies the uri to the clipboard.
	*/
	
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
					};
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
	};
	var snackbar = document.createElement('div');
	snackbar.id = "snackbar";
	snackbar.innerText = "Copy";
	if (!document.getElementById("snackbar")) document.body.appendChild(snackbar);
	if (document.getElementById("snackbar")) snackbar = document.getElementById("snackbar");
	var style = document.createElement('style');
	style.id = "style";
	style.innerHTML = atob('I3NuYWNrYmFyIHsgICAgdmlzaWJpbGl0eTogaGlkZGVuOyAvKiBIaWRkZW4gYnkgZGVmYXVsdC4gVmlzaWJsZSBvbiBjbGljayAqLyAgICBtaW4td2lkdGg6IDI1MHB4OyAvKiBTZXQgYSBkZWZhdWx0IG1pbmltdW0gd2lkdGggKi8gICAgbWFyZ2luLWxlZnQ6IC0xMjVweDsgLyogRGl2aWRlIHZhbHVlIG9mIG1pbi13aWR0aCBieSAyICovICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IC8qIEJsYWNrIGJhY2tncm91bmQgY29sb3IgKi8gICAgY29sb3I6ICNmZmY7IC8qIFdoaXRlIHRleHQgY29sb3IgKi8gICAgdGV4dC1hbGlnbjogY2VudGVyOyAvKiBDZW50ZXJlZCB0ZXh0ICovICAgIGJvcmRlci1yYWRpdXM6IDJweDsgLyogUm91bmRlZCBib3JkZXJzICovICAgIHBhZGRpbmc6IDE2cHg7IC8qIFBhZGRpbmcgKi8gICAgcG9zaXRpb246IGZpeGVkOyAvKiBTaXQgb24gdG9wIG9mIHRoZSBzY3JlZW4gKi8gICAgei1pbmRleDogMTsgLyogQWRkIGEgei1pbmRleCBpZiBuZWVkZWQgKi8gICAgbGVmdDogNTAlOyAvKiBDZW50ZXIgdGhlIHNuYWNrYmFyICovICAgIGJvdHRvbTogMzBweDsgLyogMzBweCBmcm9tIHRoZSBib3R0b20gKi99LyogU2hvdyB0aGUgc25hY2tiYXIgd2hlbiBjbGlja2luZyBvbiBhIGJ1dHRvbiAoY2xhc3MgYWRkZWQgd2l0aCBKYXZhU2NyaXB0KSAqLyNzbmFja2Jhci5zaG93IHsgICAgdmlzaWJpbGl0eTogdmlzaWJsZTsgLyogU2hvdyB0aGUgc25hY2tiYXIgKi8gICAgLyogQWRkIGFuaW1hdGlvbjogVGFrZSAwLjUgc2Vjb25kcyB0byBmYWRlIGluIGFuZCBvdXQgdGhlIHNuYWNrYmFyLiAgICBIb3dldmVyLCBkZWxheSB0aGUgZmFkZSBvdXQgcHJvY2VzcyBmb3IgMi41IHNlY29uZHMgKi8gICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZWluIDAuNXMsIGZhZGVvdXQgMC41cyAyLjVzOyAgIGFuaW1hdGlvbjogZmFkZWluIDAuNXMsIGZhZGVvdXQgMC41cyAyLjVzO30vKiBBbmltYXRpb25zIHRvIGZhZGUgdGhlIHNuYWNrYmFyIGluIGFuZCBvdXQgKi9ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHsgICAgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gICAgIHRvIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fX1Aa2V5ZnJhbWVzIGZhZGVpbiB7ICAgIGZyb20ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9ICAgIHRvIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fX1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZW91dCB7ICAgIGZyb20ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9ICAgICB0byB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO319QGtleWZyYW1lcyBmYWRlb3V0IHsgICAgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO30gICAgdG8ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9fQ==');
	if (!document.getElementById('style')){
		document.head.appendChild(style);
	};
	toDataUrl(window.location.href, function(myBase64) {
		var snackbar = document.getElementById("snackbar");
		snackbar.onclick = function() {
			document.execCommand("copy");
		};
		snackbar.addEventListener("copy", function(event) {
			event.preventDefault();
			if (event.clipboardData) {
				snackbar.innerText = "Copied";
				event.clipboardData.setData("text/plain", myBase64);
				setTimeout(function() {
					snackbar.className = snackbar.className.replace("show", "");
				}, 3000);
			};
		});
		snackbar.innerText = "Copy";
		snackbar.className = "show";
		setTimeout(function() {
			snackbar.className = snackbar.className.replace("show", "");
		}, 30000);
	});
	

})();