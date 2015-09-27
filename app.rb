require 'sinatra'
require 'json'
require 'twitter'

##  Two Sinatra routes for index (map) and tweets:
get '/' do
  File.read(File.join('public', 'index.html'))
end

##  Use post to get geolocation from client:
post '/tweets' do
  json = params['location']
  locationDict = JSON.parse(json)
  lat = locationDict['lat']
  lng = locationDict['lng']
  getNearTweets lat, lng
end


def getNearTweets(lat, lng)
  ## Build a Twitter client with my details:
  config = {
    consumer_key:  "I9dbf9099kftgXcplwICg6K8J",
    consumer_secret: "FVDpNk0dysJhoKk3RRV3ZQifQyXyXc0Kyfdxlc12siRlOzyL5G",
    access_token: "3770776815-GL8FPVtLnf2NyxmU0a87ZVD8ACQZvLml7NO8cfs",
    access_token_secret: "z9PZoCsnS5aGTqllenD7qJk9SYu1DbUQWAHsPnZWikYHL",
  }
  client = Twitter::REST::Client.new(config);

  ## Query the API:
  numTweets = 100
  geo = "#{lat},#{lng},10mi"
  tweets = []
  results = client.search("q:", geocode: geo, result_type: "recent")
  ##  Parse away all but 3 fields:
  results.take(numTweets).each do |tweet|
    lat = tweet.geo.coordinates[0].to_f
    lng = tweet.geo.coordinates[1].to_f
    interesting = { :text => tweet.text.to_s,
                    :coordinates => [lat, lng],
                    :user => tweet.user.name.to_s,}
    tweets.push interesting
  end
  JSON.generate(tweets)
end
