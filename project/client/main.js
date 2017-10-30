import { ReactiveVar } from 'meteor/reactive-var'
import { Template } from 'meteor/templating'
import { History } from '../imports/collections/history.js'
import { State } from '../imports/collections/state.js'
import './main.html'

let selectedMsg = new ReactiveVar(undefined)

Template.messages.onCreated(function messagesOnCreated() {
  const self = this

    self.subscribe('history', () => {
      console.log('History subscription ready.')
      self.autorun(function(){
        console.log('autorun called')
        const lastMsg = History.findOne({}, { sort: { timestamp: -1 } })
        let state = State.findOne({identifier: 'default'})
        if(lastMsg && lastMsg.items.length > 0) {
          state.currentMsg = lastMsg
          State.update({_id: state._id}, state)
        }
        selectedMsg.set(undefined)
        $('.message-column').animate({
            scrollTop: $('.message-column').get(0).scrollHeight
          }, 2000)
      })
    })
    self.subscribe('state', () => {
      console.log('State subscription ready.')
    })
})

Template.messages.helpers({
  messages: function() {
    return History.find({}, { sort: { timestamp: 1 } })
  }
})

Template.msg.events({
  'click': function(evt, tpl){
    // let state = State.findOne({identifier: 'default'})
    // state.currentMsg = tpl.data
    // State.update({_id: state._id}, state)
    selectedMsg.set(tpl.data)
  }
})

Template.registerHelper('lastImgUrl', function(messages){
  if(selectedMsg.get()) return selectedMsg.get().items[0].url
  let state = State.findOne({identifier: 'default'})
  if(state && state.currentMsg) return state.currentMsg.items[0].url
})

Template.registerHelper('lastItemApi', function(messages){
  if(selectedMsg.get()) return selectedMsg.get().api
  let state = State.findOne({identifier: 'default'})
  if(state && state.currentMsg) return state.currentMsg.api
})

Template.registerHelper('viewmode', function(){
  const state = State.findOne({identifier: 'default'})
  if(state) return state.viewmode
})
