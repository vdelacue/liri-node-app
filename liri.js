//---------------------------------------------------GLOBAL VARIABLES--------------------------------------------------------//

// required dependencies and variables to store necessary info including keys 
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require("axios");
var NodeGeocoder = require("node-geocoder");
var geocoder = NodeGeocoder(options);
var options = {
    provider: "mapquest",
    apiKey: "MHhIFdHLWLgQcoEpGVlEHZ97XX9cAt6I"
};
//command line input variables for liri command and search term
var liriCommand = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");
var divider = "\n------------------------------------------------------------\n\n";
//--------------------------------------------------------GLOBAL FUNCTIONS-------------------------------------------------------------------//

//---------------------------------------------------------SPOTIFY SEARCH-------------------------------------------------------------------//
// Use of spotify API to execute spotify song search
var spotifyFn = function (searchTerm) {
    //If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (!process.argv[3]) {
        searchTerm = "The Sign";
    }
    // call to spotify website with a promise
    spotify.search({
            type: "track",
            query: searchTerm,
            limit: 5
        },
        function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }
            var res = data.tracks.items;
            //Default result if no song is given, The sign by ace of base
            if (!process.argv[3]) {
                var artists = res[2].artists.map(function (artist) {
                    return artist.name
                });
                var songDataDefault = `

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
                `
                console.log(songDataDefault);
                fs.appendFile("log.txt", songDataDefault + divider, function (err) {
                    if (err) throw err;
                });
            } else {
                //create a for loop to loop over each result in the data array limited to 5 per search as per 3rd search parameter above
                for (var i = 0; i < res.length; i++) {
                    //create a variable for each desired data retrieved from search (artist, album, song, link)
                    var artists = res[i].artists.map(function (artist) {
                        return artist.name
                    });
                    // store result for Artist(s), song's name, preview link for song, and album of song
                    var songData = `

                                        █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
                                        █░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█
                                        █░░║║║╠─║─║─║║║║║╠─░░█
                                        █░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█
                                        █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
          ===================================  Result ${i+1}  ================================      

                Artist: ${artists}
                Song: ${res[i].name}
                Album: ${res[i].album.name}
                Link: ${res[i].preview_url}
                `
                    console.log(songData);
                    fs.appendFile("log.txt", songData + divider, function (err) {
                        if (err) throw err;
                    });
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
            var r = response.data[0];
            console.log(r)
            //use moment to manipulate date
            var date = moment(r.datetime).format("MM/DD/YYYY");
            //To get address use reverse geocode and get longitude and latitude from bands in town response
            // store longitude and latitude in variables to use geocoder reverse lookup
            var venue = r.venue.name;
            var longitude = r.venue.longitude;
            var latitude = r.venue.latitude;
            var location = " ";
            geocoder.reverse({
                lat: latitude,
                lon: longitude
            }, function (err, res) {
                location = res[0].formattedAddress;
                var musicData = `
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
_________________VENUE NAME: ${venue}
_________________________________________________________________________________________
_________________VENUE LOCATION: ${location}
_________________________________________________________________________________________
_________________DATE OF EVENT: ${date}
_________________________________________________________________________________________
`
                console.log(musicData);
                fs.appendFile("log.txt", musicData + divider, function(error) {
                    if (error) throw error;
                });
            })
        }).catch(function (error) {
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
                var showData = `
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

    `;
                console.log(showData);
                fs.appendFile("log.txt", showData + divider, function (err) {
                    if (err) throw err;
                });
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
    fs.readFile("random.txt", "utf8", function (err, data) {
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
var switchFn = function (searchTerm, liriCommand) {
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