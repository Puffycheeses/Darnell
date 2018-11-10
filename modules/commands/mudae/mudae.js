const mongoose = require('mongoose')
const base = require('../../base')
const keys = require('../../keys/keys')

let userSchema = new mongoose.Schema({id: String, waifu: Array, show: Array})
let user = mongoose.model('waifus', userSchema)

let ignoreScheme = new mongoose.Schema({server: String})
let ignore = mongoose.model('ignorechannels', ignoreScheme)

// User data functions
async function addUser (msg) {
  if (await userExists(msg)) return false
  let newUser = new user({
    id: msg.author.id.toString(),
    waifu: [],
    show: [],
  })
  await newUser.save()
  return true
}

async function removeUser (msg) {
  if (!await userExists(msg)) return false
  user.deleteOne({id: msg.author.id.toString()}, err => {return !err})
  return true
}

async function userExists (msg) {
  return await user.countDocuments({id: msg.author.id}) > 0
}

async function getUserData (msg) {
  if (!await userExists(msg)) await addUser(msg)
  return await user.findOne({id: msg.author.id})
}


// Adding and removing waifus and shows
async function addWaifu (msg) {
  if (!await userExists(msg)) await addUser(msg)
  let user = await getUserData(msg)
  let waifu = msg.content.split("yo darnell add ")[1].split(" to my wishlist").toLowerCase()
  user.waifu.push(waifu)
  user.save(err => { return !err })
  return true
}

async function addShow (msg) {
  if (!await userExists(msg)) await addUser(msg)
  let user = await getUserData(msg)
  let show = msg.content.split("yo darnell add the show ")[1].split(" to my wishlist").toLowerCase()
  user.show.push(show)
  user.save(err => { return !err })
  return true
}

async function removeWaifu (msg) {
  if (!await userExists(msg)) await addUser(msg)
  let user = await getUserData(msg)
  let waifu = msg.content.toLowerCase().split("yo darnell remove ")[1].split(" from my wishlist")
  user.waifu.splice(user.waifu.indexOf(waifu), 1)
  user.save(err => { return !err })
  return true
}

async function removeShow (msg) {
  if (!await userExists(msg)) await addUser(msg)
  let user = await getUserData(msg)
  let show = msg.content.toLowerCase().split("yo darnell remove the show ")[1].split(" from my wishlist")
  user.show.splice(user.show.indexOf(show), 1)
  user.save(err => { return !err })
  return true
}


// Checking data
async function check (msg) {
  if (await ignoreChannel(msg)) return false
  let name = msg.embeds[0].author.name.toLowerCase().replace(/^\s+|\s+$/g, '')
  let show = msg.embeds[0].description.split('<')[0].split('\n')[0].substring(0, 16).toLowerCase().replace(/^\s+|\s+$/g, '')
  msg.channel.send(`${base.arrayUnique((await checkWaifu (name)).concat((await checkShow(show)))).replace(/,/g, " ")} something from your wishlist has appeared`)
}

async function checkWaifu (name) {
  return (await user.find({waifu: name}).select({"id": 1, "_id": 0})).map(obj => {return `@<${obj.id}>`})
}

async function checkShow(show) {
  return (await user.find({show: show}).select({"id": 1, "_id": 0})).map(obj => {return `@<${obj.id}>`})
}

async function ignoreChannel(msg) {
  return await ignore.countDocuments({server: msg.channel.id.toString()}) > 0
}

async function getWishlist(msg) {
  let user = getUserData(msg)
  msg.channel.send(`Your wishlist is:\`\`\`diff\n+\ Waifus\n--- ${user.waifu.sort().toString().split(',').join('\n--- ')}\n+\ Shows\n--- ${user.show.sort().toString().split(',').join('\n--- ')}\`\`\``)
}


// Adding ignored channels
async function addIgnore(msg) {
  let newIgnore = new ignore({
    server: msg.content.split('ignore ')[1],
  })
  newIgnore.save(err => { return !err })
  return true
}

async function removeIgnore(msg) {
  await ignore.deleteOne({server: msg.content.split('un-ignore ')[1],})
  return true
}

module.exports = {
  checkWaifu: checkWaifu,
  checkShow: checkShow,
  userExists: userExists,
  getUserData: getUserData,
  addUser: addUser,
  check: check,
  addWaifu: addWaifu,
  addShow: addShow,
  removeWaifu: removeWaifu,
  removeShow: removeShow,
  addIgnore: addIgnore,
  removeIgnore: removeIgnore,
  getWishlist: getWishlist,
  removeUser: removeUser
}

// keys.db.once('open', async function () {
//   console.log(base.arrayUnique((await checkWaifu ('joseph joestar')).concat((await checkShow('overwatch')))))
// })
