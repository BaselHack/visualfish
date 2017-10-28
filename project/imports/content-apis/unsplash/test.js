var Unsplash = require('./index.js')

Unsplash.connect({
  appId: process.env.UNSPLASH_APP_ID
})
Unsplash.search({
  tags: 'car',
  limit: 2
},function(results){
  console.log("CALLBACK:" + JSON.stringify(results))
})
