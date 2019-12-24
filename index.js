const tmi = require('tmi.js');
const player = require('play-sound')(opts = {});
const fs = require('fs');
const shell = require('shelljs');
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

// for testing
client.on('connected', (address, port) => {
	client.action(channel, 'is connected')
});

client.on('disconnected', (reason) => {
	client.action(channel, 'is disconnected')
});

// Update sound commands list (turn off when testing)
shell.exec('./commands/list-all-sounds.sh');

client.on('chat', (channel, user, message, self) => {
	
	if (self) return;

	if (message === '!game') {
		client.say(channel, 'Bloodborne');
	}

	if (message.includes('youtube.com')) {
		client.say(channel, 'a hui, net songrequesta poka :)');
	}

	if (message === '!commands') {
		fs.readFile('./commands/info-commands.txt', 'utf8', function(err, info_commands) {
			client.say(channel, `Доступные команды: ${info_commands}`);
		});
	}

// to investigate
	if (message === '!banme') {
		client.ban(channel, `user['display-name'], ty dolbaeb?)`)
	}
// to investigate
	if (message === '!info') {
		client.ban(channel, "а тут нихуя :)")
	}

// for testing
	if (message === 'log') {
		console.log(user)		
	}

	if (message === '!test') {
		client.say(channel, 'working');
	}

	if (message === '!sounds') {
		fs.readFile('./commands/sound-commands.txt', 'utf8', function(err, sound_commands_list) {
    		client.say(channel, `Доступные звуковые команды: ${sound_commands_list}`);
		});
	}
});

////////////////// Sound commands //////////////////
client.on('chat', (channel, user, message, self) => {
	
	if (self) return;

	if (message === '!joji') {
		player.play('./sound-commands/joji.mp3', function(err){
		  if (err) throw err
		});	
	};

	if (message === '!казино') {
		player.play('./sound-commands/казино.mp3', function(err){
		  if (err) throw err
		});	
	};

	if (message === '!тыкто') {
		player.play('./sound-commands/тыкто.mp3', function(err){
		  if (err) throw err
		});	
	};
	
	if (message === '!cmonletsgo') {
		player.play('./sound-commands/cmonletsgo.mp3', function(err){
		  if (err) throw err
		});	
	};
	
	if (message === '!slaves') {
		player.play('./sound-commands/slaves.mp3', function(err){
		  if (err) throw err
		});	
	};
	
	if (message === '!outfit') {
		player.play('./sound-commands/outfit.mp3', function(err){
		  if (err) throw err
		});	
	};
	
	
	if (message === '!shoulder') {
		player.play('./sound-commands/shoulder.mp3', function(err){
		  if (err) throw err
		});	
	};

	if (message === '!imsorry') {
		player.play('./sound-commands/imsorry.mp3', function(err){
		  if (err) throw err
		});	
	};
	
	if (message === '!spank') {
		player.play('./sound-commands/spank.mp3', function(err){
		  if (err) throw err
		});	
	};
	
	if (message === '!takeitboy') {
		player.play('./sound-commands/takeitboy.mp3', function(err){
		  if (err) throw err	
		});	
	};	

	if (message === '!thankyousir') {
		player.play('./sound-commands/thankyousir.mp3', function(err){
		  if (err) throw err
		});	
	};	

	if (message === '!amazing') {
		player.play('./sound-commands/amazing.mp3', function(err){
		  if (err) throw err
		});	
	};

	if (message === '!aaaaaahh') {
		player.play('./sound-commands/aaaaaahh.mp3', function(err){
		  if (err) throw err
		});	
	};		
});