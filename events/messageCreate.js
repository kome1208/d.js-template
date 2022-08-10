const { prefix } = require('./config.json');
module.exports = {
	name: 'messageCreate',
	execute(message, client) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (!client.prefixcommands.has(command)) return;
        try {
            client.prefixcommands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
	},
};