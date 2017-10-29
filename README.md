# 05_visualfish
## VisualFish: A chatbot for visualizing chats
The VisualFish chatbot was developed during the BaselHack 2017.
It monitors a slack-channel and finds images from various image sources to displays graphical presentations of the messages inside the channel.

Our goal for this app was to create a visual experience of the chat-threads to spark creativity. Furthermore the human brain remembers images better than text, so this tool should help to better remember chat content.

For image source we are using the APIs from Unsplash, Nounproject, Flickr, Youtube, and Giphy, so that messages in the channel will get visual representations in form of a picture, animated gif or video.

## Setup
In order to use the calls to the APIs you will need to generated API keys for the services that are used by the chatbot. These need to be exported as environment variables with the following names:

```
SLACK_BOT_TOKEN

UNSPLASH_APP_ID
UNSPLASH_APP_SECRET

FLICKR_API_KEY
FLICKR_API_SECRET

NOUNPROJECT_API_KEY
NOUNPROJECT_API_SECRET

YOUTUBE_API_KEY

GIPHY_API_KEY
```

The application is using Meteor framework so you need to install it first and then run it:

https://www.meteor.com/install

```
cd project
npm install
meteor
```
