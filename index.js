const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.slashcommands = new Collection();
const slashcmdPath = path.join(__dirname, 'commands/slash');
const slashcmdFiles = fs.readdirSync('./commands/slash').filter(file => file.endsWith('.js'));
for (const file of slashcmdFiles) {
	const filePath = path.join(slashcmdPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.prefixcommands = new Collection();
const msgcmdFiles = fs.readdirSync('./commands/prefix').filter(file => file.endsWith('.js'));
for (const file of msgcmdFiles) {
	const command = require(`./commands/prefix/${file}`);
	client.commands.set(command.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(token);
