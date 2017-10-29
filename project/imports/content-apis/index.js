import { Meteor } from 'meteor/meteor'
import nounproject from './nounproject'
import unsplash from './unsplash'

export default (userMsg, query) => {
  // available API plugins
  const apis = ['unsplash', 'nounproject']
  const apiCtrl = { unsplash, nounproject }
  // select an api randomly
  const api = apis[ Math.floor(Math.random() * apis.length) ]
  console.log('Content API to use: ' + api)
  // use selected API to search for our query
  apiCtrl[api].connect()
  apiCtrl[api].search({
    tags: query,
    limit: 1
  }, Meteor.bindEnvironment(
      (err, res) => {
        console.log('Search results: ', res)
        const t = new Date()
        // push message to mongoDB
        const result = Meteor.call('history.insert', {
          userMsg,
          subject: query,
          type: 'image',
          api,
          items: res,
          timestamp: t.getTime()
        })
      }
    )
  )
}
