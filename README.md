# Twitch Chat Bot

## Links
- [docs](https://dev.twitch.tv/docs/irc)
- [youtube-guide](https://www.youtube.com/watch?v=AnO2YKBAFc4)
- [TMI.js Docs](https://github.com/tmijs/docs/tree/gh-pages/_posts)
- [Get your OAuth Password](http://twitchapps.com/tmi/)

# Installation
1. cd twitch-chat-bot
2. npm install

# Usage
1. cd twitch-chat-bot
2. create an "auths" folder in project root directory
3. create a "bot.js" file with the following parameters:  
	*module.exports.channel = "<CHANNEL_NAME>";*  
	*module.exports.bot_username = "<BOT_USERNAME>";*  
	*module.exports.bot_password = "<BOT_OAUTH_TOKEN>";*  
4. node index.js (from project directory)