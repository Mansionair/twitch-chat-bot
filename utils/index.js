const fetch = require('node-fetch')
const fs = require('fs');
const config = require('config')
const channel = config.get('channel')

const getUptime = async () => {
	try {
		const response = await fetch(`http://beta.decapi.me/twitch/uptime/${ channel }`)
		const data = await response.text()
		return data
	} catch (e) {
		console.error(e)
	}
}

const getFollowAge = async (user) => {
	try {
		const response = await fetch(`http://beta.decapi.me/twitch/followage/${ channel }/${ user.username }`)
		const data = await response.text()
		if (channel === user.username) {
			return 'You are not a follower'
		} else {
			return data
		}
	} catch (e) {
		console.error(e)
	}
}

const getDate = () => {
	let date = new Date();
	let hours = ("0" + date.getHours()).slice(-2);
	let minutes = ("0" + date.getMinutes()).slice(-2);
	return hours + ':' + minutes;
}

const getFileNamesMessage = (path) => {
	return new Promise((resolve, reject) => {
		fs.readdir(path, 'utf8', (err, files) => {
			if (err) {
				return reject('ERROR : ' + err)
			}
			let message = files.map((e) => '!' + e.slice(0, -4) + ', ').join('').slice(0, -2) + '.'
			resolve(message)
		})
	})
}

const getFileNamesArray = (path) => {	
	let arr = fs.readdirSync(path, 'utf8')
	arr = arr.map(e => e.slice(0, -4))
	return arr
}

const getPasta = (pasta) => {
	return new Promise((resolve, reject) => {
		fs.readFile(`./commands/pastas/${ pasta }.txt`, 'utf8', (err, pasta_text) => {
			if (err) {
				return reject('ERROR : ' + err)
			}
			resolve(pasta_text)
		})
	})
}

module.exports.getUptime = getUptime
module.exports.getFollowAge = getFollowAge
module.exports.getDate = getDate
module.exports.getFileNamesMessage = getFileNamesMessage
module.exports.getFileNamesArray = getFileNamesArray
module.exports.getPasta = getPasta