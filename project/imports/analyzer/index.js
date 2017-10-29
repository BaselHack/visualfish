import speak from 'speakeasy-nlp'

export default (msg) => {
  const cResult = speak.classify(msg)
  console.log('Analyzer Result', cResult)
  // parse msg for nouns etc.
  if(cResult && cResult.subject){
    const subject = cResult.subject
    console.log('Analyzer Subject: ', subject)
    return subject
  }
}
