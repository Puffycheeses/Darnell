const data = require('../data/yeahNahData');


exports.YeahNah = async function yeahnah(msg) {
    let message = msg.content;


    for(let i in data.Yeah) {
        if(data.Yeah[i].every(word => message.includes(word))) {
            msg.channel.send("Yeah");
            return
        }
    }


    for(let i in data.Nah) {
        if(data.Nah[i].every(word => message.includes(word)))  {
            msg.channel.send("Nah");
            return
        }
    }


    msg.channel.send((Math.floor(Math.random() * (2 - 1 + 1)) + 1) === 1 ? "Yeah" : "Nah");
};
