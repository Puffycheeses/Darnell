const Discord = require('discord.js');
const com = require('./modules/hub');
const keys = require('./modules/keys/keys');
const client = new Discord.Client();

const odds = 200; // Chance of a gosh darnit
const ignore = keys.ignore;

client.on('message', msg => {
    let msgText = msg.content.toLowerCase();
    if (msg.author.bot) return;
    if (ignore.some(word => msgText.includes(word))) return;
    if (Math.floor(Math.random() * odds) === 1) { msg.channel.send('gosh darnit darnell'); return;}
    if (/(yo darnell)( *|, *|. *)(is|did|are|should|will|can|do|have|why|was|am|if)( *|, *|. *)[a-zA-Z0-9]/.test(msgText)) {
        com.checkCommand(msgText).then(command => {
            switch (command) {
                case "inviteLink": com.inviteLink(msg); break;
                case "waifuGrabber": com.waifuGrabber(msg); break;
                case "yeahNah": com.yeahNah(msg); break;
                case "osu": com.osu(msg); break;
                default: com.yo(msg);
            }
        });
    }
});

// Set basic Info
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!\nConnected to ${client.guilds.size} servers with ${client.users.size} users total`);
    client.user.setActivity('Need for Seed 2')
});

client.login(keys.discord);