// INSTRUCTIONS:
// ---------------------------------------------------------------------------------------------------------
// Level 1:
// Take any movie with a word title (ex: Cinderella) as a Node argument and retrieve the year it was created
var movieInputArray = process.argv;
var finalArr = [];
// console.log(movieInputArray);
// Level 2 (More Challenging):
// Take a move with multiple words (ex: Forrest Gump) as a Node argument and retrieve the year it was created.
for (let i = 2; i <movieInputArray.length; i ++){
    finalArr.push(movieInputArray[i]);
  

}
// ---------------------------------------------------------------------------------------------------------

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
// ...
let axios = require('axios');


// Grab or assemble the movie name and store it in a variable called "movieName"
var movieName = finalArr.join(' ');
console.log(movieName);
// ...


// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


// This line is just to help us debug against the actual URL.
console.log(queryUrl);


// Then create a request with axios to the queryUrl
// ...
axios.get("http://www.omdbapi.com/?t=" +  movieName + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log(response.data);
    console.log("The movie's release date is: " + response.data.Released);
  }
);


// If the request with axios is successful
// ...

// Then log the Release Year for the movie
// ...
