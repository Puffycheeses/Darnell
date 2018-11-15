// Instead of app.js being full of requires it goes through here, Nothing here should EVER return a value other than the checkCommand

const getWaifu = require('./commands/GetWaifu');
const yeahNah = require('./commands/yeahNah');
const inviteLink = require('./commands/inviteLink');
const osu = require('./commands/osu/osu');
const comeOutHere = require('./commands/comeOutHere');
const nhentai = require('./commands/nhentai');
const restart = require('./commands/restart');
const mudae = require('./commands/mudae/mudae');
const coins = require('./commands/coins/coins');

// General
exports.waifuGrabber = getWaifu.waifu;
exports.inviteLink = inviteLink.inviteLink;
exports.yeahNah = yeahNah.YeahNah;
exports.comeOutHere = comeOutHere.comeOutHere;
exports.nhentai = nhentai.nhentai;
exports.restart = restart.restart;
// Osu
exports.osu = osu.osu;
// Coins
exports.addCoins = coins.addCoins;
exports.checkCoins = coins.printCoins;
// Mudae
exports.mudaeCheck = mudae.check
exports.addWaifu = mudae.addWaifu
exports.addShow = mudae.addShow
exports.removeWaifu = mudae.removeWaifu
exports.removeShow = mudae.removeShow
exports.addIgnore = mudae.addIgnore
exports.removeIgnore = mudae.removeIgnore
exports.getWishlist = mudae.getWishlist

exports.checkCommand = async function (message) {
  const commands = {
    // Coins
    "checkCoins": ["check", "my", "coins"],
    // Mudae
    "ignoreChannel": ["can", "you", "ignore"],
    "unignoreChannel": ["can", "you", "un-ignore"],
    "getWishList": ["grab", "my", "wishlist"],
    "addShow": ["add the show ", " to my wishlist"],
    "addWaifu": ["add ", " to my wishlist"],
    "removeShow": ["remove the show ", " from my wishlist"],
    "removeWaifu": ["remove ", " from my wishlist"],
    // Osu
    "osu": ["osu", "stats"],
    // General
    "inviteLink": ["invite", "link"],
    "waifuGrabber": ["grab", "me"],
    "comeOutHere": ["wanna", "come", "out", "here"],
    "leave": ["please", "leave"],
    "phase": ["current", "phase"],
    "help": ["help"]
  };
  for(let key in commands) {
    if(commands[key].every(word => message.includes(word))) {
      return key.toString();
    }
  }
};
