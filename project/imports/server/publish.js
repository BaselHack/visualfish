import { History } from '../collections/history.js'
import { State } from '../collections/state.js'

// This code only runs on the server
Meteor.publish('history', () => {
  return History.find()
})

Meteor.publish('state', () => {
  return State.find()
})
