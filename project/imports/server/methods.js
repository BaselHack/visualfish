import { History } from '../collections/history.js'

Meteor.methods({
  'history.insert'(text) {
    // check(text, String)
    return History.insert({
      msg: text
    })
  }
})
