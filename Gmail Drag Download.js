javascript: (function(){
	/*
	* Adds a download button to a gmail message. Allows you to drag to desktop to download the .eml
	*/
	var createScript = function (id, url, callback) {
		if(document.getElementById('jqueryscript')){
			document.getElementById('jqueryscript').remove();
		};
		var s = document.createElement('script');
		s.src = url;
		s.id = id;
		s.addEventListener('load', callback);
		document.getElementsByTagName('head')[0].appendChild(s);
	};
		
	createScript("jqueryscript", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function () {
		var dragdownload = document.createElement("span");
		dragdownload.innerText = "Download";
		if ($('div[role="listitem"]').find('div[data-legacy-message-id]')[0]) {
			for (let i=0;i<$('div[role="listitem"]').length;i++){
				if ($($('div[role="listitem"]')[i]).find('div[data-legacy-message-id]')[0]) {
					if (!$($('div[role="listitem"]')[i]).find('[data-downloadurl]')[0]) {
						dragdownload.setAttribute("data-downloadurl","application/octet-stream:" + $('div[role=main]').find('div.aia').find('.hP').text().replace(/[|&;:$%@"<>()+,]/g, "") + ".eml:https://mail.google.com/mail/u/0?view=att&th=" + $($('div[role="listitem"]')[i]).find('div[data-legacy-message-id]')[0].getAttribute("data-legacy-message-id") + "&disp=comp&safe=1&zw");
						dragdownload.setAttribute("draggable","true");
						$($('div[role="listitem"]')[i]).find('div[aria-label="More"]')[0].parentElement.insertBefore(dragdownload.cloneNode(true), $($('div[role="listitem"]')[i]).find('div[aria-label="More"]')[0]);
						let fileDetails = $($('div[role="listitem"]')[i]).find('[data-downloadurl]')[0].dataset.downloadurl;
						$($('div[role="listitem"]')[i]).find('[data-downloadurl]')[0].addEventListener("dragstart",function(evt){
									evt.dataTransfer.setData("DownloadURL",fileDetails);
								},false);
					};
				};
			};
		};
	});
})();