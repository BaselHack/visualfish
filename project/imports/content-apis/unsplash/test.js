var Unsplash = require('./index.js')

Unsplash.connect({
  appId: process.env.UNSPLASH_APP_ID
})
Unsplash.search({
  tags: 'car',
  limit: 2
})
