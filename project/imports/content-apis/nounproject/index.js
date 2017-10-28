var NounProject = require('the-noun-project')

module.exports = {
    connect: function(opts) {
        this.nounApi = new NounProject({
            key: opts.apiKey,
            secret: opts.apiSecret
        });
    },
    search: function(opts) {
        this.nounApi.getIconsByTerm(opts.tags, {limit: opts.limit}, function (err, data) {
            if (!err) {
                return getImgUrl(data.icons);
            }
        });
    }
}

function getImgUrl(data){
    var imgurls = [];
    for(var i in data){
        imgurls.push({url: data[i].icon_url, title: data[i].attribution, tags: data[i].term});
    }
    //console.log(imgurls);
    return imgurls;
}
