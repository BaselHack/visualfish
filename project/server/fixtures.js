import { State } from '../imports/collections/state.js'

if(!State.find().count() > 0) {
  console.log('Add fixtures to database.')
  State.insert({
    identifier: 'default',
    viewmode: 'split'
  })
}
