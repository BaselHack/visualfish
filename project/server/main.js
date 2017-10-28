import { Meteor } from 'meteor/meteor'

import SlackApi from '../imports/server/slack-bot.js'

const botToken = process.env.SLACK_BOT_TOKEN || ''

Meteor.startup(() => {
  console.log('Starting Visual Fish server.')
  // connect our server with slack.com
  SlackApi({
    botToken,
    msgReceiver: (msg) => {
      console.log('Received: ', msg)
    }
  })
});
