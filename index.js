// requirements
const tmi = require('tmi.js');
const player = require('play-sound')(opts = {});
const fs = require('fs');
const shell = require('shelljs');
const fetch = require('node-fetch')
const { channel } = require('./auths/bot.js'); // module.exports.channel = "<channel>"
const { bot_username } = require('./auths/bot.js'); // module.exports.bot_username = "<username>"
const { bot_password } = require('./auths/bot.js'); // module.exports.bot_password = "<password>"


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


// Updates sound commands list
shell.exec('./commands/list-all-sounds.sh');


PREFIX = '!'


client.on('chat', (channel, user, message, self) => {

	let args = message.substring(PREFIX.length).split(" ");
	let myChannel = channel.substr(1); // because for some reason 'channel' has a '#' in the beginning of a string

	if (self) return;

	switch (args[0]) {

		////////////////// Info commands //////////////////

		case 'commands':
			fs.readFile('./commands/info-commands.txt', 'utf8', function (err, info_commands) {
				client.say(channel, `Available commands: ${info_commands}`)
			});
			break;

		case 'banme':
			client.action(channel, user['display-name'] + " is permanently banned")
			break;

		case 'info':
			client.say(channel, "а тут нихуя :)")
			break;

		case 'sounds':
			fs.readFile('./commands/sound-commands.txt', 'utf8', function (err, sound_commands_list) {
				client.say(channel, `Available sound commands: ${sound_commands_list}`)
			});
			break;

		case 'time':
			let date = new Date();
			let hours = ("0" + date.getHours()).slice(-2);
			let minutes = ("0" + date.getMinutes()).slice(-2);
			let time = hours + ':' + minutes;
			client.say(channel, `Current time: ${time} (GMT+6)`);
			break;

		case 'uptime':
			const url = `my name is ${user['display-name']}` 
			const uptimePromise = fetch(`http://beta.decapi.me/twitch/uptime/${myChannel}`).then(data => data.text());
			uptimePromise.then(out => {
				client.say(channel, out);
			})
			break;

		case 'followage':
			const followagePromise = fetch(`http://beta.decapi.me/twitch/followage/${myChannel}/${user['display-name']}`).then(data => data.text());
			followagePromise.then(out => {
				if (out === 'Follow not found') {
					let followage = 'You are not a follower'
					client.say(channel, followage);
				} else {
					let followage = `You have been following for ${out}`
					client.say(channel, followage);
				}
			})
			break;


		////////////////// Sound commands //////////////////

		case 'казино':
			player.play('./sound-commands/казино.mp3');
			break;

		case 'заново':
			player.play('./sound-commands/заново.mp3');
			break;

		case 'тыкто':
			player.play('./sound-commands/тыкто.mp3');
			break;

		case 'скучно':
			player.play('./sound-commands/скучно.mp3');
			break;

		case 'cmon':
			player.play('./sound-commands/cmon.mp3');
			break;

		case 'slaves':
			player.play('./sound-commands/slaves.mp3');
			break;

		case 'outfit':
			player.play('./sound-commands/outfit.mp3');
			break;

		case 'shoulder':
			player.play('./sound-commands/shoulder.mp3');
			break;

		case 'imsorry':
			player.play('./sound-commands/imsorry.mp3');
			break;

		case 'spank':
			player.play('./sound-commands/spank.mp3');
			break;

		case 'takeitboy':
			player.play('./sound-commands/takeitboy.mp3');
			break;

		case 'thankyousir':
			player.play('./sound-commands/thankyousir.mp3');
			break;

		case 'amazing':
			player.play('./sound-commands/amazing.mp3');
			break;

		case 'aahh':
			player.play('./sound-commands/aahh.mp3');
			break;


		////////////////// Copypastas //////////////////

		case 'van':
			fs.readFile('./commands/pastas/van.txt', 'utf8', function (err, van) {
				client.say(channel, van);
			});
			break;

		case 'van2':
			fs.readFile('./commands/pastas/van2.txt', 'utf8', function (err, van2) {
				client.say(channel, van2);
			});
			break;
	}
})