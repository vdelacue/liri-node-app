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

// Movie or song variable is search term according to case
var searchTerm = searchTerm = process.argv.slice(3).join(" ");

if (!procArr[3]) {
    searchTerm = "The Sign";
}

//-------------------------GLOBAL FUNCTIONS------------------------//

// Use of spotify API to execute spotify song search case command
//If no song is provided then your program will default to "The Sign" by Ace of Base.
var spotifyFn = function (searchTerm) {
    // call to spotify website with a promise
    // take the movie or song varriable and use it as the search parameter in the spotify API
    spotify.search({
            type: "track",
            query: searchTerm,
            limit: 5
        },
        function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }
            var dataTra = data.tracks.items;
            if (!procArr[3]) {
                var artists = dataTra[2].artists.map(function (artist) {
                    return artist.name
                });
                console.log(`
          ===============================  Your Default Result  ==============================      

                Artist: ${artists}
                Song: ${dataTra[2].name}
                Album: ${dataTra[2].album.name}
                Link: ${dataTra[2].href}
                `)
            } else {
                //create a for loop to loop over each result in the data array limited to 5 per search as per 3rd search parameter above
                for (var i = 0; i < dataTra.length; i++) {
                    //create a variable for each desired data retrieved from search (artist, album, song, link)
                    var artists = dataTra[i].artists.map(function (artist) {
                        return artist.name
                    });
                    var album = dataTra[i].album.name;
                    var song = dataTra[i].name;
                    var link = dataTra[i].href;

                    // result will display Artist(s), song's name, A preview link of the song, and album that the song is from
                    console.log(`
          ===============================  Result ${i+1}  ==============================      

                Artist: ${artists}
                Song: ${song}
                Album: ${album}
                Link: ${link}
                `)
                }
            }
        })
}

// Use of Bands in Town API to execute Bands in Town Artist Events case command
var bandsInTownFn = function () {

}

// Use of OMDB API to execute movie search case command
var omdbFn = function (searchTerm) {
    //API defined search according to user input stored in searchTerm
    var queryURL = 'http://www.omdbapi.com/?t=' + searchTerm + '&y=&plot=short&apikey=trilogy';
    axios.get(queryURL).then(
  function(response) {
      var r = response.data;
    console.log(`
    ☆ ∩∩ （ • •）☆
┏━∪∪━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
☆
❝ ${searchTerm} Results。 ❞
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

* Title of Movie: ${r.Title}

* Year the movie came out: ${r.Year}

* IMDB Rating of the movie: ${r.imdbRating}

* Rotten Tomatoes Rating of the movie: ${r.Ratings[1].Value}

* Country where the movie was produced: ${r.Country}

* Language of the movie: ${r.Language}

* Plot of the movie: ${r.Plot}

* Actors in the movie: ${r.Actors} 

    `);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

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
        bandsInTownFn(searchTerm);
        break
    case "movie-this":
        omdbFn(searchTerm);
        break
    case "do-what-it-says":
        dwisFn(searchTerm);
        break
}