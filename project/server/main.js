import { Meteor } from 'meteor/meteor'
import SlackApi from '../imports/server/slack-bot.js'
import Publish from '../imports/server/publish.js'
import Methods from '../imports/server/methods.js'
import speak from 'speakeasy-nlp'
import nounproject from '../imports/content-apis/nounproject'
import unsplash from '../imports/content-apis/unsplash'

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
      unsplash.connect({
        appId: process.env.UNSPLASH_APP_ID,
        appSecret: process.env.UNSPLASH_SECRET
      })
      unsplash.search({
        tags: subject,
        limit: 1
      }, Meteor.bindEnvironment(
          (err, res) => {
            console.log('Noun results: ', res)
            const t = new Date()
            // push message to mongoDB
            const result = Meteor.call('history.insert', {
              userMsg: msg,
              subject,
              type: 'image',
              items: res,
              timestamp: t.getTime()
            })
          }
        )
      )
    })
  })
});

// general Error Handler
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err)
})
