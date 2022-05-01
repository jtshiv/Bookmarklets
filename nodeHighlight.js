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
	createScript("jquery", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function() {
		/*create css for border*/
		if($('#bordercss').length){$('#bordercss').remove()};
		var s = document.createElement('style');
		s.innerHTML = `.bordercss{
			border:2px solid red;
		}
		`;
		s.id = 'bordercss';
		document.getElementsByTagName('head')[0].appendChild(s);
		
		/*jQuery extension to add and remove class*/
		$.fn.bordercss = function() {
			$elems = $(this);
			$elems.addClass('bordercss');
			console.log('added border');
			setTimeout(function(){
				console.log($elems);
				$elems.removeClass('bordercss');
				console.log('removed border');
				/*remove jquery extension*/
				$.fn.bordercss= null;
			},5000);
		};
		
		/*click function*/
		$(window).on('click.bordercss',function(e) {
			var x = e.clientX, y = e.clientY,
				elementMouseIsOver = document.elementFromPoint(x, y);
			$(elementMouseIsOver).bordercss();
			console.log(elementMouseIsOver);
			/*set snackbar to highest z-index*/
			var index_highest = 0;
			$("*").each(function() {
				var index_current = parseInt($(this).css("zIndex"), 10);
				if(index_current > index_highest) {
					index_highest = index_current;
				};
			});
			$('#snackbar').css('z-index',index_highest+1);
			/*removes the click namespace*/
			$(window).off('click.bordercss');
		});
		
	});
})();