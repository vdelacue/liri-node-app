//--------------------------GLOBAL VARIABLES----------------------//

// require files and variables to store key info
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


// Store all of the argument a user inputs into an array
var procArr = process.argv;
var liriCommand = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

// Movie or song variable
var movOrSong = "";


//-------------------------GLOBAL FUNCTIONS------------------------//

// Attaches multiple word arguments together into movOrSong global variable
// var getMovOrSong = function () {
//     procArr.slice(3).join(" ");
// }
// getMovOrSong();

// Use of spotify API to execute spotify song search case command
// take the movie or song varriable and use it as the search parameter in the spotify API
// result will display Artist(s), song's name, A preview link of the song, and album that the song is from
//If no song is provided then your program will default to "The Sign" by Ace of Base.
var spotifyFn = function (searchTerm) {
    // call to spotify website with a promise
    spotify.search({
            type: "track",
            query: searchTerm,
            limit: 3
        },
        function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }
            // var data = JSON.stringify(data, null, 2)
            var dataTra = data.tracks.items;
            // for(keys in data){
            //     console.log(JSON.parse(data))
            for (var i = 0; i < dataTra.length; i++) {

                console.log(dataTra)
                console.log("=========================")
                console.log(dataTra[i])
                
                var artists = dataTra[i].artists.map(function (artist) {
                    return artist.name
                });

                var song = searchTerm.toUpperCase() ;
                var album = dataTra[i].name;
                var link = dataTra[i].href;


                console.log(`

                Artist: ${artists}
                Song: ${song}
                Album: ${album}
                Link: ${link}

                `)
             

            }
        })
    // .then(function (response) {
    //     console.log(response);
    // })
}

// Use of Bands in Town API to execute Bands in Town Artist Events case command
var bandsInTownFn = function () {

}

// Use of OMDB API to execute movie search case command
var omdbFn = function () {

}

// function to execute 'do what it says' case command
var dwisFn = function () {

}



//------------------------LIRI COMMAND EXECUTIONS------------------//

//Switch Case Function that defines what to execute according to liriCommand given
//possible commands are limited to `spotify-this-song`, `concert-this`, `movie-this`, and `do-what-it-says`

switch (liriCommand) {
    case "spotify-this-song":
        spotifyFn(searchTerm);
        break
    case "concert-this":
        bandsInTownFn();
        break
    case "movie-this":
        omdbFn();
        break
    case "do-what-it-says":
        dwisFn();
        break
}