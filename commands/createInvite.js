const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createinvite')
		.setDescription('Creates A Single Use 24 Hour Invite To Track'),
	async execute(interaction) {
		//await interaction.reply(prepKronk[Math.floor(Math.random() * prepKronk.length)]);
		//await interaction.reply(`Son Of A Diddly`);
		//console.log(interaction);
		const channel = interaction.channelId;

		/*

		query(`SELECT * FROM serverinfo WHERE guild=${interaction.guildId} AND (type=2 OR type=4)`, function(results)  {
			console.log(results);

			if(results != []) {
				let inviteChannel = 0;
				let inviteRole = 0;
				for(const row of results) {
					if(row.type == 2)
						inviteChannel = row.value;
					else if(row.type == 4)
						inviteRole = row.value;
				}

				console.log('invite stuff set');
			} else {
				console.log('no invite server info')
			}
		});

		*/

        if(channel == '998041276240896020' || channel == '998041276240896020') {
			if(interaction.member.roles.cache.some(role => role.name.toUpperCase() === 'PARTICIPATOR')) {
				query("SELECT count(*) as reqs FROM invites WHERE stampt > current_date - interval 7 day AND creator='"+interaction.user.id+"'", async function(results) {
					if(results[0].reqs < 1) {
						const invite = await interaction.member.guild.invites.create(interaction.channel, {maxAge: 86400, maxUses: 1, unique: true});
						query("INSERT INTO invites(invitecode, creator, guild) VALUES ('"+invite.code+"', '"+interaction.user.id+"', '"+interaction.guildId+"')");

						await interaction.reply('https://discord.gg/' + invite.code);
					} else {
						await interaction.reply('There is a 7 day cooldown between invite requests.');
					}
				});
			} else {
				await interaction.reply('You do not have the role required to create invites.')
			}
		} else {
			console.log('wrong channel');
		}

		//{maxAge: 86400, maxUses: 1}
		//console.log interaction
	},
};
