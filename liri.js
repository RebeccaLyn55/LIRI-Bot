
var importKeys = require('./keys.js');
var Twitter = require('Twitter');
var Spotify = require('Spotify');
var Request = require('Request');


var twitterKeys = keys.twitterKeys;

//Variables for user input
var input = process.argv[3];
var action = process.argv[4];


//Logic for which input user enters
switch (input) {
    case 'my-tweets':
    	//create twitter function
        twitter();
        break;
    case 'spotify-this-song':
    	//create spotify function
        spotify();
        break;
    case 'movie-this':
    	//create open movie database function
    	omdb();
    case 'do-what-it-says':
    	//create random function
    	random();
  }

//Twitter npm package
var client = new Twitter(keys.twitterKeys);

var params = {screen_name: 'Decorah_Eagle_3',
			  count: 20
			  };

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


//Spotify npm package
spotify.search({ type: 'track', query: 'song' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});


function twitter(){

}

function spotify(){

}

function omdb(){

}

function random(){

}



