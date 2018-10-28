const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({id: String, coins: Number, lastEarned: Date});
let user = mongoose.model('coins', userSchema);


async function userExists(msg) {
    console.log("Checking if exists");
    user.find({id: msg.author.id.toString()}, function (err, users) {
        console.log("Checked users");
        return users.length <= 0;
    })
}


async function findUser(msg) {
    console.log("Finding user");
    // Assumed already checked user exists
    return await user.find({id: msg.author.id.toString()})
}


async function addUser(msg) {
    console.log("Adding User");
    let newUser = new user({
        id: msg.author.id.toString(),
        coins: 0,
        lastEarned: new Date()
    });
    newUser.save(function (err) {
        if (err) return console.log(err);
        console.log("Inserted new user");
        return true
    })
}


exports.checkCoins = async function (msg) {
    console.log("Checking coins");
    if (!userExists(msg)) addUser(msg);
    await findUser(msg).then(user => {
        msg.channel.send(`You have ${user.coins.toString()} coins`);
        return true
    })
};

exports.addCoins = async function (msg, amount) {
    console.log("Adding coins");
    if (userExists(msg)) await addUser(msg);
    let user = await findUser(msg);
    console.log(JSON.stringify(user));
    user[0].coins += amount;
    user[0].save(function (err) {
        if (err) return console.log(err);
        msg.channel.send(`You have earned ${amount} darnell coins`);
        return true
    })
};
