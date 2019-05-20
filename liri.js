require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
let axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var userInput = process.argv.slice(3).join(" ");
var userCmd = process.argv[2];
var firstArr = [];
var x = [];

switch (userCmd) {
  case "spotify-this-song":
    spotifyThis();
    break;

  case "concert-this":
    concertThis();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doThis();
    break;

  default:
    logIt("\n+++===========================================+++\n");
    logIt(
      '•LIRI-Bot: "Welcome! Please enter a command."\n\n•LIRI-Bot: "I understand these commands: {concert-this}, {spotify-this-song}, {movie-this}, {do-this}."\n'
    );
    logIt("// Example: {liri.js spotify-this-song Hello Adele} //");
    logIt("\n+++=========================================+++\n");

    break;
}

function concertThis() {
  if (!userInput) {
    logIt("+++=========================================+++\n");
    logIt(
      'YOU DID NOT ENTER A VALID CONCERT.\n............\nSHOWING 5 RESULTS FOR "CHER"\n............\n'
    );
    logIt("\n• • • • • • • • RESULTS • • • • • • • • ");
    userInput = "Cher";
    search();
  } else {
    logIt(
      '\n•LIRI-Bot: "Thank-you for your input....." \n•LIRI-Bot: "I am now showing 5 results for "' +
        userInput.toUpperCase() +
        '."'
    );
    logIt("\n• • • • • • • • RESULTS • • • • • • • • ");
    search();
  }

  function search() {
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          userInput +
          "/events?app_id=" +
          keys.bands.id
      )
      .then(function(response) {
        for (var i = 0; i < 5; i++) {
          logIt("\n+++===============++EVENT++=================+++");
          logIt("+++Venue Name+++");
          logIt(response.data[i].venue.name);
          logIt("\n+++Venue Location+++");
          logIt(
            response.data[i].venue.city + ", " + response.data[i].venue.country
          );
          logIt("\n+++Venue Date+++");
          logIt(moment(response.data[i].datetime).format("L") + "\n");
        }
        logIt("+++=========================================+++\n");
      });
  }
}

function spotifyThis() {
  userInput = userInput;
  //if there's no initial song input, default to ace of base;
  if (!userInput) {
    logIt(
      '\n•LIRI-Bot: "You did not enter a song. I will display Spotify results for: The Sign by Ace of Base".'
    );
    userInput = "The Sign Ace of Base";
    logIt("\n• • • • • • • • RESULTS • • • • • • • • ");
    search();
  }
  //if there is song input by user, liri will run the spotify search for that song.
  else {
    logIt(
      '\n•LIRI-Bot: "Thank-you for your input....." \n•LIRI-Bot: "I am now showing 5 results for "' +
        userInput.toUpperCase() +
        '."'
    );
    logIt("\n• • • • • • • • RESULTS • • • • • • • • ");
    search();
  }
  //SEARCH FUNCTION FOR SPOTIFY. TAKES THE userInput BY USER AND SEARCHES SPOTIFY API.
  function search() {
    spotify
      .search({
        type: "track",
        query: userInput,
        limit: 2
      })
      .then(function(response) {
        // var data = response;
        var data = response.tracks.items[0];
        let albumName = data.album.name;
        let nameSong = data.name;
        let bandName = data.album.artists[0].name;
        let previewName = data.preview_url;
        if (previewName === null){
          previewName = "---No Preview Available---";
        }

        //logIt RESULTS OF API
        logIt("\n+++=======Artist Name===============+++\n");
        logIt("+++ " + bandName);
        logIt("\n+++=======Song Name=================+++\n");
        logIt("+++ " + nameSong);
        logIt("\n+++=======Album Name================+++\n");
        logIt("+++ " + albumName);
        logIt("\n+++=======Preview URL===============+++\n");
        logIt("+++ " + previewName);
        logIt("\n+++=================================+++\n");
      })
      .catch(function(err) {
        logIt(err);
      });
  }
}

function movieThis() {
  if (!userInput) {
    logIt(
      '\n•LIRI-Bot: "You did not enter a movie. I will display OMDB results for: Mr. Nobody".'
    );
    userInput = "Mr. Nobody";
    logIt("\n• • • • • • • • RESULTS • • • • • • • • ");
    search();
  } else {
    logIt(
      '\n•LIRI-Bot: "Thank-you for your input....." \n•LIRI-Bot: "I am now showing movie results for "' +
        userInput.toUpperCase() +
        '."'
    );
    logIt("\n• • • • • • • • RESULTS • • • • • • • • ");
    search();
  }

  function search() {
    axios
      .get(
        "http://www.omdbapi.com/?t=" +
          userInput +
          "&y=&plot=short&apikey=" +
          keys.movies.id
      )
      .then(function(response) {
        logIt("\n+============Movie Title===========+\n");
        logIt(JSON.stringify(response.data.Title, null, 2));

        logIt("\n+===========Year Released==========+\n");
        logIt(JSON.stringify(response.data.Year, null, 2));

        logIt("\n+============IMDB Rating===========+\n");
        logIt(JSON.stringify(response.data.Ratings[0].Value, null, 2));

        logIt("\n+==========Rotten Tomatoes=========+\n");
        logIt(JSON.stringify(response.data.Ratings[1].Value, null, 2));

        logIt("\n+=======Countries of Production=======+\n");
        logIt(JSON.stringify(response.data.Country, null, 2));

        logIt("\n+===========Movie Language==========+\n");
        logIt(JSON.stringify(response.data.Language, null, 2));

        logIt("\n+==============Movie Plot=============+\n");
        logIt(JSON.stringify(response.data.Plot, null, 2));

        logIt("\n+===============Actors==============+\n");
        logIt(JSON.stringify(response.data.Actors, null, 2));
        logIt("\n\n• • • • • • • • END RESULTS • • • • • • • •");
      });
  }
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      logThis(err);
    }
    firstArr = data.split(/,|\n/);
    (count = firstArr.length), (i = 0);

    x = firstArr.filter((element, index) => {
      return index % 2 === 0;
    });
    // logIt(x)

    for (let i = 0; i < x.length; i++) {
      // logIt(x[i]);

      switch (x[i]) {
        case "spotify-this-song":
          arrayX();
          spotifyThis(userInput);
          break;
        case "concert-this":
          arrayX();
          concertThis(userInput);
          break;

        case "movie-this":
          arrayX();
          movieThis(userInput);
          break;
      }



      function arrayX() {
        let indexPos = firstArr.indexOf(x[i]);
        indexPos++;
        userInput = firstArr[indexPos];
        userInput = userInput.replace(/['"]+/g, "");
      }
    }
  });
}

function logIt (logFile) {
  console.log(logFile);
  fs.appendFile("log.txt", logFile, function(err) {
      if (err) {
          return logIt("Error: " + err);
      }
  });
};