const Discord = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Intents = Discord.Intents;
const mysql = require('mysql');
require('dotenv').config();

const myIntents = new Intents();
myIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS
);

const client = new Discord.Client({
    autoReconnect: true,
    retryLimit: Infinity,
    intents: myIntents
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

client.login(process.env.TOKEN);

client.on('error', (err) => {
    onClientCrash(err.message);
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
    //commands.push(command.data.toJSON());
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//Saves Client Crashing Error To File
function onClientCrash(crashStack) {
    fs.writeFile('ClientError.txt', crashStack, function (err) {
        if (err) return console.log(err);
        else console.log('Error Written To File');
    });
}

refreshCommands = async function() {
        const servers = await client.guilds.fetch();

        //console.log(servers.keys());
        for (const server of servers.keys()) {
            //console.log(server);
            try {
                //console.log('Started refreshing application (/) commands.');
                let commands = [];

                for (const file of commandFiles) {
                    const command = require(`./commands/${file}`);
                    commands.push(command.data.toJSON());
                }

                await rest.put(
                    Routes.applicationGuildCommands('997927793142812802', server),
                    { body: commands },
                ).then(() => console.log('Successfully registered application commands for '+server))
                    .catch(console.error);

                //console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.log(error);
            }
        }
};

global.query = function (str = '', callbackfunc = null) {
    let connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'USERNAME',
        password: 'PASSWORD',
        database: 'DATABASE'
    });

    connection.connect();
    connection.query(str, function (error, results, fields) {
        if (error) throw error;
        if (callbackfunc != null)
            callbackfunc(results);
    });

    connection.end();
};