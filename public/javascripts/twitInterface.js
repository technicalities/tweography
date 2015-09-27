
//  Object for handling server requests.
function TwitInterface(port) {
  this.port = port;
  this.delay = 10;
}

TwitInterface.prototype = {
  onTweets: function(callback) {
    this.onTweetCallback = callback;
  },

  setPosition: function(position) {
    this.position = position;
  },

  run: function() {
    window.setTimeout(function(self) {
        return function() {
            self.delay = 20000;
            self.loopStep();
            self.run()
        }
    }(this), this.delay);
  },

  loopStep: function() {
    if (typeof this.position !== undefined && this.position) {
      // Send request to server and tehn to twitter
      var request = new XMLHttpRequest();
      // Pass the server the geolocation.
      var form = new FormData();
      form.append("location", JSON.stringify(this.position));
      request.open("POST", "http://static-web.functorama.mor:"
            + this.port + "/tweets", true);

      // Pass this twitInterface to a function and closure.
      request.onreadystatechange = function(self){
        return function(){
          if (request.readyState == 4 && request.status == 200){
            var jsonResponse = JSON.parse(request.responseText);
            self.onTweetCallback(jsonResponse);
          }
        }
      }(this);
      request.send(form);
  }
}
}