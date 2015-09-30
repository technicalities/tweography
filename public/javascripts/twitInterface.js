
//  Object for handling server requests.
//  Recursive function polls the server every 4s.
function TwitInterface() {
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
            self.delay = 4500;
            self.loopStep();
            self.run()
        }
    }(this), this.delay);
  },

  loopStep: function() {
    if (typeof this.position !== undefined && this.position) {
      // Send request to server and on to twitter
      var request = new XMLHttpRequest();
      // Pass the server the geolocation.
      var form = new FormData();
      form.append("location", JSON.stringify(this.position));
      request.open("POST", ROOT_URL+"/tweets", true);

      // Pass this twitInterface to a closure.
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
