require('dotenv').config();
const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client(
	{
		intents: [
			GatewayIntentBits.Guilds
		],
		partials: [
			Partials.Channel,
			Partials.User,
			Partials.GuildMember,
		]
	}
);

client.slashCommands = new Collection();
const slashcmdFiles = fs.readdirSync('./interactions/commands').filter(file => file.endsWith('.js'));
for (const file of slashcmdFiles) {
	const command = require(`./interactions/commands/${file}`);
	client.slashCommands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(process.env['TOKEN']);