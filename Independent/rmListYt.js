javascript:(function(){
	    /*desktop*/
	    for (elem of document.querySelectorAll('#video-title')){
		            elem.href = elem.href.replace(/&list=.*$/,"");
		        }
	    /*mobile image*/
	    for (elem of document.querySelectorAll('.compact-media-item-image')){
		            elem.href = elem.href.replace(/&list=.*$/,"");
		        }
	    /*mobile other*/
	    for (elem of document.querySelectorAll('.compact-media-item-metadata-content')){
		            elem.href = elem.href.replace(/&list=.*$/,"");
		        }
})()
