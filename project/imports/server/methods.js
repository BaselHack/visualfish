import { History } from '../collections/history.js'
import { State } from '../collections/state.js'

Meteor.methods({
  'history.insert'(doc) {
    return History.insert(doc)
  },
  'state.insert'(doc) {
    return State.insert(doc)
  },
  'state.update'(identifier, doc) {
    return State.update({identifier}, doc)
  },
})
