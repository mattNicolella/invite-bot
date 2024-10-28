const prepKronk        = ['https://tenor.com/view/right-kronk-oh-gif-5898379', 'https://tenor.com/view/kronk-its-all-coming-together-gif-15058130', 'https://tenor.com/view/kronk-more-broccoli-more-broccoli-gif-12982230', 'https://thumbs.gfycat.com/InsistentThoroughDiplodocus-size_restricted.gif', 'https://i.pinimg.com/originals/e0/d7/34/e0d7345e9f51965e818a2859ea5a13c7.gif', 'https://66.media.tumblr.com/a14c523f4d8f0e5340851f3c096a7b83/tumblr_pgasb583Hh1twxecto1_400.gifv', 'https://i.gifer.com/BLYE.gif', 'https://i.gifer.com/TTDe.gif', 'https://i.gifer.com/L9L9.gif', 'https://i.gifer.com/OOu.gif','https://i.gifer.com/HjAj.gif'];
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kronk')
		.setDescription('Replies with kronk'),
	async execute(interaction) {
		await interaction.reply(prepKronk[Math.floor(Math.random() * prepKronk.length)]);
	},
};
