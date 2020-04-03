$(function() {
	var linkInstagramUserNameInput = $("#link-instagram-username");
	var linkInstagramImageInput = $("#link-instagram-image");
	const submitEvent = $(".submit-event");

	// linkInstagramUserNameInput = "trivnm";
	// linkInstagramImageInput = "BOZZ7i-BhfI";

	function responeSuccess() {
		setTimeout(() => {
			$(".flatform-design").addClass("flatform-success");
		}, 500);
	}

	function responeError() {}

	function formaterNumber(num) {
		if (num >= 1000000000) {
			return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
		}
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
		}
		return num;
	}

	function loadProfile(getValueFromInstagramUserNameInput) {
		$.ajax({
			url: `https://www.instagram.com/${getValueFromInstagramUserNameInput}/?__a=1`,
			type: "get",
			success: function(respone) {
				console.log("wer: ", respone);
				let get = respone.graphql;
				let getAvarta = get.user.profile_pic_url_hd;
				let getUserName = get.user.username;
				let getFullName = get.user.full_name;
				let getBiography = get.user.biography;
				let getEdgeFollowedBy = get.user.edge_followed_by.count;
				let getEdgeFollow = get.user.edge_follow.count;
				let getPost = get.user.edge_owner_to_timeline_media.count;
				let getItemPosts = get.user.edge_owner_to_timeline_media.edges;
				let itemPost = "";
				for (let i = 0; i < getItemPosts.length; i++) {
					let eachItemPost = getItemPosts[i];
					let getUrlImageItemPosts = eachItemPost.node.display_url;
					itemPost += `
						<li class="item">
							<img src="${getUrlImageItemPosts}" class="images">
						</li>
					`;
				}
				$(".flatform-design__list-image").html(itemPost);
				$(".flatform-design__avarta .avarta .images").attr(
					"src",
					getAvarta
				);
				$(".flatform-design__avarta .name").text(getFullName);
				$(".flatform-design__avarta .username").text("@" + getUserName);
				$(".flatform-design__avarta .username.des").text(getBiography);
				$(".flatform-design__link .posts .number").text(
					formaterNumber(getPost)
				);
				$(".flatform-design__link .followed-by .number").text(
					formaterNumber(getEdgeFollowedBy)
				);
				$(".flatform-design__link .follow .number").text(
					formaterNumber(getEdgeFollow)
				);
				console.log("[loadProfile]: success");
				responeSuccess();
			},
			error: function(respone) {
				console.log("[loadProfile]: error");
			}
		});
	}

	function loadSingleImage(getValueFromInstagramImageInput) {
		$.ajax({
			url: `https://www.instagram.com/p/${getValueFromInstagramImageInput}/?__a=1`,
			type: "get",
			success: function(respone) {
				var get = respone.graphql.shortcode_media;
				var getThumbnailBackground = get.display_url;
				$(
					".flatform-design__thumbnail-inner-bg, .flatform-design__thumbnail-bg"
				).css(
					"background-image",
					"url(" + getThumbnailBackground + ")"
				);
				console.log("[loadSingleImage]: success");
				console.log(respone);
				responeSuccess();
			},
			error: function() {
				console.log("[loadSingleImage]: error");
			}
		});
	}

	function inputValiadtion() {
		$('input[type="text"]').each(function() {
			let checkEmptyInput = $(this).val() == "";
			if (checkEmptyInput) {
				$(this)
					.parent(".form-group")
					.addClass("error-open");
			} else {
				$(this)
					.parent(".form-group")
					.removeClass("error-open");
			}
		});
	}
	submitEvent.on("click", function(e) {
		var getValueFromInstagramUserNameInput = linkInstagramUserNameInput.val();
		var getValueFromInstagramImageInput = linkInstagramImageInput.val();
		e.preventDefault();
		inputValiadtion();
		loadProfile(getValueFromInstagramUserNameInput);
		loadSingleImage(getValueFromInstagramImageInput);
	});

	$.ajax({
		url: `https://www.instagram.com/hiiambooo/?__a=1`,
		type: "get",
		success: function(respone, xhr) {
			console.log("wer: ", respone);
		},
		error: function(respone) {
			console.log("[loadProfile]: error");
		}
	});
});
