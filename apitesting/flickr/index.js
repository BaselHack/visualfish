var Flickr = require("flickrapi"),
    flickrOptions = {
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

Flickr.tokenOnly(flickrOptions, function (error, flickr) {
    flickr.photos.search({
        text: "red+panda"
    }, getPhotoInfo);
});

console.log("Hello World!");
