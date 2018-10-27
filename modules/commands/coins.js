const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({id: String, coins: Int64, lastEarned: Timestamp});
let user = mongoose.model('coins', userSchema);


function userExists(msg) {
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
    return new Promise((resolve) => {
        // Assumed already checked user exists
        user.find({id: msg.author.id.toString()}, function (err, users) {
            resolve(users)
        })
    })
}


function addUser(msg) {
    return new Promise((resolve, reject) => {
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
        if (!userExists(msg)) addUser(msg);
        findUser(msg).then(user => {
            msg.channel.send(`You have ${user.coins.toString()} coins`);
            resolve(true)
        })
    })
};
