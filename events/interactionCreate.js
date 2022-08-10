module.exports = {
	name: 'interactionCreate',
	execute(interaction, client) {
	if (!interaction.isChatInputCommand()) return;
	const command = client.slashcommands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	},
};