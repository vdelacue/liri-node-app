require("dotenv").config();
var keys = require("/keys.js");

var spotify = new Spotify(keys.spotify);

//Store all of the argument a user inputs into an array
var procArgvArr = process.argv;
var liriCommand = process.argv[2];
//movie or song
var movOrSong = "";
//attaches multiple word arguments
for (var i = 3; i < procArgvArr.length; i++){
  if(i > 3 && i < procArgvArr.length){
    movOrSong = movOrSong + "+" + procArgvArr[i];
  } else{
    movOrSong = movOrSong + procArgvArr[i];
  }
}


