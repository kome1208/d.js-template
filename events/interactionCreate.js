module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
	if (!interaction.isChatInputCommand()) return; //メッセージ入力欄から実行されたコマンドじゃなかったら処理を停止
	const command = client.slashcommands.get(interaction.commandName); //コマンドリストから実行されたコマンドを取得
	if (!command) return; //コマンドがリストになかったら処理を停止
	try { //呼び出しを試みる
		await command.execute(interaction); //コマンドファイルを呼び出し
	} catch (error) { //エラーが発生したらキャッチして「error」にエラー内容を格納
		console.error(error);　//コンソールにエラー内容を出力
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); //「エラーが発生した」と実行者にのみ返信
	}
	},
};
