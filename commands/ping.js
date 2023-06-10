const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! - HSR Bot'),
	async execute(interaction) {
		await interaction.reply(
        `Pong!
        🏓Latency is ${Date.now() - interaction.createdTimestamp}ms.`
        );
	}
};
