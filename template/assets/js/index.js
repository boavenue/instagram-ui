$(document).ready(function() {
	// alert();
	var feed = new Instafeed({
		get: "tagged",
		tagName: "awesome",
		clientId: "222873872176138"
	});
	feed.run();
});
