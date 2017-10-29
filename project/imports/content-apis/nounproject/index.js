var NounProject = require('the-noun-project')

module.exports = {
    connect: function() {
        this.nounApi = new NounProject({
            key: process.env.NOUNPROJECT_API_KEY,
            secret: process.env.NOUNPROJECT_API_SECRET
        });
    },
    search: function(opts, callback) {
        this.nounApi.getIconsByTerm(opts.tags, {limit: opts.limit, limit_to_public_domain: true}, function (err, data) {
            if (!err) {
              callback(err, getImgUrl(data.icons))
            }else{
              callback(err)
            }
        });
    }
}

function getImgUrl(data){
    var imgurls = []
    for(var i in data){
        imgurls.push({url: data[i].icon_url, title: data[i].attribution, tags: data[i].tags, artist: data[i].uploader})
    }
    //console.log(imgurls)
    return imgurls
}
