import { Template } from 'meteor/templating'
import { History } from '../imports/collections/history.js'
import './main.html'

Template.messages.onCreated(function messagesOnCreated() {
  Meteor.subscribe('history', () => {
    console.log('History subscription ready.')
  })
})

Template.messages.helpers({
  messages: function() {
    return History.find({})
  }
})
