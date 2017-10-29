var Unsplash = require('./index.js')

Unsplash.connect()
Unsplash.search({
  tags: 'car',
  limit: 2
},function(results){
  console.log("CALLBACK:" + JSON.stringify(results))
})
