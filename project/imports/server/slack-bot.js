import { Meteor } from 'meteor/meteor'

// Requiring our module
import slackAPI from 'slackbotapi'

export default (opts) => {
  console.log('Connecting with Slack.com using ' + opts.botToken + ' token.')

  // Starting
  var slack = new slackAPI({
      'token': opts.botToken,
      'logging': true,
      'autoReconnect': true
  })

  // Slack on EVENT message, send data.
  slack.on('message', function (data) {
      // If no text, return.
      if (typeof data.text === 'undefined') return

      // small easter egg
      if (data.text === '!!fish!!')
        slack.sendMsg(data.channel, '@' + slack.getUser(data.user).name + ' OOH, MY FISH!! :fish:')

      // If the first character starts with %, we go for a configuration command
      if (data.text.charAt(0) === '%') {
          // Split the command and it's arguments into an array
          var command = data.text.substring(1).split(' ')
          // If command[2] is not undefined, use command[1] to have all arguments in command[1]
          if (typeof command[2] !== 'undefined') {
              for (var i = 2; i < command.length; i++) {
                  command[1] = command[1] + ' ' + command[i]
              }
          }
          // Switch to check which command has been requested.
          switch (command[0].toLowerCase()) {
              // If hello
              case 'hello':
                  // Send message
                  slack.sendMsg(data.channel, 'Oh, hello @' + slack.getUser(data.user).name + ' !')
                  break
              case 'viewmode':
                const modes = ['split','single']
                const mode = data.text.split('%viewmode ')
                if(modes.indexOf(mode[1]) > -1) {
                  opts.viewModeHandler(null, mode[1])
                  slack.sendMsg(data.channel, 'changed viewmode to ' + mode[1])
                }
                break
          }
          // ok this message was a configure command
          // no need to push it to the NLP module
          return
      }

      // send the message to our text analysis
      opts.msgReceiver(null, data.text)
  })
}
