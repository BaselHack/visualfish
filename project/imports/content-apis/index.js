import { Meteor } from 'meteor/meteor'
import nounproject from './nounproject'
import unsplash from './unsplash'
import giphy from './giphy'
import flickr from './flickr'

export default (userMsg, query, username) => {
  // available API plugins
  const apis = ['giphy','nounproject','unsplash'] // 'giphy','nounproject','unsplash', 'flickr'
  const apiCtrl = { unsplash, nounproject, giphy, flickr }
  const usedApi = []
  // randomly select a API of the available ones
  const selectApi = () => {
    const api = apis[ Math.floor(Math.random() * apis.length) ]
    if(!api) return selectApi()
    // check if we used this API already
    if(usedApi.indexOf(api) === -1) { // API is not used yet
      usedApi.push(api)
      return api
    } else if(usedApi.length == apis.length) { // we checked all APIs already
      return 'fishlogo'
    } else { // it's used already
      return selectApi()
    }
  }
  // search method
  const search = (qry) => {
    // select an api randomly
    const api = selectApi()
    console.log('Selected API: ', api)
    // check if we have a valid API
    if(api === 'fishlogo') {
      console.log('No API available so we show our Fish Logo.')
      const t = new Date()
      const result = Meteor.call('history.insert', {
        userMsg,
        subject: qry,
        type: 'image',
        api,
        items: [{url: 'visualfish.png'}],
        timestamp: t.getTime(),
        username
      })
      return
    }
    console.log('Content API to use: ' + api)
    // use selected API to search for our query
    apiCtrl[api].connect()
    apiCtrl[api].search({
      tags: qry,
      limit: 1
    }, Meteor.bindEnvironment(
        (err, res) => {
          if(err) {
            console.log('Content API ', err)
            console.log('Use another content API')
            search(qry)
          }
          // check if we have a result returned by the API
          if(res){
            console.log('Search results: ', res)
            const t = new Date()
            // push message to mongoDB
            const result = Meteor.call('history.insert', {
              userMsg,
              subject: qry,
              type: 'image',
              api,
              items: res,
              timestamp: t.getTime(),
              username
            })
          } else {
            console.log(api + ' returned no results use another one.')
            search(qry)
          }
        }
      )
    )
  }
  search(query)
}
