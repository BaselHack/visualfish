var YouTubeSearch = require('./index.js')

YouTubeSearch.connect({
  apiKey: process.env.YOUTUBE_API_KEY
})
YouTubeSearch.search({
  tags: 'car',
  limit: 2
}, (err, res) => {
  console.log(res);
})
