// Instead of app.js being full of requires it goes through here, Nothing here should EVER return a value other than the checkCommand

const getWaifu = require('./commands/GetWaifu');
const yeahNah = require('./commands/yeahNah');
const yo = require('./commands/yo');
const inviteLink = require('./commands/inviteLink');
const osu = require('./commands/osu');
const comeOutHere = require('./commands/comeOutHere');
const nhentai = require('./commands/nhentai');
const restart = require('./commands/restart');
const mudae = require('./commands/mudae');

exports.waifuGrabber = getWaifu.waifu;
exports.inviteLink = inviteLink.inviteLink;
exports.yeahNah = yeahNah.YeahNah;
exports.yo = yo.yo;
exports.osu = osu.osu;
exports.comeOutHere = comeOutHere.comeOutHere;
exports.nhentai = nhentai.nhentai;
exports.restart = restart.restart;
exports.mudae = mudae.addWaifu;
exports.mudaeWishList = mudae.getWishList;
exports.mudaeCheck = mudae.check;

exports.checkCommand = async function (message) {
    const commands = {
        "getWishList": ["grab", "my", "wishlist"],
        "addWaifu": ["add ", " to my wishlist"],
        "restart": ["!reboot"],
        "osu": ["osu", "stats"],
        "inviteLink": ["invite", "link"],
        "waifuGrabber": ["grab", "me"],
        "comeOutHere": ["wanna", "come", "out", "here"],
        "leave": ["please", "leave"],
        "phase": ["current", "phase"],
        "yo": ["darnell"]
    };
    for(let key in commands) {
        if(commands[key].every(word => message.includes(word))) {
            return key.toString();
        }
    }
};