import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { History } from '../imports/collections/history.js'
import './main.html'

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  Meteor.subscribe('history', () => {
    console.log('History subscription ready.')
  })
})

Template.hello.helpers({
  counter: function() {
    return Template.instance().counter.get();
  },
  messages: function() {
    return History.find({})
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
