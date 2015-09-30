
//  Create a GMap, centre it on the user.
function Tweography(twitInterface) {
  this.gmap = new google.maps.Map(document.getElementById('map'), {
		// Default to Glasgow for smooth loading.
    center: {lat: 55.873330, lng: -4.257874},
    zoom: 10
  });
  this.infoWindow = new google.maps.InfoWindow({map: this.gmap});
  this.twitInterface = twitInterface;
}

Tweography.prototype = {
  findPosition: function() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(self) {
        return function(position) {
            self.myPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            //  Create message and center the map on geo.
            self.infoWindow.setPosition(self.myPosition);
            self.infoWindow.setContent('Found you!');
            self.gmap.setCenter(self.myPosition);
            self.twitInterface.setPosition(self.myPosition);
          }
      }(this));
    } else {
      // If browser doesn't support Geolocation
      handleLocationError(false, this.infoWindow, this.gmap.getCenter());
    }
  },
}

function handleLocationError(hasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(hasGeolocation ?
                      'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}
