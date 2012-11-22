// remap jQuery to $
(function($){})(window.jQuery);


/* trigger when page is ready */
$(document).ready(function (){

	// open PDFs in a new window
	$("a[href$=pdf]").each(function() {
		$(this).attr('target', '_blank');
	});

});


/* optional triggers

$(window).load(function() {
	
});

$(window).resize(function() {
	
});

*/