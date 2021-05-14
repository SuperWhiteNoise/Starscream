const fs = require('fs');
const Discord = require('discord.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
	name: 'help',
	description: 'help',
	execute(message) {
		console.log(`${new Date().toISOString()} ${message.author.username} wanted help`);
				const aMessage = new Discord.MessageEmbed()
					.setTitle(`help`)
					.setColor('#43eb34')
					.setDescription(`Greetings ${message.author.username}, I currently support the following commands:\n\n${commandFiles}`)
				message.channel.send(aMessage);			}
		}
	