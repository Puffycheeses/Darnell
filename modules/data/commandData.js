const getWaifu = require('../commands/GetWaifu');
const yeahNah = require('../commands/yeahNah');
const yo = require('../commands/yo');
const inviteLink = require('../commands/inviteLink');
const osu = require('../commands/osu');
const comeOutHere = require('../commands/comeOutHere');
const nhentai = require('../commands/nhentai');
const mudae = require('../commands/mudae/mudae');
const coins = require('../commands/coins/coins');
const base = require('../base')

exports.nhentai = nhentai.nhentai;
exports.mudaeCheck = mudae.check
exports.addCoins = coins.addCoins;
exports.yo = yo.yo;


let commands = {
  coins: [
    {
      name: "checkCoins()",
      check: ["check", "my", "coins"],
      calls: coins.printCoins
    }
  ],

  mudae: [
    {
      name: "ignoreChannel()",
      check: ["can", "you", "ignore"],
      calls: mudae.addIgnore
    },
    {
      name: "unignoreChannel()",
      check: ["can", "you", "un-ignore"],
      calls: mudae.removeIgnore
    },
    {
      name: "getWishlist()",
      check: ["grab", "my", "wishlist"],
      calls: mudae.getWishlist
    },
    {
      name: "addShow()",
      check: ["add the show ", " to my wishlist"],
      calls: mudae.addShow
    },
    {
      name: "addWaifu()",
      check: ["add ", " to my wishlist"],
      calls: mudae.addWaifu
    },
    {
      name: "removeShow()",
      check: ["remove the show ", " from my wishlist"],
      calls: mudae.removeShow
    },
    {
      name: "removeShow()",
      check: ["remove ", " from my wishlist"],
      calls: mudae.removeWaifu
    }
  ],

  osu: [
    {
      name: "osu()",
      check: ["osu", "stats"],
      calls: osu.osu
    }
  ],

  general: [
    {
      name: "inviteLink()",
      check: ["invite", "link"],
      calls: inviteLink.inviteLink
    },
    {
      name: "waifuGrabber",
      check: ["grab", "me"],
      calls: getWaifu.waifu
    },
    {
      name: "comeOutHere()",
      check: ["wanna", "come", "out", "here"],
      calls: comeOutHere.comeOutHere
    },
    {
      name: "leave()",
      check: ["please", "leave"],
      calls: base.leaveVoice
    },
    {
      name: "phase()",
      check: ["current", "phase"],
      calls: base.checkPhase
    },
    {
      name: "help()",
      check: ["help"],
      calls: base.help
    }
  ]
}

for (let parent in comdata.commands) {
  for (let child in comdata.commands.parent) {
    if ((child.check).every(word => msgText.includes(word))) {
      child.calls(msg)
    }
  }
}

module.exports = {
  commands: commands
}
