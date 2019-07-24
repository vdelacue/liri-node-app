//---------------------------------------------------GLOBAL VARIABLES--------------------------------------------------------//

// require files and variables to store key info

require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var NodeGeocoder = require("node-geocoder");
var options = {
    provider: "mapquest",
    apiKey: "MHhIFdHLWLgQcoEpGVlEHZ97XX9cAt6I"
};
var geocoder = NodeGeocoder(options);

// Store all of the argument a user inputs into an array
var procArr = process.argv;
var liriCommand = process.argv[2];

// Movie or song variable is search term according to case
var searchTerm = process.argv.slice(3).join(" ");

//--------------------------------------------------------GLOBAL FUNCTIONS-------------------------------------------------------------------//

//---------------------------------------------------------SPOTIFY SEARCH-------------------------------------------------------------------//

// Use of spotify API to execute spotify song search case command
var spotifyFn = function (searchTerm) {
    //If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (!procArr[3]) {
        searchTerm = "The Sign";
    }
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
            //consolidate location of information
            var res = data.tracks.items;
            if (!procArr[3]) {
                var artists = res[2].artists.map(function (artist) {
                    return artist.name
                });
                console.log(`

                                          █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
                                          █░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█
                                          █░░║║║╠─║─║─║║║║║╠─░░█
                                          █░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█
                                          █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
          ===============================  Your Default Result  ==============================      

                Artist: ${artists}
                Song: ${res[2].name}
                Album: ${res[2].album.name}
                Link: ${res[2].preview_url}
                `)
            } else {
                //create a for loop to loop over each result in the data array limited to 5 per search as per 3rd search parameter above
                for (var i = 0; i < res.length; i++) {
                    //create a variable for each desired data retrieved from search (artist, album, song, link)
                    var artists = res[i].artists.map(function (artist) {
                        return artist.name
                    });
                    var album = res[i].album.name;
                    var song = res[i].name;
                    var link = res[i].preview_url;

                    // result will display Artist(s), song's name, A preview link of the song, and album that the song is from
                    console.log(`

                                        █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
                                        █░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█
                                        █░░║║║╠─║─║─║║║║║╠─░░█
                                        █░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█
                                        █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
          ===================================  Result ${i+1}  ================================      

                Artist: ${artists}
                Song: ${song}
                Album: ${album}
                Link: ${link}
                `)
                }
            }
        })
}

