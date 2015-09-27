
//  Plot 100 tweets as an overlay to gmap.
function Plotter() {
  this.image = '../images/little_marker.png';
}

Plotter.prototype = {
  plotTweets: function (tweets, gmap) {
    for (var i in tweets) {
      tweet = tweets[i];

  		if (tweet.coordinates) {
        var myLatLng = {lat: tweet.coordinates[0],
                        lng: tweet.coordinates[1]};

        // Create a marker and set its position.
      	var marker = new google.maps.Marker({
  					map: gmap,
  					position: myLatLng,
            animation: google.maps.Animation.DROP,
            icon: this.image,
  					title: tweet.text
  			});
      }
     }
  }
}
