//各種モジュールの定義
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, clientId, guildId } = require('./config.json');
const fs = require('node:fs');

//配列を作成
const commands = [];
//スラッシュコマンドのフォルダを読み込む
const commandFiles = fs.readdirSync('./commands/slash').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	//スラッシュコマンドのファイルを読み込み
	const command = require(`./commands/slash/${file}`);
	//配列にぶち込む
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		//コマンドの登録を開始
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
