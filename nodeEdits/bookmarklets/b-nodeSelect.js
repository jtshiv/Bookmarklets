javascript: (function(){
    var createScript = function() {
        var id = "nodeSelect";
		if (document.getElementById(id)) {
			document.getElementById(id).remove();
		};
		var s = document.createElement('script');
		s.id = id;
        s.innerHTML=this.responseText;
		document.getElementsByTagName('head')[0].appendChild(s);
	};
    var req = new XMLHttpRequest();
    req.addEventListener("load",createScript);
    req.open("GET","https://raw.githubusercontent.com/jtshiv/Bookmarklets/main/nodeEdits/nodeSelect.js");
    req.send();
})();