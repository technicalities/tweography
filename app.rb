require 'sinatra'
require 'json'
require 'twitter'
require_relative './config'

##  Two Sinatra routes for index (map) and tweets:
get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/constants.js' do
   status 200
   headers 'content-type' => 'application/javascript'
   body "ROOT_URL = '#{ROOT_URL}'"
end

##  Use posted request to get geolocation from client:
post '/tweets' do
  json = params['location']
  locationDict = JSON.parse(json)
  lat = locationDict['lat']
  lng = locationDict['lng']
  getNearTweets lat, lng
end


def getNearTweets(lat, lng)
  ## Build a Twitter client with my details:
  authent = {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET,
  }
  client = Twitter::REST::Client.new(authent);

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
