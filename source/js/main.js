$(document).ready(function() {

	// Navigation class helpers
	$('.nav-toggle').click(function () {
		$('.masthead').toggleClass('nav-push');
		$('.masthead-wrap nav ul li a').toggleClass('nav-open');
	});
	
	// responsive images, also @2x
	$.fn.imageSwap({imageContainer: '.img-project', breakpoints: [320,321,960]})

	//hide safari bar mobile web - this should be edited, not great with mobile chrome
	window.addEventListener("load",function() {
		// Set a timeout...
		setTimeout(function(){
			// Hide the address bar!
			window.scrollTo(0, 1);
			}, 0);
		});	
});