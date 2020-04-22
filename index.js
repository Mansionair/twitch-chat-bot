const tmi = require('tmi.js');
const player = require('play-sound')(opts = {});
const fs = require('fs');
const config = require('config')
const utils = require('./utils/index')

const channel = config.get('channel')
const username = config.get('username')
const token = config.get('token')

const sounds_dir = './sound-commands/'
const pastas_dir = './commands/pastas/'

const options = {
	connection: {
		cluster: 'aws',
		reconnect: true,
	},
	identity: {
		username: username,
		password: token,
	},
	channels: [
		channel
	],
}

const client = new tmi.client(options);

client.connect()
client.on("connecting", () => console.log('Connecting...'));
client.on("connected", () => console.log('Connected.'))

const PREFIX = '!'

const soundsArray = utils.getFileNamesArray(sounds_dir)
const pastasArray = utils.getFileNamesArray(pastas_dir)

client.on('message', (channel, user, message, self) => {

	let args = message.substring(PREFIX.length).split(" ");
	let msg = args[0]

	if (self) return

	// sound commands
	if (soundsArray.includes(msg)) {
		player.play(`./sound-commands/${ msg }.mp3`, err => {
			if (err) throw err
		})
	}

	// pastas
	if (pastasArray.includes(msg)) {
		utils.getPasta(msg)
			.then(data => {
				client.say(channel, data);
			})
	}

	// info commands
	switch (msg) {

		case 'commands':
			// to improve..
			fs.readFile('./commands/info-commands.txt', 'utf8', function (err, info_commands) {
				if (err) return console.error('ERROR' + err)
				client.say(channel, `Available commands: ${ info_commands }`)
			})
			break;

		case 'banme':
			client.action(channel, `${ user['display-name'] } is permanently banned`)
			break;

		case 'sounds':
			utils.getFileNamesMessage(sounds_dir).then((data) => {
				client.say(channel, `Available sound commands: ${ data }`)
			})
			break;

		case 'time':
			client.say(channel, `Current time: ${ utils.getDate() } (GMT+6)`);
			break;

		case 'uptime':
			utils.getUptime()
				.then(data => {
					client.say(channel, data)
				})
			break;

		case 'followage':
			utils.getFollowAge(user)
				.then(data => {
					client.say(channel, data)
				})
			break;

		case 'pastas':
			utils.getFileNamesMessage(pastas_dir).then((data) => {
				client.say(channel, `Available pastas: ${ data }`)
			})
			break;
	}
})