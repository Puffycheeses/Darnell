// ########################
// # Needs to be cleaned! #
// ########################

const mongoose = require('mongoose');
const key = require('../keys/keys');
const Discord = require('discord.js');
const self = require('./mudae');

let userSchema = new mongoose.Schema({id: String, waifu: Array});
let user = mongoose.model('waifus', userSchema,);

exports.addUser = function (msg) {
    let newUser = new user({
        id: msg.author.id.toString(),
        waifu: []
    });
    user.find({id: msg.author.id.toString()}, function(err, users) {
        if (err) console.log(err);
        if (users.length < 0) {
            newUser.save(function (err) {
                if (err) return console.log(err);
                console.log("Inserted new user")
            })
        }
    })
};

exports.addWaifu = function (msg) {
    user.find({id: msg.author.id.toString()}, function(err, users) {
        if(users.length < 0) {
            console.log("could not fnd user");
            self.addUser(msg);
        } else {
            let waifu = msg.content.split("add ")[1].split(" to my wishlist")[0];
            console.log(`adding ${waifu} to wishlist`);
            users[0].waifu.push(waifu.toLowerCase());
            users[0].save(function (err) {
                if(err) console.log(err);
                err != null ? console.log(err) : msg.channel.send(`Added ${waifu} to your wishlist`)
            });
        }
    })
};

exports.getWishList = function (msg) {
    user.find({id: msg.author.id.toString()}, function (err, users) {
        if(users.length < 0) {
            msg.channel.send("You do not have a wishlist! add to it with \`\`\`yo darnell add ____ to my wishlist\`\`\`")
        } else {
            msg.channel.send(`Your wishlist is:\`\`\`${users[0].waifu}\`\`\``)
        }
    })
};

exports.check = function (name, msg, show) {
    // Check DB for character
    user.find({waifu: name.toLowerCase()}, function (err, users) {
        if (users.length > 0) {
            users.forEach(mention => {
                msg.channel.send(`<@${mention.id}> a waifu from your wishlist has appeared!`)
            })
        }
    });
    // Check DB for show
    user.find({waifu: show.toLowerCase()}, function (err, users) {
        if (users.length > 0) {
            users.forEach(mention => {
                msg.channel.send(`<@${mention.id}> a show from your wishlist has appeared!`)
            })
        }
    })
};