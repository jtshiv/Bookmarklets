javascript: (function(){
	/*
	* With an image copied to your clipboard, run this script
	* and it will create a text box. Paste into it and it will
	* create a 16:9 cover of the image and filling the
	* remainder with a blurred version of the image
	*/
	var createScript = function(id, url, callback) {
    if (document.getElementById('jqueryscript')) {
        document.getElementById('jqueryscript').remove();
    };
    var s = document.createElement('script');
    s.src = url;
    s.id = id;
    s.addEventListener('load', callback);
    document.getElementsByTagName('head')[0].appendChild(s);
	};
	createScript("jqueryscript", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function() {
		var createSnackbar=function(message){
			/*to remove, set snackbar.style.opacity = '0'*/
			if ($('#snackbarstyle').length){
				$('#snackbarstyle').remove();
			};
			var style = document.createElement('style');
			style.id = "snackbarstyle";
			style.innerHTML = atob('I3NuYWNrYmFyIHsgdmlzaWJpbGl0eTogaGlkZGVuOyAvKiBIaWRkZW4gYnkgZGVmYXVsdC4gVmlzaWJsZSBvbiBjbGljayAqLyB0cmFuc2l0aW9uOiBvcGFjaXR5IDFzOyBtaW4td2lkdGg6IDI1MHB4OyAvKiBTZXQgYSBkZWZhdWx0IG1pbmltdW0gd2lkdGggKi8gbWFyZ2luLWxlZnQ6IC0xMjVweDsgLyogRGl2aWRlIHZhbHVlIG9mIG1pbi13aWR0aCBieSAyICovIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IC8qIEJsYWNrIGJhY2tncm91bmQgY29sb3IgKi8gY29sb3I6ICNmZmY7IC8qIFdoaXRlIHRleHQgY29sb3IgKi8gdGV4dC1hbGlnbjogY2VudGVyOyAvKiBDZW50ZXJlZCB0ZXh0ICovIGJvcmRlci1yYWRpdXM6IDJweDsgLyogUm91bmRlZCBib3JkZXJzICovIHBhZGRpbmc6IDE2cHg7IC8qIFBhZGRpbmcgKi8gcG9zaXRpb246IGZpeGVkOyAvKiBTaXQgb24gdG9wIG9mIHRoZSBzY3JlZW4gKi8gei1pbmRleDogMTsgLyogQWRkIGEgei1pbmRleCBpZiBuZWVkZWQgKi8gbGVmdDogNTAlOyAvKiBDZW50ZXIgdGhlIHNuYWNrYmFyICovIGJvdHRvbTogMzBweDsgLyogMzBweCBmcm9tIHRoZSBib3R0b20gKi99LyogU2hvdyB0aGUgc25hY2tiYXIgd2hlbiBjbGlja2luZyBvbiBhIGJ1dHRvbiAoY2xhc3MgYWRkZWQgd2l0aCBKYXZhU2NyaXB0KSAqLyNzbmFja2Jhci5zaG93IHsgdmlzaWJpbGl0eTogdmlzaWJsZTsgLyogU2hvdyB0aGUgc25hY2tiYXIgKi8gLyogQWRkIGFuaW1hdGlvbjogVGFrZSAwLjUgc2Vjb25kcyB0byBmYWRlIGluIGFuZCBvdXQgdGhlIHNuYWNrYmFyLiBIb3dldmVyLCBkZWxheSB0aGUgZmFkZSBvdXQgcHJvY2VzcyBmb3IgMi41IHNlY29uZHMgKi8gLXdlYmtpdC1hbmltYXRpb246IGZhZGVpbiAwLjVzOyBhbmltYXRpb246IGZhZGVpbiAwLjVzO30vKiBBbmltYXRpb25zIHRvIGZhZGUgdGhlIHNuYWNrYmFyIGluIGFuZCBvdXQgKi9ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHsgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9fUBrZXlmcmFtZXMgZmFkZWluIHsgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRlb3V0IHsgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO30gdG8ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9fUBrZXlmcmFtZXMgZmFkZW91dCB7IGZyb20ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9IHRvIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fX0=');
			document.head.appendChild(style);
			if ($('#snackbar').length){
				$('#snackbar').remove();
			};
			var snackbar = document.createElement('div');
			snackbar.id = "snackbar";
			snackbar.innerText = message;
			snackbar.addEventListener('transitionend', function() {
				snackbar.remove();
				style.remove();
			});
			document.body.appendChild(snackbar);
			
			snackbar.setAttribute('class','show');
			return snackbar;
		};
		function draw(elem) {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext("2d");
			elem.style = "";
			if (elem.naturalHeight >= elem.naturalWidth) {
				canvas.width = elem.naturalHeight / 9 * 16;
				canvas.height = elem.naturalHeight;
				elem.height = canvas.height;
				elem.width = canvas.height * elem.naturalWidth / elem.naturalHeight;
			} else {
				canvas.width = elem.naturalHeight / 9 * 16;
				canvas.height = elem.naturalHeight;
				elem.width = canvas.width;
				elem.height = canvas.width * elem.naturalHeight / elem.naturalWidth;
			};
			ctx.filter = "blur(" + (elem.naturalHeight + elem.naturalWidth) / 2 * .025 + "px)";
			var h = elem.naturalHeight * canvas.width / elem.naturalWidth;
			var w = canvas.width;
			var y = -h / 2 + canvas.height / 2;
			ctx.drawImage(elem, 0, y, w, h);
			ctx.filter = "blur(0px)";
			var w = elem.naturalWidth * canvas.height / elem.naturalHeight;
			var h = canvas.height;
			var x = canvas.width / 2 - w / 2;
			ctx.drawImage(elem, x, 0, w, h);
			document.querySelector("img").src = canvas.toDataURL();
			elem.width = canvas.width;
			elem.height = canvas.height;
		elem.outerHTML = `<a download="download.png" href="` + elem.src+`">` + elem.outerHTML + `</a>`;
		};
		$('body')[0].innerHTML=`<input id="paste" type="text">Paste Image Here</input><img id="img">`;
		var image;
		var url;
		document.onpaste = function(event){
			var items = (event.clipboardData || event.originalEvent.clipboardData).items;
			console.log(JSON.stringify(items)); /* will give you the mime types */
			for (index in items) {
				var item = items[index];
				if (item.kind === 'file') {
					var blob = item.getAsFile();
					var reader = new FileReader();
					reader.onload = function(event){
						url=event.target.result;
						console.log(url);
						image=$('#img')[0];
						image.src=url;
						createSnackbar("Processing");
						setTimeout(function(){
							draw(image);
							$('#snackbar')[0].style.opactiy='0';
						}, 1000);
					}; /* data url!*/
					
					reader.readAsDataURL(blob);
				}
			};
		};
		
	});
})();