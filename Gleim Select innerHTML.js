javascript: (function(){
	/*
	* Select the node with the notes to be copied into
	* Calibre to make an ebook out of the Gleim guide.
	*/
	var node = $('table.outlineContainer').find('td')[0];
	var newNode = document.createElement('input');
	newNode.setAttribute('value', node.innerHTML);
	node.parentNode.insertBefore(newNode, node);
	newNode.select();
})();