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

/*
* html request
* this didn't work bc the raw url has a token that expires.
* I need to find an alternative
*/

/*
function reqList(){
    console.log(this.responseText);
};
var req = new XMLHttpRequest();
req.addEventListener("load",reqList);
req.open("GET","https://raw.githubusercontent.com/jtshiv/Bookmarklets/nodeSlim/nodeEdits/nodeSelect.js?token=GHSAT0AAAAAABUDKMWOMWAKL7HIWCVFKCQ4YTO2H3A");
req.send();
*/