# LIRI-Bot - Language Interpretation and Recognition Interface

## Overview
LIRI-Bot is a command line node application that takes in parameters and returns data to the user.

LIRI-Bot works pulls data from API's. In this case, LIRI searches Spotify for music, BandsInTown for concerts and events, and OMDB for movies.

API-keys are accessible for LIRI users but hidden utilizing `gitignore` and `.env`.
<aside> When loaded, LIRI-Bot will give this screen. If a proper command is not given, this screen will also load. </aside>

<br>

![WELCOME Image](/images/Liri_Bot_WELCOME_Demo.png)

***

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

//141x35

#### spotify-this-song Command
1. `node liri.js spotify-this-song <song-name>`
    - This command searches the spotify API for a song name. The search can include the artist as well for more specific results. LIRI-Bot as of now is limited to displaying the first two results for spacial-reasons.
        <br>
        <img src="/images/Liri_Bot_spotify-this-song-1_Demo.gif"/>


    - If LIRI-Bot is not given a proper search term, or no search term at all it will default to searching for <em>The Sign by Ace of Base</em>:
        <br>

        <img src="/images/Liri_Bot_spotify-this-song_ERR_Demo.gif"/>

<hr>

2. `node liri.js concert-this <Band Name/Artist>`
    - This command searches the Bands In Town API via `axios` and produces results for concert events based on the artist or band-name searched.
        <br>

        <img src="/images/Liri_Bot_concert-this_Demo.gif"/>

    - If LIRI-Bot is not given a proper search term, or no search term at all it will default to searching for <em>Cher</em> concerts:

        <img src="/images/Liri_Bot_concert-this_Demo_1.gif"/>

<hr>

3. `node liri.js movie-this <Movie Name>`
    - This command searches the OMDB API via `axios` and generates results about the movie title that was searched. 
    <br>  
        <img src="/images/Liri_Bot_movie-this_Demo.gif"/>

    - If LIRI-Bot is not given a proper search term, or no search term at all it will default to searching for the movie, <em>Mr. Nobody</em>:



  
    
