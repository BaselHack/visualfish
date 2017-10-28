import { Template } from 'meteor/templating'
import { History } from '../imports/collections/history.js'
import { State } from '../imports/collections/state.js'
import './main.html'

Template.messages.onCreated(function messagesOnCreated() {
  Meteor.subscribe('history', () => {
    console.log('History subscription ready.')
  })
  Meteor.subscribe('state', () => {
    console.log('State subscription ready.')
  })
})

Template.messages.helpers({
  messages: function() {
    return History.find({}, { sort: { timestamp: -1 } })
  }
})

Template.registerHelper('lastImgUrl', function(messages){
  const lastMsg = History.findOne({}, { sort: { timestamp: -1 } })
  if(lastMsg && lastMsg.items.length > 0) {
    return lastMsg.items[0].url
  }
})

Template.registerHelper('viewmode', function(){
  const state = State.findOne({identifier: 'default'})
  if(state) return state.viewmode
})
