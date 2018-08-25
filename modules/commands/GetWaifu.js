const base = require('../base');
const waifu = require('./GetWaifu');
const Discord = require('discord.js');

exports.waifu = async function (msg) {
    waifu.GetWaifu(msg.content.toLowerCase().split("grab me ").pop(), msg);
};

exports.GetWaifu = async function GetWaifu(name, msg) {
    msg.channel.send("Grabbing")
        .then(msg => {
            msg.delete(4000)
        });
    name = name.replace(" ", "%20");
    base.makeRequest('http://anime.tiddi.es:3300', {'character': name}).then(data => {
        if(data.error === true){
            msg.channel.send("Cannot find "+name.replace("%20", " "));
        } else {
            const embed = new Discord.RichEmbed()
                .setAuthor("Darnell", data.image)
                .addField(data.name, data.gender, true)
                .addField("Rank", data.rank, true)
                .addField("Anime", "[" + data.anime[0][0] + "](" + data.anime[0][1] + ")")
                .setImage(data.image);
            msg.channel.send({embed});
        }
    }).catch( e => {
            msg.channel.send(`No Response From Server ${e}`)
    });
};