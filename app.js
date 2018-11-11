const Discord = require('discord.js')
const keys = require('./modules/keys/keys')
const base = require('./modules/base')
const login = require('./modules/keys/login')
const com = require('./modules/data/commandData')
const client = new Discord.Client()

const odds = 200 // Chance of a gosh darnit

client.on('message', msg => {
  let msgText = msg.content.toLowerCase()

  if (msg.author.id === '444754530685419520') return // Ignore Self
  if (keys.ignore.some(word => msgText.includes(word))) return // If message contains any words on ignore list
  if (/(^yo darnell$)/.test(msgText)) com.yo(msg) // If message is just "yo darnell" he will respond with yo
  if (Math.floor(Math.random() * odds) === 1) {
    msg.channel.send('gosh darnit darnell')
    com.addCoins(msg, 100, 0)
    return
  } // 1 out of odds chance of "gosh darnit"

  if (/(^yo darnell)( *|, *|. *)[a-zA-Z0-9]|(^d!)/.test(msgText)) {
    for (let parent in com.commands) {
      for (let child in com.commands[parent]) {
        if ((com.commands[parent][child].check).every(word => msgText.includes(word))) {
          console.log(`${msg.author.username} => ${com.commands[parent][child].name}|${parent} @ ${new Date()}`) // Logging
          com.commands[parent][child].calls(msg)
          return
        }
      }
    }
    msg.channel.send("what")
  }

  if (/( ([0-9]{6})$|^([0-9]{6})$| ([0-9]{6}) |^([0-9]{6} ))/g.test(msgText)) { // Regex to check if message contains NHentai tag
    com.nhentai(msg)
  }

  if (base.CheckIfMsgIsMudae(msg)) {
      com.mudaeCheck(msg)
  }

  if (base.contains(msg, 'thanks darnell')) {
    msg.channel.send('No problem')
    com.addCoins(msg, 1, 15000)
  }
})
// Set basic Info
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!\nConnected to ${client.guilds.size} servers with ${client.users.size} users total`)
  client.user.setActivity(keys.game)
})

client.login(login.getKey())
