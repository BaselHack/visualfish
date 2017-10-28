import { History } from '../collections/history.js'

Meteor.methods({
  'history.insert'(doc) {
    // check(text, String)
    return History.insert(doc)
  }
})
