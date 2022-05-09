javascript: (function(){
    var urls = ["https://raw.githubusercontent.com/jtshiv/Bookmarklets/devMasterScript/main.js"
        ];
    var ids = ["mainscript"
    ];
    var createScript = function() {
        var id = ids[i];
        console.log(id);
		if (document.getElementById(id)) {
			document.getElementById(id).remove();
		};
		var s = document.createElement('script');
		s.id = id;
        s.innerHTML=this.responseText;
		document.getElementsByTagName('head')[0].appendChild(s);
        i++;
        if (i<urls.length){
            httpReq();
        };
	};
    var i=0;
    var httpReq = function(){
        var req = new XMLHttpRequest();
        req.addEventListener("load",createScript);
        req.open("GET",urls[i]);
        console.log("Pulling: " + urls[i]);
        console.log("Id: " + ids[i]);
        req.send();
    };
    httpReq();
})();