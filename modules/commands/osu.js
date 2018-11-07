// ########################
// # Needs to be cleaned! #
// ########################

const base = require('../base')
const keys = require('../keys/keys')
const Discord = require('discord.js')

exports.osu = async function (msg) {
  let mode
  let user = msg.content.toLowerCase().split('stats for ').pop()

  switch (true) {
    case base.contains(msg, 'mania'):
      mode = 3
      break
    case base.contains(msg, 'ctb'):
      mode = 2
      break
    case base.contains(msg, 'catch the beat'):
      mode = 2
      break
    case base.contains(msg, 'taiko'):
      mode = 1
      break
    default:
      mode = 0
      break
  }

  await base.makeRequest('https://osu.ppy.sh/api/get_user', {'k': keys.osu, 'u': user, 'm': mode}).then(data => {
    if (data[0].ranked_score == null) {
      msg.channel.send('User does not exist')
      return
    }

    const embed = new Discord.RichEmbed().setTitle(data[0].username).
      setColor(11482016).
      setFooter('osu.ppy.sh', 'https://vignette.wikia.nocookie.net/osugame/images/c/c9/Logo.png/revision/latest?cb=20151219073209')
      //        Name                                              Value                                               Inline
      .addField(`:flag_${data[0].country.toLowerCase()}: Rank`, `#${base.formatNum(data[0].pp_country_rank)}`, true).
      addField(`:earth_americas: Rank`, `#${base.formatNum(data[0].pp_rank)}`, true).
      addField(`Ranked Score`, `${base.formatNum(data[0].ranked_score)}`, true).
      addField(`Accuracy`, `${Math.round(data[0].accuracy * 100) / 100}%`, true).
      addField(`Play Count`, `${base.formatNum(data[0].playcount)}`, true).
      addField(`Total Score`, `${base.formatNum(data[0].total_score)}`, true).
      addField(`Maps`, `\u200b`, false).
      addField(`SS+`, `${base.formatNum(data[0].count_rank_ssh)}`, true).
      addField(`SS`, `${base.formatNum(data[0].count_rank_ss)}`, true).
      addField(`S+`, `${base.formatNum(data[0].count_rank_sh)}`, true).
      addField(`S`, `${base.formatNum(data[0].count_rank_s)}`, true).
      addField(`A`, `${base.formatNum(data[0].count_rank_a)}`, true).
      addBlankField(true)
    msg.channel.send({embed})
  }).catch(e => {
    msg.channel.send(`Error\`\`\`${e}\`\`\``)
  })
}
