var bandsintown = require('bandsintown')('125478');

bandsintown
  .getArtistEventList('Skrillex')
  .then(function(events) {
      console.log(events);
    // return array of events
  });


  // https://rest.bandsintown.com/artists/Cher/events?app_id=13722599
