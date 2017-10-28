import { History } from '../collections/history.js'

// This code only runs on the server
Meteor.publish('history', function historyPublication() {
  return History.find()
})
