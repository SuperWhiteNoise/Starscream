//Dependencies
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const starScream = new Discord.Client();
starScream.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    starScream.commands.set(command.name, command);
}

starScream.on('ready', () => {
    console.log('Starscream operational at : ' + new Date().toISOString());
});

starScream.on('message', (message) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!starScream.commands.has(command)) return;

    try {
        starScream.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('I am unable to execute that command')
    }
});

starScream.login(config.discordToken);