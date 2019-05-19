# LIRI-Bot - Language Interpretation and Recognition Interface

## Overview
LIRI-Bot is a command line node application that takes in parameters and returns data to the user.

LIRI-Bot works pulls data from API's. In this case, LIRI searches Spotify for music, BandsInTown for concerts and events, and OMDB for movies.

API-keys are accessible for LIRI users but hidden utilizing `gitignore` and `.env`.

![WELCOME Image](/images/Liri_Bot_WELCOME_Demo.png)

### INSTALLATIONS
LIRI-Bot is built with the following extensions/API's:
* [Node.js](https://nodejs.org/en/)
* [Axios](https://www.npmjs.com/package/axios)
* [Moment](https://www.npmjs.com/package/moment)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [OMDB API](http://www.omdbapi.com)
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

### LIRI-Bot Command Demos
<hr>

#### spotify-this-song Command
1. `node liri.js spotify-this-song <song-name>`
  - This command searches the spotify API for a song name. The search can include the artist as well for more specific results. Liri bot        as of now is limited to displaying the first two results for spacial-reasons.
    ![WELCOME Image](/images/Liri_Bot_spotify-this-song_Demo.gif)
  
    