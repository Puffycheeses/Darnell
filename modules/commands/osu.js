const base = require('../base');
const keys = require('../keys/keys');
const Discord = require('discord.js');

exports.osu = function (msg) {
    let mode;
    let user = msg.content.toLowerCase().split("stats for ").pop();

    switch (true) {
        case base.contains(msg, "mania"): mode = 3; break;
        case base.contains(msg, "taiko"): mode = 2; break;
        default: mode = 0; break;
    }

    base.makeRequest('https://osu.ppy.sh/api/get_user', {'k': keys.osu, "u": user, "m": mode}).then(data => {
        if (data[0].ranked_score == null) {
            msg.channel.send("User does not exist");
            return;
        }

        const embed = new Discord.RichEmbed()
            .setTitle(data[0].username)
            .setColor(11482016)
            .setFooter("osu.ppy.sh", "https://vignette.wikia.nocookie.net/osugame/images/c/c9/Logo.png/revision/latest?cb=20151219073209")
            .addField(data[0].username,
                `:flag_${data[0].country.toLowerCase()}: #${base.formatNum(data[0].pp_country_rank)}\n
                :earth_americas: #${base.formatNum(data[0].pp_rank)}`)
            .addField("Stats",
                `**Ranked Score** ${base.formatNum(data[0].ranked_score)}\n
                **Accuracy** ${Math.round(data[0].accuracy * 100) / 100}%\n
                **Play Count** ${base.formatNum(data[0].playcount)}\n
                **Total Score** ${base.formatNum(data[0].total_score)}`)
            .addField("Maps",
                `**SS+** ${base.formatNum(data[0].count_rank_ssh)}\n
                **SS** ${base.formatNum(data[0].count_rank_ss)}\n
                **S+** ${base.formatNum(data[0].count_rank_sh)}\n
                **S** ${base.formatNum(data[0].count_rank_s)}\n
                **A** ${base.formatNum(data[0].count_rank_a)}`);
        msg.channel.send({embed});
    }).catch(
        msg.channel.send("No Response From Server")
    );
};