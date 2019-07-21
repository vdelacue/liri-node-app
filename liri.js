//--------REQUIRE FILES FOR FUNCTION & LOGIC EXECUTION---------//

require("dotenv").config();
require("/keys.js");

//--------------------------GLOBAL VARIABLES----------------------//

// import keys and store keys froms keys.js file
var keys = require("/keys.js");
var spotify = new Spotify(keys.spotify);

// Store all of the argument a user inputs into an array
var procArgvArr = process.argv;
var liriCommand = process.argv[2];

// Movie or song variable
var movOrSong = "";


//-------------------------GLOBAL FUNCTIONS------------------------//

// Attaches multiple word arguments together into movOrSong global variable
for (var i = 3; i < procArgvArr.length; i++){
  if(i > 3 && i < procArgvArr.length){
    movOrSong = movOrSong + "+" + procArgvArr[i];
  } else{
    movOrSong = movOrSong + procArgvArr[i];
  }
};

// Use of spotify API to execute spotify song search case command
var spotifyFn = function(){

} 

// Use of Bands in Town API to execute Bands in Town Artist Events case command
var bandsInTownFn = function(){
    
}

// Use of OMDB API to execute movie search case command
var omdbFn = function(){
    
} 

// function to execute 'do what it says' case command
var dwisFn = function(){
    
}



//------------------------LIRI COMMAND EXECUTIONS------------------//

//Switch Case Function that defines what to execute according to liriCommand given
//possible commands are limited to `spotify-this-song`, `concert-this`, `movie-this`, and `do-what-it-says`

switch(liriCommand){
    case "spotify-this-song":

        break
    case "concert-this":
        break
    case "movie-this":
        break
    case "do-what-it-says":
        break
}


