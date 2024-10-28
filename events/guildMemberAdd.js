module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(user) {
        //console.log(user);
        resolve(user);

        //{channelid: , cache: false}
    },
};

async function resolve(user) {
    query("SELECT * FROM invites WHERE IsNull(acceptor) AND guild='"+user.guild.id+"'", async function(openInvites) {
        const currentInvites = await user.guild.invites.fetch({channelid: user.systemChannelIdsystemChannelId, cache: false});

        let found = 0;

        //console.log('---------------------------');
        //console.log(openInvites);
        //console.log('---------------------------');
        //console.log(currentInvites.map());
        //console.log(typeof openInvites);
        //console.log('---------------------------');
        for(let i = 0; i < openInvites.length; i++) {
        //for(const row in openInvites) {
            found = 0;

            let row = openInvites[i];

            //console.log('invite code:' + row.invitecode);

            for(const v of currentInvites.values()) {
                //console.log(k + ":"+v);
                if(row.invitecode == v.code)
                    found = 1;

                if(found == 0) {
                    console.log('not found');
                    query("UPDATE invites SET acceptor='"+user.user.id+"', accepted=NOW() WHERE invitecode='"+row.invitecode+"' AND guild='"+user.guild.id+"'");
                    found = 1;
                    return;
                }
            }

            if(found == 0) {
                console.log('trigger final');
                query("UPDATE invites SET acceptor='"+user.user.id+"', accepted=NOW() WHERE invitecode='"+row.invitecode+"' AND guild='"+user.guild.id+"'");
            }
        }
    });
}