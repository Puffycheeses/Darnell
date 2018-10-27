const mongoose = require('mongoose');
const key = require('../keys/keys');
const Discord = require('discord.js');
const self = require('./mudae');

let userSchema = new mongoose.Schema({id: String, coins: Int64, lastEarned: Timestamp});
let user = mongoose.model('coins', userSchema);

exports.coins = class coins {
    static addUser(msg) {
        return new Promise((resolve) => {
            let newUser = new user({
                id: msg.author.id.toString(),
                coins: 0,
                lastEarned: new Date()
            });
            user.find({id: msg.author.id.toString()}, function (err, users) {
                if (err) console.log(err);
                if (users.length <= 0) {
                    newUser.save(function (err) {
                        if (err) return console.log(err);
                        console.log("Inserted new user");
                        resolve(true)
                    })
                } else {
                    console.log("Error creating new user");
                    resolve(false)
                }
            })
        })
    }

    static checkCoins(msg) {
        return new Promise((resolve) => {
            user.find({id: msg.author.id.toString()}, function (err, users) {
                if (err) console.log(err);
                if (users.length <= 0) {
                    this.addUser(msg).then(() => {
                        msg.channel.send("You are not earning darnell coins but you are now!")
                    })
                } else {
                    msg.channel.send(`You have ${user.coins.toString()} coins`);
                    resolve(true)
                }
            })
        })
    }
};


exports.addCoins = async function (msg) {

};

exports.spendCoins = async function (msg) {

};

exports.tradeCoins = async function (msg) {

};