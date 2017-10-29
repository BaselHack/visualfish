var YouTubeSearch = require('youtube-search')

module.exports = {
  connect: function(opts) {
    this.apiKey = opts.apiKey
  },

  search: function(opts, cb) {
    this.limit = opts.limit
    YouTubeSearch(opts.tags, {
        key: this.apiKey,
        maxResults: this.limit
      }, (err, results) => {
      if(err) return cb(err)
      cb(err, this.getVideoUrls(results))
    })
  },

  getVideoUrls: function(results){
      var videourls = []
      for (var i = 0; i < results.length; i++) {
        videourls.push({
          url: results[i].link, title: results[i].title
        })
      }
      return videourls
  }

}
