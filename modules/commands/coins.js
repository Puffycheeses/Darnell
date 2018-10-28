const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({id: String, coins: Number, lastEarned: Date});
let user = mongoose.model('coins', userSchema);


function userExists(msg) {
    console.log("Checking if exists");
    return new Promise((resolve) => {
        user.find({id: msg.author.id.toString()}, function (err, users) {
            if (users.length <= 0) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}


function findUser(msg) {
    console.log("Finding user");
    return new Promise((resolve) => {
        // Assumed already checked user exists
        user.find({id: msg.author.id.toString()}, function (err, users) {
            resolve(users)
        })
    })
}


function addUser(msg) {
    return new Promise((resolve, reject) => {
        console.log("Adding User");
        let newUser = new user({
            id: msg.author.id.toString(),
            coins: 0,
            lastEarned: new Date()
        });
        if (userExists(msg)) reject("User Exists");
        newUser.save(function (err) {
            if (err) return console.log(err);
            console.log("Inserted new user");
            resolve(true)
        })
    })
}


exports.checkCoins = function (msg) {
    return new Promise((resolve) => {
        console.log("Checking coins");
        if (!userExists(msg)) addUser(msg);
        findUser(msg).then(user => {
            msg.channel.send(`You have ${user.coins.toString()} coins`);
            resolve(true)
        })
    })
};

exports.addCoins = function (msg, amount) {
    return new Promise((resolve) => {
        console.log("Adding coins");
        if (!userExists(msg)) addUser(msg);
        findUser(msg).then(user => {
            user[0].coins += amount;
            user[0].save(function (err) {
                if (err) return console.log(err);
                msg.channel.send(`You have earned ${amount} darnell coins`);
                resolve(true)
            })
        })
    })
};