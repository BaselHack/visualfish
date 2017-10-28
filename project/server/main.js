import { Meteor } from 'meteor/meteor'
import SlackApi from '../imports/server/slack-bot.js'
import Publish from '../imports/server/publish.js'
import Methods from '../imports/server/methods.js'

const botToken = process.env.SLACK_BOT_TOKEN || ''

Meteor.startup(() => {
  console.log('Starting Visual Fish server.')
  // connect our server with slack.com
  SlackApi({
    botToken,
    msgReceiver: Meteor.bindEnvironment((error, msg) => {
      console.log('Received: ', msg)
      // push message to mongoDB
      const result = Meteor.call('history.insert', msg)
    })
  })
});
