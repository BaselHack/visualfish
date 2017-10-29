var Flickr = require("flickrapi")

// search({
//     tags: 'car',
//     limit: 2
//   })

module.exports = {
    connect: function(opts) {
        this.flickrOptions = {
        api_key: process.env.FLICKR_API_KEY,
        secret: process.env.FLICKR_API_SECRET
    }},
    search: function(opts, callback){
        module.exports.callback= callback;

        Flickr.tokenOnly(this.flickrOptions, function (error, flickr) {
            flickr.photos.search({
                text: opts.tags,
                per_page: opts.limit
            }, module.exports.getPhotoInfo);
        });
    },
    getPhotoInfo: function (err, flickerQueryResult) {
        if (err) { throw new Error(err); }
        var resultReturn = []
        flickerQueryResult.photos.photo.forEach(function (elem) {
            var photoUrl = 'http://farm' + elem.farm + '.staticflickr.com/' + elem.server + '/' + elem.id + '_' + elem.secret + '.jpg'
            photoInfo = {}
            photoInfo.url = photoUrl
            photoInfo.title = elem.title
            photoInfo.tags = ''
            resultReturn.push(photoInfo)
        }, this);
        module.exports.callback(err, resultReturn)
    }
};


//console.log("Hello World!");
