"use strict";

$(document).ready(function () {
  // alert();
  var feed = new Instafeed({
    get: "popular",
    tagName: "awesome"
  });
  feed.run();
});