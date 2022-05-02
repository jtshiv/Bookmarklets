/* The purpose of this bookmarklet is to run the nodeSelect script. There's a function to
pull the data from the url then pass it into the innHTML of a new script node. */

javascript: (function(){
    var urls = ["https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
        "https://raw.githubusercontent.com/jtshiv/Bookmarklets/main/nodeEdits/nodeSelect.js"
        ];
    var ids = ["jqueryscript",
        "nodeSelect"
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