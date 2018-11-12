// ########################
// # Needs to be cleaned! #
// ########################

const base = require('../base')

exports.nhentai = function (msg) {
  let id = msg.content.split(/([0-9]{6})/).find(value => /([0-9]{6})/.test(value))
  base.makeGetRequest(`https://nhentai.net/api/gallery/${id}`).then(data => {
    // Separate comments based on tags
    let d = new Date()
    console.log(`${msg.author.username} => nhentai()|nhentai @ ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`) // Logging
    let tags = []
    data.tags.forEach(tag => {
      tags.push(tag['name'])
    })
    // Massive long if/else to see how darnell should bully you in how you are gay
    if (tags.includes('crossdressing')) {
      if (tags.includes('males only')) {
        if (tags.includes('shotacon')) {
          msg.channel.send(`\`${data.title.pretty}\`, fuck ${msg.author.username} your despicable. This is ultra mega homo, has gay shit ***WITH KIDS***. the fuck dude...`)
          return
        }
        msg.channel.send(`\`${data.title.pretty}\` is actually really gay, Both Cross dressing and Males only? wow...`)
        return
      }
      msg.channel.send(`\`${data.title.pretty}\` gets complicated, I don't have the brain capacity to know *if* traps are gay`)
      return
    } else if (tags.includes('males only') || tags.includes('yaoi')) {
      if (tags.includes('shotacon')) {
        msg.channel.send(`\`${data.title.pretty}\`, It is literally 100% gay children wtf`)
        return
      }
      msg.channel.send(`\`${data.title.pretty}\` is just men haha lmao ${msg.author.username} is gay`)
      return
    } else {
      msg.channel.send(`Usually i'd harass people about their hentai but \`${data.title.pretty}\` doesn't seem to be gay so I don't care.`)
      return
    }
  }).catch(function () {
    console.log('oof')
  })
}
