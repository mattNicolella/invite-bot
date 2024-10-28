const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search For Invite Based Off UserId of creator or acceptor, or Invite Code')
        .addStringOption(option => option.setName('search_term').setDescription('Search Term').setRequired(true)),
    async execute(interaction) {
        //console.log(interaction);

        //const channel = await interaction.member.guild.channels.cache.get(interaction.channelid);

        //return;
        //if(channel.name == 'request-an-invite') {
        const channel = interaction.channelId;

        if(channel == '998048341797650452' || channel == '998048341797650452') {
            let val = interaction.options.getString('search_term');
            if(interaction.member.roles.cache.some(role => role.name.toUpperCase() === 'ADMIN')) {
                query("SELECT * FROM invites WHERE guild='" + interaction.guildId + "' AND (invitecode='" + val + "' OR creator='" + val + "' OR acceptor='" + val + "')", async function (result) {
                    let embeds = [];

                    for (let i = 0; i < result.length; i++) {
                        row = result[i];

                        const creator = await interaction.guild.members.fetch({ user: row.creator });
                        const acceptor = await interaction.guild.members.fetch({ user: row.acceptor });

                        //console.log(row);

                        let creatorName = creator.nickname;
                        let acceptorName = acceptor.nickname;

                        let acceptId = row.acceptor;

                        if (creatorName == null)
                            creatorName = creator.displayName;

                        if (acceptorName == null)
                            acceptorName = acceptor.displayName;

                        if (acceptorName == null) {
                            acceptorName = 'Not Accepted';
                            acceptId = '';
                        } else {
                            acceptId = "<@"+acceptId+">";
                        }

                        let acceptDate = row.accepted

                        if(acceptDate == null)
                            acceptDate = 'N/A';

                        const exampleEmbed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Invite ' + row.invitecode)
                            //.setURL('https://discord.js.org/')
                            //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                            //.setDescription("Code: " + row.invitecode)
                            //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
                            .addFields(
                                { name: 'Created:', value: '' + row.stampt },
                                { name: 'Accepted:', value: '' +  acceptDate},
                                //{ name: '\u200B', value: '\u200B' },
                                { name: 'Creator:', value: creatorName + "\n<@" + row.creator + ">", inline: true },
                                { name: 'Acceptor:', value: acceptorName + "\n" + acceptId, inline: true },
                                //{ name: 'Inline field title', value: 'Some value here', inline: true },
                            )
                            //.addField('Inline field title', 'Some value here', true)
                            //.setImage('https://i.imgur.com/AfFp7pu.png')
                            .setTimestamp()
                        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

                        embeds.push(exampleEmbed);
                    }

                    interaction.reply({ embeds: embeds });
                });
            } else {
                console.log('not admin');
            }
        } else {
            console.log('wrong channel');
        }
    },
};
