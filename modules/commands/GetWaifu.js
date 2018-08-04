const request = require('request');
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
    let headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    };

    let options = {
        url: 'http://anime.tiddi.es:3300',
        method: 'POST',
        headers: headers,
        form: {'character': name}
    };

    request(options, function (error, response, body) {
        let data = JSON.parse(body);
        if (!error && response.statusCode === 200) {
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
        }
    })
};