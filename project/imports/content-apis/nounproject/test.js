var NounProject = require('./index.js')
NounProject.connect()
NounProject.search({
  tags: 'cat',
  limit: 5
},function(results) {
  console.log("CALLBACK:" + JSON.stringify(results))
})
