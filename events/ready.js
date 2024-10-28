const fs = require('fs');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({
            status: 'dnd',  // You can show online, idle... Do not disturb is dnd
            game: {
                name: 'With The Rats Emotions',  // The message shown
                type: 'PLAYING' // PLAYING, WATCHING, LISTENING, STREAMING,
            }
        });

        refreshCommands();
    },
};