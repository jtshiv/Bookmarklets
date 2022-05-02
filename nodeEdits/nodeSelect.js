javascript: (function(){
	/* var createScript = function(id, url, callback) {
		if (document.getElementById('jqueryscript')) {
			document.getElementById('jqueryscript').remove();
		};
		var s = document.createElement('script');
		s.src = url;
		s.id = id;
		s.addEventListener('load', callback);
		document.getElementsByTagName('head')[0].appendChild(s);
	};
	createScript("jquery", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function() { */
		
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
			if ($('.bordercss').length){$('.bordercss').removeClass('bordercss')};
			$elems.addClass('bordercss');
			console.log('added border');
			/*setTimeout(function(){
				console.log($elems);
				$elems.removeClass('bordercss');
				console.log('removed border');
				$.fn.bordercss= null;
			},5000);*/
		};
		/*jQuery extensions to get and copy css of jq element*/
		$.fn.getStyleObject = function(){
			var dom = this.get(0);
			var style;
			var returns = {};
			if(window.getComputedStyle){
				var camelize = function(a,b){
					return b.toUpperCase();
				};
				style = window.getComputedStyle(dom, null);
				for(var i = 0, l = style.length; i < l; i++){
					var prop = style[i];
					var camel = prop.replace(/\-([a-z])/g, camelize);
					var val = style.getPropertyValue(prop);
					returns[camel] = val;
				};
				return returns;
			};
			if(style = dom.currentStyle){
				for(var prop in style){
					returns[prop] = style[prop];
				};
				return returns;
			};
			return this.css();
		};
		$.fn.copyCSS = function(source){
			var styles = $(source).getStyleObject();
			this.css(styles);
		};
		
		/*Snackbar*/
		var createSnackbar=function(message){
			/*to remove, set snackbar.style.opacity = '0'*/
			if ($('#snackbarstyle').length){
				$('#snackbarstyle').remove();
			};
			var style = $('<style/>',{id:'snackbarstyle',html:atob('I3NuYWNrYmFyIHsgdmlzaWJpbGl0eTogaGlkZGVuOyAvKiBIaWRkZW4gYnkgZGVmYXVsdC4gVmlzaWJsZSBvbiBjbGljayAqLyB0cmFuc2l0aW9uOiBvcGFjaXR5IDFzOyBtaW4td2lkdGg6IDI1MHB4OyAvKiBTZXQgYSBkZWZhdWx0IG1pbmltdW0gd2lkdGggKi8gbWFyZ2luLWxlZnQ6IC0xMjVweDsgLyogRGl2aWRlIHZhbHVlIG9mIG1pbi13aWR0aCBieSAyICovIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IC8qIEJsYWNrIGJhY2tncm91bmQgY29sb3IgKi8gY29sb3I6ICNmZmY7IC8qIFdoaXRlIHRleHQgY29sb3IgKi8gdGV4dC1hbGlnbjogY2VudGVyOyAvKiBDZW50ZXJlZCB0ZXh0ICovIGJvcmRlci1yYWRpdXM6IDJweDsgLyogUm91bmRlZCBib3JkZXJzICovIHBhZGRpbmc6IDE2cHg7IC8qIFBhZGRpbmcgKi8gcG9zaXRpb246IGZpeGVkOyAvKiBTaXQgb24gdG9wIG9mIHRoZSBzY3JlZW4gKi8gei1pbmRleDogMTsgLyogQWRkIGEgei1pbmRleCBpZiBuZWVkZWQgKi8gbGVmdDogNTAlOyAvKiBDZW50ZXIgdGhlIHNuYWNrYmFyICovIGJvdHRvbTogMzBweDsgLyogMzBweCBmcm9tIHRoZSBib3R0b20gKi99LyogU2hvdyB0aGUgc25hY2tiYXIgd2hlbiBjbGlja2luZyBvbiBhIGJ1dHRvbiAoY2xhc3MgYWRkZWQgd2l0aCBKYXZhU2NyaXB0KSAqLyNzbmFja2Jhci5zaG93IHsgdmlzaWJpbGl0eTogdmlzaWJsZTsgLyogU2hvdyB0aGUgc25hY2tiYXIgKi8gLyogQWRkIGFuaW1hdGlvbjogVGFrZSAwLjUgc2Vjb25kcyB0byBmYWRlIGluIGFuZCBvdXQgdGhlIHNuYWNrYmFyLiBIb3dldmVyLCBkZWxheSB0aGUgZmFkZSBvdXQgcHJvY2VzcyBmb3IgMi41IHNlY29uZHMgKi8gLXdlYmtpdC1hbmltYXRpb246IGZhZGVpbiAwLjVzOyBhbmltYXRpb246IGZhZGVpbiAwLjVzO30vKiBBbmltYXRpb25zIHRvIGZhZGUgdGhlIHNuYWNrYmFyIGluIGFuZCBvdXQgKi9ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHsgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9fUBrZXlmcmFtZXMgZmFkZWluIHsgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRlb3V0IHsgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO30gdG8ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9fUBrZXlmcmFtZXMgZmFkZW91dCB7IGZyb20ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9IHRvIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fX0=')})[0];
			document.head.appendChild(style);
			if ($('#snackbar').length){
				$('#snackbar').remove();
			};
			var snackbar = $('<div/>',{'id':'snackbar'})[0],
				sbText = $('<div/>',{'id':'sbText','text':message.substring(0,50)+(message.length>50?'...':'')})[0],
				sbUp = $('<div/>',{'id':'sbUp','text':'Next Parent'})[0],
				sbSelect = $('<div/>',{'id':'sbSelect','text':'Select Element'})[0];
			snackbar.addEventListener('transitionend', function() {
				snackbar.remove();
				style.remove();
			});
			$(sbUp).on('click.up',function(e){
				console.log(elementMouseIsOver);
				elementMouseIsOver=elementMouseIsOver.parentElement;
				$(elementMouseIsOver).bordercss();
				$('#sbText').text().substring(0,50) + ($('#sbText').text().length>50?'...':'');
			});
			$(sbSelect).on('click.select',function(e){
				console.log(elementMouseIsOver);
				$('.bordercss').removeClass('bordercss');
				$('#snackbar')[0].style.opacity = '0';
				/*copy target css and all lower element css*/
				$(elementMouseIsOver).copyCSS($(elementMouseIsOver));
				$(elementMouseIsOver).find('*').each(function() {
					$(this).copyCSS($(this));
				});
				var index_highest = 0;
				$("*").each(function() {
					var index_current = parseInt($(this).css("zIndex"), 10);
					if(index_current > index_highest) {
						index_highest = index_current;
					};
				});
				$('html').css({'height':'100%','width':'100%','overflow':'auto'});
				window.addEventListener('scroll',function(event){
					event.stopPropagation();
				},true);
				var $read = $('<div/>',{'id':'read'});
				$read.css({'z-index':index_highest+1,'overflow':'auto','width':'100%','height':'100%','position':'fixed','left':0,'top':0});
				document.body.appendChild($read[0]);
				var captured = elementMouseIsOver.cloneNode(true);
				$read[0].appendChild(elementMouseIsOver.cloneNode(true));
				document.head.innerHTML = '';
				document.body.innerHTML = '';
				document.body.appendChild($read[0]);
				$.fn.bordercss= null;
			});
			snackbar.appendChild(sbText);
			snackbar.appendChild(sbUp);
			snackbar.appendChild(sbSelect);
			document.body.appendChild(snackbar);
			
			snackbar.setAttribute('class','show');
			return snackbar;
		};

		
		/*click function*/
		var elementMouseIsOver;
		$(window).on('click.bordercss',function(e) {
			var x = e.clientX, y = e.clientY;
			elementMouseIsOver = document.elementFromPoint(x, y);
			$(elementMouseIsOver).bordercss();
			console.log(elementMouseIsOver);
			createSnackbar(elementMouseIsOver.innerText);
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
		
	/* }); */
})();