const { SlashCommandBuilder } = require('discord.js'); //スラッシュコマンドビルダーを読み込み

module.exports = {
	//Name(名前)とDescription(説明)
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!'); //「Pong!」と返信
	},
};
