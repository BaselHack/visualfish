var unsplashApi = require('unsplash-api');

module.exports = {
    connect: function(opts) {
      console.log("key:" + process.env.UNSPLASH_APP_ID);
      unsplashApi.init(opts.appId);
    },

    search: function(opts, callback) {

      unsplashApi.searchPhotos(opts.tags, null, 1, opts.limit, function(error, photos, link) {
        var response = photos.map

        var result = photos.map(function(photo) {
           var r = {};
           r.url = photo.urls.regular;
           r.tags = photo.categories;
           r.title = "";
           return r;
        });

        //console.log(result);
        //return result;
        callback(result);
      });

    }
}