//------------------------------------------------BANDS IN TOWN SEARCH (USING GEOCODER FOR EXACT ADDRESS)-------------------------------------------//
// Use of Bands in Town API to execute Bands in Town Artist Events case command
var bandsInTownFn = function (searchTerm) {
    var queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function (response) {
            console.log(response);
            var r = response.data[0];
            var date = r.datetime;
            var dateArr = date.split('T', 1).toString().split("-");
            var dateFormatted = dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
            var venue = r.venue.name;
            // var city = r.venue.city;
            // var state = r.venue.region;

            //To get address use reverse geocode and get longitude and latitude from bands in town response
            // store longitude and latitude in variables
            var longitude = r.venue.longitude;
            var latitude = r.venue.latitude;
            var location = " ";
            geocoder.reverse({
                lat: latitude,
                lon: longitude
            }, function (err, res) {
            
                location = res[0].formattedAddress;
                console.log(`

_¶¶¶¶_________________________¶¶_________________________________________________________
__¶¶¶¶¶_______________________¶¶_________________________________________________________
__¶¶__¶¶_____________________¶¶¶¶________________________________________________________
___¶¶__¶¶____________________¶¶¶¶¶_______________________________________________________
____¶¶_¶¶¶___________________¶¶__¶¶______________________________________________________
____¶¶_¶¶¶___________________¶¶__¶¶______________________________________________________
_____¶¶¶¶¶___________________¶¶_¶¶¶______________________________________________________
_____¶¶¶¶______________¶¶¶¶ ¶¶__¶¶_______________________________________________________
____¶¶¶¶_____________¶¶¶¶¶¶¶¶¶_¶¶________________________________________________________
___¶¶¶_¶¶__¶¶¶_______¶¶¶¶¶¶¶¶____________________________________________________________
__¶¶¶___¶¶¶¶¶¶¶¶¶_____¶¶¶¶¶¶_____________________________________________________________
_¶¶¶¶__¶¶¶¶___¶¶¶¶_______________________¶¶¶_____________________________________________
_¶¶¶__¶¶¶¶_¶¶¶__¶¶¶__________________¶¶¶¶¶¶______________________________________________
¶¶¶¶__¶¶¶¶¶¶¶¶¶__¶¶¶______________¶¶¶¶¶¶¶¶¶______________________________________________
_¶¶¶__¶¶¶_¶¶__¶__¶¶¶___________¶¶¶¶¶¶¶___¶¶______________________________________________
_¶¶¶¶__¶¶¶¶¶¶¶¶__¶¶________¶¶¶¶¶¶¶¶______¶¶______________________________________________
__¶¶¶¶____¶¶¶__¶¶¶______¶¶¶¶¶¶¶¶¶¶_______¶¶______________________________________________
___¶¶¶¶¶¶___¶¶¶¶¶_____¶¶¶¶¶¶¶¶___¶¶_______¶¶_____________________________________________
_____¶¶¶¶¶¶¶¶¶¶________¶¶¶¶¶_____¶¶___¶¶¶¶¶¶_____________________________________________
________¶¶¶_¶¶¶________¶¶________¶¶__¶¶¶¶¶¶¶_____________________________________________
_______¶¶¶¶¶_¶¶_______¶¶¶_____¶¶¶¶___¶¶¶¶¶_______________________________________________
_______¶¶¶___¶¶_________¶¶___¶¶¶¶¶¶______________________________________________________
_________¶¶¶¶¶__________¶¶___¶¶¶¶¶¶______________________________________________________
_________________________¶¶__¶¶¶¶________________________________________________________
_____________________¶¶¶¶¶¶______________________________________________________________
____________________¶¶¶¶¶¶¶______________________________________________________________
____________________¶¶¶¶¶¶_______________________________________________________________
_________________________________________________________________________________________
_________________CONCERT RESULTS FOR: ${searchTerm}
_________________________________________________________________________________________
_________________VENUE NAME: ${r.venue.name}
_________________________________________________________________________________________
_________________VENUE LOCATION: ${location}
_________________________________________________________________________________________
_________________DATE OF EVENT: ${dateFormatted}
_________________________________________________________________________________________

`)
            })
        })
}

//-----------------------------------------------------------------OMDB SEARCH---------------------------------------------------------//
// Use of OMDB API to execute movie search case command
var omdbFn = function (searchTerm) {
    if (process.argv[3] === undefined) {
        searchTerm = "Mr. Nobody";
    };
    //API defined search according to user input stored in searchTerm
    var queryURL = 'http://www.omdbapi.com/?t=' + searchTerm + '&y=&plot=short&apikey=trilogy';
    axios.get(queryURL).then(
            function (response) {
                var r = response.data;

                console.log(`
    ☆ ∩∩ （ • •）☆
┏━∪∪━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
❝ ${searchTerm} Results。 ❞ ☆
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

☆ Title of Movie: ${r.Title}

☆ Year the movie came out: ${r.Year}

☆ IMDB Rating of the movie: ${r.imdbRating}

☆ Rotten Tomatoes Rating of the movie: ${r.Ratings[1].Value}

☆ Country where the movie was produced: ${r.Country}

☆ Language of the movie: ${r.Language}

☆ Plot of the movie: ${r.Plot}

☆ Actors in the movie: ${r.Actors} 

    `);
            })
        .catch(function (error) {
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

//------------------------------------------------DO WHAT I SAY--------------------------------------------------------//
// function to execute 'do what it says' case command
var dwisFn = function (searchTerm) {
    // We will read the existing random.txt file
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        // Break down all the data inside
        data = data.split(",");
        console.log(data);
        liriCommand = data[0];
        searchTerm = data[1].slice(1, -1);
        process.argv[3] = searchTerm;
        console.log(searchTerm + liriCommand)
        switchFn(searchTerm, liriCommand);
    });
}

//------------------------------------------------LIRI COMMAND EXECUTION-----------------------------------------------//

//Switch Case Function that defines what to execute according to liriCommand given
//possible commands are limited to `spotify-this-song`, `concert-this`, `movie-this`, and `do-what-it-says`
var switchFn = function(searchTerm, liriCommand) {
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
}

switchFn(searchTerm, liriCommand);