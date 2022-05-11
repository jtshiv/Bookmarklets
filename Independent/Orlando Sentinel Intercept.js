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
		document.body.innerHTML="";
		$('html')[0].style="height:100%;width:100%";
		var iframe=document.createElement("iframe");
		iframe.id="theiframe";
		iframe.src=window.location.href;
		iframe.style="width:100%;height:100%;border-style: solid;border-width: medium;border-color: gold";
		document.body.style="width:100%;height:100%;";
		/*var banner=document.createElement("div");
		banner.style="height:30px;width:100%;background-color:gold";
		document.body.appendChild(banner);*/
		document.body.appendChild(iframe);
		var timer = setInterval(function() {
			console.log("timer");
			try{
				$('#right-rail').remove();
				$('section#left')[0].style="width:100%";
			} catch(e){
				null
			};
			if ($('div[class*="onesignal-slidedown"]').length){
				$('div[class*="onesignal-slidedown"]').remove();
			};
			if ($('#theiframe').contents().find('div[class*="ads"]').length){
				$('#theiframe').contents().find('div[class*="ads"]').remove();
			};
			if ($("#theiframe").contents().find("div.met-footer-toast").length){
				$("#theiframe").contents().find("div.met-footer-toast").remove();
			};
			if ($("#theiframe").contents().find('#zephr-overlay').length){
				$("#theiframe").contents().find('#zephr-overlay').remove();
				for (img of $("#theiframe").contents().find('img')){
					if (img.getAttribute('data-src')){
						img.src = img.getAttribute('data-src');
					};
				};
				window.addEventListener("scroll", function (event) {
					event.stopPropagation();
				}, true);
				$("#theiframe").contents().find('html').css("overflow","auto");
			};
		},1000);
		
		
	});
})();