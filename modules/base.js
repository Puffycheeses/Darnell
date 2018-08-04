exports.contains = function (msg, term) {
    return msg.content.includes(term)
};

exports.formatNum = function (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};