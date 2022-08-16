//prefixを読み込む
const { prefix } = require('../config.json');

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
        if (!message.content.startsWith(prefix) || message.author.bot) return; //メッセージ内容がprefixから始まらない、もしくはユーザーがbotだったら処理を停止
        const args = message.content.slice(prefix.length).trim().split(/ +/); //prefix以外の内容だけを取り出す
        const command = args.shift().toLowerCase(); //コマンド名だけを取り出す
        if (!client.prefixcommands.has(command)) return; //prefixコマンドリストに取り出したコマンド名が存在しなかったら処理を停止
        try { //実行を試みる
            client.prefixcommands.get(command).execute(message, args); //prefixコマンドのファイルを呼び出す
        } catch (error) { //エラーが出たらキャッチして「error」に格納
            console.error(error); //コンソールにエラー内容を出力
            message.reply('there was an error trying to execute that command!'); //「エラーが発生した」と返信
        }
	},
};
