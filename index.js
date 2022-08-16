//各種モジュールの定義
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

//client等の定義
const client = new Client(
	{ intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent
		],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.User,
		Partials.GuildMember,
		Partials.Reaction]
	}
	);

//スラッシュコマンドのリストを作成
client.slashcommands = new Collection();
//スラッシュコマンドのフォルダを指定
const slashcmdPath = path.join(__dirname, 'commands/slash');
//スラッシュコマンドのフォルダを読み込み
const slashcmdFiles = fs.readdirSync('./commands/slash').filter(file => file.endsWith('.js'));
for (const file of slashcmdFiles) {
	const filePath = path.join(slashcmdPath, file);
	//スラッシュコマンドのファイルを読み込み
	const command = require(filePath);
	//リストにコマンドをぶち込む
	client.slashcommands.set(command.data.name, command);
}

//prefixコマンドのリストを作成
client.prefixcommands = new Collection()
//prefixコマンドのフォルダを指定
const msgcmdFiles = fs.readdirSync('./commands/prefix').filter(file => file.endsWith('.js'));
for (const file of msgcmdFiles) {
	//prefixコマンドのファイルを読み込み
	const command = require(`./commands/prefix/${file}`);
	//リストにコマンドをぶち込む
	client.prefixcommands.set(command.name, command);
}

//eventのフォルダを指定
const eventsPath = path.join(__dirname, 'events');
//eventのフォルダを読み込み
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	//eventファイルの定義
	const filePath = path.join(eventsPath, file);
	//eventファイルの読み込み
	const event = require(filePath);
	//eventを呼び出す
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

//botにログイン
client.login(token);
