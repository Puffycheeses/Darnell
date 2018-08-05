const request = require('request-promise');

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
    return JSON.parse(returnVal);
};