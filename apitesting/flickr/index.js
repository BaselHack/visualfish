var Flickr = require("flickrapi")

var flickrOptions = {
        api_key: process.env.FLICKR_API_KEY,
        secret: process.env.FLICKR_API_KEY
    }

function getPhotoInfo(err, flickerQueryResult) {
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

    return resultReturn
}

function search(opts){
    Flickr.tokenOnly(flickrOptions, function (error, flickr) {
        flickr.photos.search({
            text: opts.tags,
            per_page: opts.limit
        }, getPhotoInfo);
    });
}

search({
    tags: 'car',
    limit: 2
  })

console.log("Hello World!");
