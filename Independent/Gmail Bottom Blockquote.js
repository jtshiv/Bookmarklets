javascript: (function() {
		/* This script's goal is to find the original quoted email, scroll the window to it,
		/* then flash the block red to be easier to get the background on an email.
		*/
		var elem;
		var arr=[];
		
		/* Loop through and find the header7 block that is visible (offsetParent not null)
		/* and then test that the .gmail_quote class is contained somewhere inside.
		/* Not able to test each in this block if the class is visible but sometiems the
		/* h7 blocks are hidden so that needs to be tested.
		*/
		for (i=0;i<$('.h7').length;i++){
			if ($('.h7')[i].offsetParent!=null && $($('.h7')[i]).find('.gmail_quote').length>0){
				arr=$($('.h7')[i]).find('.gmail_quote');
				break;
			};
		};
		
		/* Loop through the arr from previous to find the last elem with the quote class
		/* that is visible (theoretically the original email
		*/
		for (i=arr.length-1;i>-1;i--){
			if (arr[i].offsetParent!=null){
				elem=arr[i];
				console.log(elem);
				break;
			};
		};
				
		/* Smooth scroll the element to the center of the window
		*/
        elem.scrollIntoView( {
                block: "center", inline: "nearest", behavior:"smooth"
            }

        );
		
		/* changes the background to red the to white. If the background is something
		/* besides white originally, this doesn't take it into account. May change in
		/* the future if that becomes an issue.
		*/
  		$(elem).css('background','red');
        setTimeout(function(){$(elem).css('background','white')},2000);
    }

)();