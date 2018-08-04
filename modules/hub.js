// Instead of app.js being full of requires it goes through here, Nothing here should EVER return a value other than the checkCommand

const getWaifu = require('./commands/GetWaifu');
const yeahNah = require('./commands/yeahNah');
const yo = require('./commands/yo');
const inviteLink = require('./commands/inviteLink');
const osu = require('./commands/osu');

exports.waifuGrabber = getWaifu.waifu;
exports.inviteLink = inviteLink.inviteLink;
exports.yeahNah = yeahNah.YeahNah;
exports.yo = yo.yo;
exports.osu = osu.osu;

exports.checkCommand = async function (message) {
    const commands = {
        "osu": ["osu", "stats"],
        "inviteLink": ["invite", "link"],
        "waifuGrabber": ["grab", "me"],
        "yeahNah": ["yo", "darnell"], // Keep these two last
        "yo": ["darnell"],
    };
    for(let key in commands) {
        if(commands[key].every(word => message.includes(word))) {
            console.log(message); // Log everything asked
            return key.toString();
        }
    }
};