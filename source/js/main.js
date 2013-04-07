$(document).ready(function() {
	
	// // dependant on transit js -- spinny nav
	// $(".masthead").click(function() {
	//   $(".rotated").removeClass("rotated").transition({
	// 		perspective: '0',
	// 	  rotateX: '0deg',
	// 		duration: 250
	// 	});
	// 	$(this).addClass("rotated").transition({
	// 		perspective: '0',
	// 	  rotateX: '90deg',
	// 		duration: 250
	// 	});
	// });
	
	// dependant on transit js -- nav
	$('.nav-toggle').click(function () {
		$('.masthead').toggleClass('nav-push');
		$('.masthead-wrap nav ul li a').toggleClass('nav-open');
	});
	
	
	// Display most recent dribbble shot
	$.jribbble.getShotsByPlayerId('twahlin', function (playerShots) {
		var html = [];
		
		$.each(playerShots.shots, function (i, shot) {
			html.push('<li><h3>' + shot.title + '</h3>');
			html.push('<h4>by ' + shot.player.name + '</h4><a href="' + shot.url + '">');
			html.push('<img src="' + shot.image_url + '" ');
			html.push('alt="' + shot.title + '"></a></li>');
		});
		
		$('#shotsByPlayerId').html(html.join(''));
	}, {page: 1, per_page: 1});
	
	
	// Display latest tweet
  jQuery(function($){
    $("#tweet").tweet({
      avatar_size: 32,
      count: 1,
      fetch: 5,
      filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
      username: "twahlin",
			template: "{text}"
    });
  });
});

//hide safari bar
window.addEventListener("load",function() {
	// Set a timeout...
	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
});