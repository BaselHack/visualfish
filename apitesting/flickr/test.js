var FlickrProject = require('./index.js')
FlickrProject.connect({})
FlickrProject.search({
    tags: 'car',
    limit: 2
  }, function(err, flickerQueryResult) {
      var result = FlickrProject.getPhotoInfo(flickerQueryResult);
      console.log(result)
})


// NounProject.connect({
//   apiKey: process.env.NOUNPROJECT_API_KEY,
//   apiSecret: process.env.NOUNPROJECT_API_SECRET
// })
// NounProject.search({
//   tags: 'car',
//   limit: 2
// })
