const tmi = require('tmi.js');
const { channel } = require('./auths/bot.js');
const { bot_username } = require('./auths/bot.js');
const { bot_password } = require('./auths/bot.js');

const options = {
	options: {
		debug: true,
	},
	connection: {
		cluster: 'aws',
		reconnect: true,
	},
	identity: {
		username: bot_username,
		password: bot_password,
	},
	channels: [
		channel
	],
}


const client = new tmi.client(options);


client.connect();

client.on('connected', (address, port) => {
	client.action(channel, 'is connected')
});

client.on('disconnected', (reason) => {
	client.action(channel, 'disconnected')
});

client.on('chat', (channel, user, message, self) => {
	if (self) return;

	if (message === '!game') {
		client.say(channel, 'Bloodborne');
	}

	if (message.includes('youtube.com')) {
		client.say(channel, 'a hui, net songrequesta poka :)');
	}

	if (message === 'кто ебан?') {
		client.say(channel, `${user[`display-name`]}, ты ебан`);
	}

	if (message === 'log') {
		console.log(user)		
	}

	if (message === '!banme') {
		client.ban(channel, user['display-name'], "dolbaeb))")
	}

});