const { Client, GatewayIntentBits, EmbedBuilder} = require('discord.js');
const config = require('./config.json');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);


client.once('ready', () => console.log('🚀 A tope! 🚀'));
client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
});

client.on('messageCreate', async message => {
	const prefix = "!";
	let isCommand;
	// message.channel.send(message);
	if (message.author.bot) return;
	if (message.content.startsWith(prefix)) isCommand = true;
	if(isCommand) {
		const args = message.content.slice(prefix.length).trim().split(' ');
		switch (args.at(0).toLowerCase()){
			case 'yt':
			client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
				return message.channel.send(`${invite.code}`);
			});
			break;
			case 'fuck':
				let member = message.mentions.members.first();
				try{
				await member.kick();
				message.channel.send(`He chutao a ${member.user.username} porque me lo ha pedido ${message.author.tag}`);
				}catch (err){
					message.channel.send("No tienes permisos pringao xd");
				}
				break;
		}
	}
});

client.login(config.token);