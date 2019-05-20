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
    console.log("\n+++===========================================+++\n");
    console.log(
      '•LIRI-Bot: "Welcome! Please enter a command."\n\n•LIRI-Bot: "I understand these commands: {concert-this}, {spotify-this-song}, {movie-this}, {do-this}."\n'
    );
    console.log("// Example: {liri.js spotify-this-song Hello Adele} //");
    console.log("\n+++=========================================+++\n");

    break;
}

function concertThis() {
  if (!userInput) {
    console.log("+++=========================================+++\n");
    console.log(
      'YOU DID NOT ENTER A VALID CONCERT.\n............\nSHOWING 5 RESULTS FOR "CHER"\n............\n'
    );
    console.log("\n• • • • • • • • RESULTS • • • • • • • • ");
    userInput = "Cher";
    search();
  } else {
    console.log(
      '\n•LIRI-Bot: "Thank-you for your input....." \n•LIRI-Bot: "I am now showing 5 results for "' +
        userInput.toUpperCase() +
        '."'
    );
    console.log("\n• • • • • • • • RESULTS • • • • • • • • ");
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
          console.log("\n+++===============++EVENT++=================+++");
          console.log("+++Venue Name+++");
          console.log(response.data[i].venue.name);
          console.log("\n+++Venue Location+++");
          console.log(
            response.data[i].venue.city + ", " + response.data[i].venue.country
          );
          console.log("\n+++Venue Date+++");
          console.log(moment(response.data[i].datetime).format("L") + "\n");
        }
        console.log("+++=========================================+++\n");
      });
  }
}

function spotifyThis() {
  userInput = userInput;
  //if there's no initial song input, default to ace of base;
  if (!userInput) {
    console.log(
      '\n•LIRI Bot: "You did not enter a song. I will display Spotify results for: The Sign by Ace of Base".'
    );
    userInput = "The Sign Ace of Base";
    console.log("\n• • • • • • • • RESULTS • • • • • • • • ");
    search();
  }
  //if there is song input by user, liri will run the spotify search for that song.
  else {
    console.log(
      '\n•LIRI-Bot: "Thank-you for your input....." \n•LIRI-Bot: "I am now showing 5 results for "' +
        userInput.toUpperCase() +
        '."'
    );
    console.log("\n• • • • • • • • RESULTS • • • • • • • • ");
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

        //CONSOLE.LOG RESULTS OF API
        console.log("\n+++=======Artist Name===============+++\n");
        console.log("+++ " + bandName);
        console.log("\n+++=======Song Name=================+++\n");
        console.log("+++ " + nameSong);
        console.log("\n+++=======Album Name================+++\n");
        console.log("+++ " + albumName);
        console.log("\n+++=======Preview URL===============+++\n");
        console.log("+++ " + previewName);
        console.log("\n+++=================================+++\n");
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

function movieThis() {
  if (!userInput) {
    console.log(
      '\n•LIRI-Bot: "You did not enter a movie. I will display OMDB results for: Mr. Nobody".'
    );
    userInput = "Mr. Nobody";
    console.log("\n• • • • • • • • RESULTS • • • • • • • • ");
    search();
  } else {
    console.log(
      '\n•LIRI-Bot: "Thank-you for your input....." \n•LIRI-Bot: "I am now showing movie results for "' +
        userInput.toUpperCase() +
        '."'
    );
    console.log("\n• • • • • • • • RESULTS • • • • • • • • ");
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
        console.log("\n+============Movie Title===========+\n");
        console.log(JSON.stringify(response.data.Title, null, 2));

        console.log("\n+===========Year Released==========+\n");
        console.log(JSON.stringify(response.data.Year, null, 2));

        console.log("\n+============IMDB Rating===========+\n");
        console.log(JSON.stringify(response.data.Ratings[0].Value, null, 2));

        console.log("\n+==========Rotten Tomatoes=========+\n");
        console.log(JSON.stringify(response.data.Ratings[1].Value, null, 2));

        console.log("\n+=======Countries of Production=======+\n");
        console.log(JSON.stringify(response.data.Country, null, 2));

        console.log("\n+===========Movie Language==========+\n");
        console.log(JSON.stringify(response.data.Language, null, 2));

        console.log("\n+==============Movie Plot=============+\n");
        console.log(JSON.stringify(response.data.Plot, null, 2));

        console.log("\n+===============Actors==============+\n");
        console.log(JSON.stringify(response.data.Actors, null, 2));
        console.log("\n\n• • • • • • • • END RESULTS • • • • • • • •");
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
    // console.log(x)

    for (let i = 0; i < x.length; i++) {
      // console.log(x[i]);

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
          movieThis(userInput);
          break;
      }

      if (x[i] === "spotify-this-song") {
      }
      if (x[i] === "concert-this") {
        arrayX();
        concertThis(userInput);
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
