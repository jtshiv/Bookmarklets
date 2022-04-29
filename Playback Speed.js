javascript: (function(){
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
		var answer = prompt("What playback speed? Set as 1 for 100%.");/* Pausing will reset the playback speed");*/
		if(answer!=null){
			var elems = document.getElementsByTagName('video');
			if(elems.length){
				elems[0].playbackRate=parseInt(answer);
				/*function setSpeedNormal(){
				console.log("Video playback speed reset to 1");
				elems[0].playbackRate=parseInt(1);
				elems[0].removeEventListener('pause',setSpeedNormal);
				};
				elems[0].addEventListener('pause',setSpeedNormal);*/
			} else{
				alert("Video element not found");
			};
		};
	});
})()