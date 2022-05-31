javascript:(function(){for (elem of document.querySelectorAll('#video-title')){
	    elem.href = elem.href.replace(/&list=.*$/,"");
}})()
