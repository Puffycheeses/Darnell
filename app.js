const Discord = require('discord.js');
const com = require('./modules/hub');
const keys = require('./modules/keys/keys');
const base = require('./modules/base');
const client = new Discord.Client();

const odds = 200; // Chance of a gosh darnit
const ignore = keys.ignore;

client.on('message', msg => {
    let msgText = msg.content.toLowerCase();
    if (msg.author.bot) return;
    if (ignore.some(word => msgText.includes(word))) return;
    if (Math.floor(Math.random() * odds) === 1) { msg.channel.send('gosh darnit darnell'); return;}
    if (/(yo darnell$)/.test(msgText)) com.yo(msg);
    if (/(yo darnell)( *|, *|. *)[a-zA-Z0-9]/.test(msgText)) { // (is|did|are|should|will|can|do|have|why|was|am|if|you|what)( *|, *|. *)
        com.checkCommand(msgText).then(command => {
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

    if (/( ([0-9]{6})$|^([0-9]{6})$| ([0-9]{6}) |^([0-9]{6} ))/g.test(msgText)) {
        com.nhentai(msg);
    }

    if (msg.embeds !== []) {
        if (msg.author.id === "432610292342587392" || msg.author.id === "479206206725160960" || msg.author.id === "488711695640821760" || msg.author.id === "494636093711450152") {
            console.log("Mudae Detected!");
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

client.login(keys.discord);