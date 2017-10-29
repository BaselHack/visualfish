var YouTubeSearch = require('./index.js')

YouTubeSearch.connect()
YouTubeSearch.search({
  tags: 'car',
  limit: 2
}, (err, res) => {
  console.log(res);
})
