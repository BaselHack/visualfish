import { Meteor } from 'meteor/meteor'
import SlackApi from '../imports/server/slack-bot.js'
import Publish from '../imports/server/publish.js'
import Methods from '../imports/server/methods.js'
import speak from 'speakeasy-nlp'
import nounproject from '../imports/content-apis/nounproject'

const botToken = process.env.SLACK_BOT_TOKEN || ''

Meteor.startup(() => {
  console.log('Starting Visual Fish server.')
  // connect our server with slack.com
  SlackApi({
    botToken,
    msgReceiver: Meteor.bindEnvironment((error, msg) => {
      console.log('Received: ', msg)
      // parse msg for nouns etc.
      const subject = speak.classify(msg).subject
      console.log('Subject: ', subject)
      nounproject.connect({
        apiKey: process.env.NOUNPROJECT_API_KEY,
        apiSecret: process.env.NOUNPROJECT_API_SECRET
      })
      nounproject.search({
        tags: subject,
        limit: 1
      }, Meteor.bindEnvironment(
          (err, res) => {
            console.log('Noun results: ', res)
            // push message to mongoDB
            const result = Meteor.call('history.insert', {
              userMsg: msg,
              subject,
              type: 'image',
              items: res
            })
          }
        )
      )
    })
  })
});
