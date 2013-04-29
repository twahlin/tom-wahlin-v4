$(document).ready(function() {

	// Navigation class helpers
	$('.nav-toggle').click(function () {
		$('.masthead').toggleClass('nav-push');
		$('.masthead-wrap nav ul li a').toggleClass('nav-open');
	});	
	
	// //Retina images
	// $("img").unveil();
	

	//hide safari bar mobile web - this should be edited, not great with mobile chrome
	window.addEventListener("load",function() {
		// Set a timeout...
		setTimeout(function(){
			// Hide the address bar!
			window.scrollTo(0, 1);
			}, 0);
		});	
});
