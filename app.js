const Discord = require('discord.js');
const com = require('./modules/hub');
const keys = require('./modules/keys/keys');
const base = require('./modules/base');
const client = new Discord.Client();

const odds = 200; // Chance of a gosh darnit
const ignore = keys.ignore;

client.on('message', msg => {
    let msgText = msg.content.toLowerCase();
    if (msg.author.id === "444754530685419520") return; // Ignore Self
    if (ignore.some(word => msgText.includes(word))) return; // If message contains any words on ignore lis
    if (/(^yo darnell$)/.test(msgText)) com.yo(msg); // If message is just "yo darnell" he will respond with yo
    if (Math.floor(Math.random() * odds) === 1) { msg.channel.send('gosh darnit darnell'); return;} // 1 out of odds chance of "gosh darnit"
    if (/(^yo darnell)( *|, *|. *)[a-zA-Z0-9]|(^d!)/.test(msgText)) {
        com.checkCommand(msgText).then(command => { // Run message through checkCommand to see if it contains key words of the command
            console.log(`${msgText} => ${command} <= ${msg.author.username}`); // Debug & log
            switch (command) {
                case "inviteLink": com.inviteLink(msg); break;
                case "waifuGrabber": com.waifuGrabber(msg); break;
                case "osu": com.osu(msg); break;
                case "comeOutHere": com.comeOutHere(msg); break;
                case "leave": base.leaveVoice(msg); break;
                case "phase": base.checkPhase(msg); break;
                case "restart": com.restart(msg); break;
                case "addWaifu": com.mudae(msg); break;
                case "removeWaifu": com.mudaeRem(msg); break;
                case "getWishList": com.mudaeWishList(msg); break;
                case "help": msg.author.send(keys.helpText); msg.channel.send("I PM'd you the help!"); break;
                default: com.yeahNah(msg); break;
            }
        });
    }

    if (/( ([0-9]{6})$|^([0-9]{6})$| ([0-9]{6}) |^([0-9]{6} ))/g.test(msgText)) { // Regex to check if message contains NHentai tag
        com.nhentai(msg);
    }

    if (msg.embeds !== []) { // A bunch of stuff to check if Mudae has sent a message
        if (msg.author.id === "432610292342587392" || msg.author.id === "479206206725160960" || msg.author.id === "488711695640821760" || msg.author.id === "494636093711450152") {
            com.mudaeCheck(msg)
        }
    }

    if (base.contains(msg, "thanks darnell")) {
        msg.channel.send("No problem")
    }
});

// Set basic Info
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!\nConnected to ${client.guilds.size} servers with ${client.users.size} users total`);
    client.user.setActivity(keys.game)
});

client.login(exports.stagingDiscord);