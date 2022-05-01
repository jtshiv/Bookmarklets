javascript: (function(){
    var createScript = function(id, url, callback) {
		if (document.getElementById(id)) {
			document.getElementById(id).remove();
		};
		var s = document.createElement('script');
		s.src = url;
		s.id = id;
		s.addEventListener('load', callback);
		document.getElementsByTagName('head')[0].appendChild(s);
	};
	createScript("nodeSelect", "", function() {

    });
})();