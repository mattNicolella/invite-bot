module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {
        //console.log(interaction.member.guild.invites);

        if (!interaction.isCommand()) return;

	    //const { commandName } = interaction;
        const command = interaction.client.commands.get(interaction.commandName);

        //console.log(interaction);

        if (!command) return;

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};