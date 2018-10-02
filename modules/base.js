// ########################
// # Needs to be cleaned! #
// ########################

const request = require('request-promise');
const keys = require('./keys/keys');
exports.contains = function (msg, term) {
    return msg.content.includes(term)
};

exports.formatNum = function (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

exports.makeRequest = async function (target, form) {
    let options = {
        url: target,
        method: 'POST',
        headers: {'User-Agent': 'Super Agent/0.0.1', 'Content-Type': 'application/x-www-form-urlencoded'},
        form: form
    };

    let returnVal = await request(options);
    return JSON.parse(returnVal)
};

exports.makeGetRequest = async function (target) {
    let options = {
        url: target,
        method: 'GET',
        headers: {'User-Agent': 'Super Agent/0.0.1', 'Content-Type': 'application/x-www-form-urlencoded'},
    };

    let returnVal = await request(options);
    return JSON.parse(returnVal)
};

exports.leaveVoice = async function (msg) {
    const voiceChannel = msg.member.voiceChannel;
    voiceChannel.leave()
};

exports.checkPhase = async function (msg) {
    msg.channel.send(`I am currently on phase ${keys.phase}. This means I am ${keys.percent} way to **MAXIMUM** power.`)
};