var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '77c3ba459a6d40c8954d091480bc5b45',
    clientSecret: '475cefdfeddc4c27aa60a385b404a0c7',
    redirectUri: 'http://www.example.com/callback',
  });
  spotifyApi.setAccessToken('BQB_9BJwza6rRf-LA_ffZCqKfwHJrC7K2BuUv9gUw01VAi3-6epTpoowh1FQfJg7Ee2nVor5BuImrMnENf9iRjNg3U6Whmmf23lmj6o4chp69_3c0dvfZ2UYtNM7zrQccxacs0swe6zoAq2Idwnepuahi_J6KSw4uSox0u9F3mbdgaHpuyk');
router.get("/", function(req, res) {    
    res.render('search')
});

  router.post("/searchArtistDetails", function(req, res) {
    spotifyApi.searchArtists(req.body.songName)
    .then(function(data) { 
     let artistdata = data.body.artists.items;
     console.log(data.body.artists.items[0].images[0].url)
     res.render('artistListing',{artistdata:artistdata,artistName:req.body.songName})
   }, function(err) {
     console.error(err);
   });
});


router.post("/songList", function(req, res) {
  console.log(req.body.artistId)
    spotifyApi.getArtistTopTracks(req.body.artistId,'AU')
     .then(function(data) {
    let songInfo =  data.body.tracks;
    console.log(data.body.tracks[1]);
    res.render('songListing',{songInfo:songInfo})
  }, function(err) {
    console.error(err);
  });
});




 


module.exports = router;