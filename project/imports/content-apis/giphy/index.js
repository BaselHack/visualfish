var giphy = require('giphy-api')

module.exports = {
    connect: function() {
        this.giphy = new giphy({
            apikey: process.env.GIPHY_API_KEY
        });
    },
    search: function(opts, callback) {
        this.giphy.search({ q: opts.tags, rating: opts.rating, limit: opts.limit}, function (err, res) {
            if (!err) {
                //console.log(res)
                callback(err, getGifUrl(res.data))
            }else {
                callback(err)
            }
        });
    }
}

function getGifUrl(data){
    var gifurls = []
    for(var i in data){
        gifurls.push({url: data[i].embed_url, title: data[i].title, tags: data[i].slug, artist: data[i].source_tld})
    }
    //console.log(gifurls)
    return gifurls
}
