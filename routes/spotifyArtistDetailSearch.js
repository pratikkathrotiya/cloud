var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: 'accd32a9a303403dafbc681b9d202434',
    clientSecret: '0e601561cd6e4035b7fa4d24c0990566',
    redirectUri: 'http://www.example.com/callback',
  });
  spotifyApi.setAccessToken('BQBJSkY4bTuupzvx23hduReZV1_rGBnbXcmJwWwKoL3WsOYqx16T0VaVnyKvMa1sFGtta1xUB7AUtVe2S0jzz9ullBgGJdlmnsyo8hzB4yWp6-oF_F5UpNNpEzymDm7c3pRuXUUhpE0654Gc5qAlYZtaUoVHARw8MZYBcAniLf-Q6YmiKyo');
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