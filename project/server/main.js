import { Meteor } from 'meteor/meteor'
import SlackApi from '../imports/server/slack-bot.js'
import Publish from '../imports/server/publish.js'
import Methods from '../imports/server/methods.js'
import WordAnalyer from '../imports/analyzer'
import ContentSelect from '../imports/content-apis'

import './fixtures.js'

const botToken = process.env.SLACK_BOT_TOKEN || ''

Meteor.startup(() => {
  console.log('Starting Visual Fish server.')
  // connect our server with slack.com
  SlackApi({
    botToken,
    viewModeHandler: Meteor.bindEnvironment((error, mode) => {
      Meteor.call('state.update', 'default', {
        identifier: 'default',
        viewmode: mode
      })
    }),
    msgReceiver: Meteor.bindEnvironment((error, ret) => {
      // parse msg for nouns etc.
      const query = WordAnalyer(ret.msg)
      // query the APIs and push to DB
      ContentSelect(ret.msg, query, ret.username)
    })
  })
})

// general Error Handler
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err)
})
