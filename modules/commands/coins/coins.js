const mongoose = require('mongoose')
const keys = require('../../keys/keys')

let userSchema = new mongoose.Schema({id: String, coins: Number, lastEarned: Date})
let user = mongoose.model('coins', userSchema)

async function addUser (msg) {
  if (await userExists(msg)) return false
  let newUser = new user({
    id: msg.author.id.toString(),
    coins: 0,
    lastEarned: new Date()
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

async function getCoins (msg) {
  if (!await userExists(msg)) await addUser(msg)
  return (await user.findOne({id: msg.author.id}).select('coins -_id')).coins
}

async function addCoins (msg, amount) {
  if (!await userExists(msg)) await addUser(msg)
  let user = await getUserData(msg)
  user.coins += amount
  user.save(err => {return err})
  return true
}

async function removeCoins (msg, amount) {
  if (!await userExists(msg)) await addUser(msg)
  if (await getCoins(msg) < amount) return false
  let user = await getUserData(msg)
  user.coins -= amount
  user.save(err => {return err})
  return true
}

module.exports = {
  userExists: userExists,
  getUserData: getUserData,
  addUser: addUser,
  getCoins: getCoins,
  addCoins: addCoins,
  removeCoins: removeCoins,
  removeUser: removeUser
}