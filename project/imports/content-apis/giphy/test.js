var giphy = require('./index.js')
giphy.connect()
giphy.search({
  tags: 'cat',
  limit: 2,
  rating: 'pg'
},function(err, results) {
  console.log("CALLBACK:" + JSON.stringify(results))
})
