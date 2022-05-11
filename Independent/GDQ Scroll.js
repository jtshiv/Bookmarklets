javascript: (function(){
	/* 
	* The idea for this script is that it will look for today in
	* the Games Done Quick schedule then find the time block that
	* they are probably in.
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
	createScript("jquery", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function() {
		var today = new Date;
		/*var found;*/
		for (elems of $('[found]')){
			elems.removeAttribute('found');
		};
		for (line of $('.day-split')){
			try{
				var day = /(?:.*,\s.*\s)([0-9]+)(?:[a-z]+$)/g.exec(line.innerText)[1];
				if (day==today.getDate()){
					line.scrollIntoView({block: "center", inline: "nearest", behavior:"smooth"});
					found = line;
					found.setAttribute('found',1);
					break;
				};
			} catch(e){
				console.log(e);
			};
		};
		$('[found=1]').nextAll('tr').attr('found',3);
		$('[found=1]').nextAll('.day-split')[0].setAttribute('found',2);
		$('[found=2]').nextAll('tr').removeAttr('found');
		for (times of $('[found=3]').find('td.start-time')){
			
		};
	});
})();