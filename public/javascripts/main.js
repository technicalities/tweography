
//  Orchestrates the client side work:
//  Creates a GMap, an interface for server callbacks,
//  object for marker plotting.
function initMap() {
  var port = 4567;             //  Ruby default port.
  var twitInterface = new TwitInterface(port);
  var tweography = new Tweography(twitInterface);
  tweography.findPosition();        // Async

  // Create marker creator:
  var plotter = new Plotter();

  // Create callback from interface to plotter:
  twitInterface.onTweets(function (tweets) {
    plotter.plotTweets(tweets, tweography.gmap);
  });
  twitInterface.run();

  // Popup out of the way
  window.setTimeout(function() {
    tweography.infoWindow.close();
  }, 7000);
}
