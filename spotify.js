require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var userInput =process.argv;
var newSpotifyArr = [];
var newMovieArr = [];
var songInput;
var initializeVar = userInput[2];



switch (initializeVar) {
    case 'spotify-this-song':
        spotifyThis();
    break;

    case 'concert-this':
        console.log('concert-this function');
    break;

    case 'movie-this':
        movieThis();
    break;

    case '':
        console.log('do-what-it-says');
    break;
    
    default: console.log('You did not enter a proper command, please try again.');
        break;
}




function spotifyThis(){
    for (let i =2; i < userInput.length; i++){
        newSpotifyArr.push(userInput[i]);
    };

    songInput = newSpotifyArr[1];

    // if (newSpotifyArr){
    // console.log(newSpotifyArr.splice(','));
    // }
        


    if (songInput == undefined){
        console.log("You did not enter a song. Here's The Sign by Ace of Base");
        songInput = "The sign ace of base";
        spotify.search({ type: 'track', query: songInput, limit: 2}, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            let albumName = data.tracks.items[0].album.name;
            let nameSong = data.tracks.items[0].name;
            let bandName=data.tracks.items[0].album.artists[0].name;
            let previewName = data.tracks.items[0].preview_url;
            console.log('==============================');
            console.log('Artist Name: ' + bandName); 
            console.log('==============================');
            console.log('Song Name: ' + nameSong);
            console.log('==============================');
            console.log('Album Name: ' + albumName);
            console.log('==============================');
            console.log('Preview URL: ' + previewName);
            console.log('==============================');
        });

    } else {
        spotify.search({ type: 'track', query: songInput, limit: 2}, function(err, data) {
        
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            let albumName = data.tracks.items[0].album.name;
            let nameSong = data.tracks.items[0].name;
            let bandName=data.tracks.items[0].album.artists[0].name;
            let previewName = data.tracks.items[0].preview_url;
      
            console.log('==============================');
            console.log('Artist Name: ' + bandName); 
            console.log('==============================');
            console.log('Song Name: ' + nameSong);
            console.log('==============================');
            console.log('Album Name: ' + albumName);
            console.log('==============================');
            console.log('Preview URL: ' + previewName);
            console.log('==============================');

        });

    }

    // fs.readFile("random.txt", "utf8", function(error, data) {
    //     if (error) {
    //     return console.log(error);
    //     }
    //     spotify.search({ type: 'track', query: songInput, limit: 2}, function(err, data) {
        
    //         if (err) {
    //         return console.log('Error occurred: ' + err);
    //         }
    //         let albumName = data.tracks.items[0].album.name;
    //         let nameSong = data.tracks.items[0].name;
    //         let bandName=data.tracks.items[0].album.artists[0].name;
    //         let previewName = data.tracks.items[0].preview_url;
      
    //         console.log('==============================');
    //         console.log('Artist Name: ' + bandName); 
    //         console.log('==============================');
    //         console.log('Song Name: ' + nameSong);
    //         console.log('==============================');
    //         console.log('Album Name: ' + albumName);
    //         console.log('==============================');
    //         console.log('Preview URL: ' + previewName);
    //         console.log('==============================');

    //     });

    // });
    

}

