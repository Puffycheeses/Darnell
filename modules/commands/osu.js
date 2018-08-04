const request = require('request');
const base = require('../base');
const keys = require('../keys/keys');
exports.osu = function (msg) {
    let mode;
    let user = msg.content.toLowerCase().split("stats for ").pop();



    switch (true) {
        case base.contains(msg, "mania"):
            mode = 3;
            break;
        case base.contains(msg, "taiko"):
            mode = 2;
            break;
        default:
            mode = 0;
            break;
    }

    let headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    let options = {
        url: 'https://osu.ppy.sh/api/get_user',
        method: 'POST',
        headers: headers,
        form: {'k': keys.osu, "u": user, "m": mode}
    };

    request(options, function (error, response, body) {
        let data = JSON.parse(body);
        if (data[0].ranked_score == null) {
            msg.channel.send("User does not exist");
            return;
        }
        const embed = {
            "title": data[0].username,
            "url": "http://osu.ppy.sh",
            "color": 11482016,
            "footer": {
                "icon_url": "https://vignette.wikia.nocookie.net/osugame/images/c/c9/Logo.png/revision/latest?cb=20151219073209",
                "text": "osu.ppy.sh"
            },
            "fields": [
                {
                    "name": data[0].username,
                    "value": `:flag_${data[0].country.toLowerCase()}: #${base.formatNum(data[0].pp_country_rank)}\n:earth_americas: #${base.formatNum(data[0].pp_rank)}`
                },
                {
                    "name": "Stats",
                    "value": `**Ranked Score** ${base.formatNum(data[0].ranked_score)}\n**Accuracy** ${Math.round(data[0].accuracy * 100) / 100}%\n**Play Count** ${base.formatNum(data[0].playcount)}\n**Total Score** ${base.formatNum(data[0].total_score)}\n`
                },
                {
                    "name": "Maps",
                    "value": `**SS+** ${base.formatNum(data[0].count_rank_ssh)}\n**SS** ${base.formatNum(data[0].count_rank_ss)}\n**S+** ${base.formatNum(data[0].count_rank_sh)}\n**S** ${base.formatNum(data[0].count_rank_s)}\n**A** ${base.formatNum(data[0].count_rank_a)}`
                }
            ]
        };
        msg.channel.send({embed});
    });
};