module.exports = {
	name: 'ping',　//コマンド名
	description: 'Ping!', //コマンドの説明
	execute(message) {
		message.channel.send('Pong.'); //コマンドが送られたチャンネルに「Pong.」を送信
	},
};
