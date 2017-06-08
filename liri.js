//Welcome message
console.log('Welcome to LIRI BOT!  For recent tweets, enter "my-tweets", for song information, enter "spotify-this-song", and for movie info, enter "movie-this"')

//Declare dependency variables
var importKeys = require('./keys.js');
var Twitter = require('Twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var color = require('colors');

//Declare variable for Twitter authentication
var twitterKeys = importKeys.twitterKeys;

//Declare variables for user input
var input = process.argv[2];
var inquiry = process.argv[3];
	//If more than one word is entered for 'inquiry', concatenate using for loop
	for(i=4; i<process.argv.length; i++){
	    inquiry += '+' + process.argv[i];
	}
	

//Logic - which function will be called - for which input user enters
switch (input) {
    case 'my-tweets':  
        twitter();
        break;
    case 'spotify-this-song':
    	spotify();
        break;
    case 'movie-this':
    	omdb();
    	break;
    case 'do-what-it-says':
    	random();
    	break;
    default:
    	console.log('Please enter "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"'); 	
}

  

///Twitter Function - Twitter npm package
function twitter(){
	//Adding Twitter credentials (keys)
	var client = new Twitter(twitterKeys);
	//Twitter search parameters 
	var params = {screen_name: 'Decorah_Eagle_3', count: 20};
	//npm method for getting tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response){
  		for(i=0; i< tweets.length; i++){
  			//If no error
  			if (!error) {
  			//Only shows the text/when created portion of the tweet from JSON (from Twitter Developer Documentation)
        	console.log(color.yellow(tweets[i].text + '  Created: ' + tweets[i].created_at +'\n'));
        	}
        	//If error, print out error
        	else{
        		return console.log('Error occurred: ' + err);
        	}
      	}
	});
};



//Spotify Function - Spotify npm package
function spotify(){
	//Spotify API keys
	var spotify = new Spotify({
  	id: '92162986496240bcada77ca3ac717f51',
  	secret: '89e858be7fc7413a86f8f3b6423d5e5a'
});
	//npm method for Spotify queries (Default is 'Ace of Base-The Sign')
	spotify.search({type: 'track', query: inquiry ||'Ace of Base The Sign'}, function(err, data) {
		//If error, print out error
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
  		//If no error, access artist, song name, album, and prview track from JSON (from Spotify API Documentation) and print
  		else{
  			//First index from array only
  			var spotifyObject = data.tracks.items[0];
 	
 			console.log(color.cyan("Artist: " + spotifyObject.artists[0].name));
 			console.log(color.cyan("Song Name: " + spotifyObject.name));
   			console.log(color.cyan("Album: " + spotifyObject.album.name));
   			console.log(color.cyan("Preview: " + spotifyObject.preview_url));
   		}
	});
};


 
 //OMDB Function - Request npm package
function omdb(){

	//Declare movie inquiry variable - If request comes back as 'undefined', default to 'Mr. Nobody'
	var movieInquiry;
		if(inquiry === undefined){
			movieInquiry = 'Mr. Nobody';
		}else{
			movieInquiry = inquiry;
	};

	//Query URL for title with API key
	var url = 'http://www.omdbapi.com/?t='+movieInquiry+'&apikey=40e9cece';	
	//Request method
	request(url, function (error, response, body) {
		//HTTP Status Code 200 = 'OK' and no error
 		if(!error && response.statusCode === 200){
 			console.log('\n');
 			//Parse movie string as JSON and create line break
 			var json=JSON.parse(body);
	        console.log(color.grey("Title: " + json.Title+'\n'));
	        console.log(color.grey("Year: " + json.Year+'\n'));
			console.log(color.grey("IMDB Rating: " + json.imdbRating+'\n'));
	        console.log(color.grey("Country: " + json.Country+'\n'));
	        console.log(color.grey("Language: " + json.Language+'\n'));
	        console.log(color.grey("Plot: " + json.Plot+'\n'));
	        console.log(color.grey("Actors: " + json.Actors+'\n'));
	        console.log(color.grey("Website: " + json.Website+'\n'));
		}

	});

}


//Function for random.txt
function random(){
	//Use node file system
	fs.readFile('random.txt/', 'utf8', function (err,data) {
		//If there is an error, return te error
  		if (err) {
    		return console.log(err);
  		}
  		//If no error, split text using comma delimeter
  		else{
  			input=data.split(',')[0];
  			inquiry=data.split(',')[1];

  			//Run logic based on input
  			switch (input) {
		    case 'my-tweets':  
		        twitter();
		        break;
		    case 'spotify-this-song':
		    	spotify();
		        break;
		    case 'movie-this':
		    	omdb();
		    	break;
		    case 'do-what-it-says':
		    	random();
		    	break;
		    default:
		    	console.log('Please enter "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"'); 	
			}
  		}
	});
}