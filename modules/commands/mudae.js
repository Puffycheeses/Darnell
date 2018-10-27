// ########################################################
// # WARNING EVERYONE LOOKING AT THIS:                    #
// # THIS IS ALL SPAGHETTI I'D REDO IF I HAD THE PATIENCE #
// ########################################################

const mongoose = require('mongoose');
const self = require('./mudae');

let userSchema = new mongoose.Schema({id: String, waifu: Array, show: Array});
let user = mongoose.model('waifus', userSchema);

let showSchema = new mongoose.Schema({show: String, frequency: Number});
let shows = mongoose.model('shows', showSchema);

let ignoreScheme = new mongoose.Schema({server: String});
let ignore = mongoose.model('ignorechannels', ignoreScheme);

exports.addUser = function (msg) {
    let newUser = new user({
        id: msg.author.id.toString(),
        waifu: [],
        show: []
    });
    user.find({id: msg.author.id.toString()}, function(err, users) {
        if (err) console.log(err);
        if (users.length <= 0) {
            newUser.save(function (err) {
                if (err) return console.log(err);
                console.log("Inserted new user")
            })
        } else {
            console.log("Error creating new user")
        }
    })
};

exports.addWaifu = function (msg) {
    user.find({id: msg.author.id.toString()}, function(err, users) {
        if(users.length <= 0) {
            console.log("could not find user");
            msg.channel.send(`I could not find you in my database, Don't worry though! \nTry again, everything should work now!\n*This is a temporary fix btw*`);
            self.addUser(msg);
        } else {
            let addme;
            let userBackup = users[0];
            if(/(the show)/.test(msg.content)) {
                addme = msg.content.toLowerCase().split("add the show ")[1].split(" to my wishlist")[0];
                user.find({show: addme}, function(err, waifu) {
                    if (waifu <= 0) {
                        users[0].show.push(addme.toLowerCase());
                        users[0].save(function (err) {
                            if(err) console.log(err);
                            err != null ? console.log(err) : msg.channel.send(`Added the show ${addme} to your wishlist`)
                        });
                    } else {
                        msg.channel.send(`The show ${addme} is already in your wishlist`)
                    }
                });

            } else {
                addme = msg.content.toLowerCase().split("add ")[1].split(" to my wishlist")[0];
                user.find({waifu: addme}, function(err, waifu) {
                    if (waifu <= 0) {
                        users[0].waifu.push(addme.toLowerCase());
                        users[0].save(function (err) {
                            if(err) console.log(err);
                            err != null ? console.log(err) : msg.channel.send(`Added ${addme} to your wishlist`)
                        });
                    } else {
                        msg.channel.send(`The character ${addme} is already in your wishlist`)
                    }
                });
            }
        }
    })
};

exports.removeWaifu = function (msg) {
    user.find({id: msg.author.id.toString()}, function(err, users) {
        if(users.length <= 0) {
            console.log("could not find user");
            msg.channel.send(`I could not find you in my database, Don't worry though! \nTry again, everything should work now!\n*This is a temporary fix btw*`);
            self.addUser(msg);
        } else {
            let removeme = "";
            if(/(the show)/.test(msg.content)) {
                removeme = msg.content.toLowerCase().split("remove the show ")[1].split(" from my wishlist")[0];
                if(!users[0].show.includes(removeme)) return;
                let index = users[0].show.indexOf(removeme);
                users[0].show.splice(index, 1);
            } else {
                removeme = msg.content.toLowerCase().split("remove ")[1].split(" from my wishlist")[0];
                if(!users[0].waifu.includes(removeme)) return;
                let index = users[0].waifu.indexOf(removeme);
                users[0].waifu.splice(index, 1);
            }
            users[0].save(function (err) {
                if(err) console.log(err);
                err != null ? console.log(err) : msg.channel.send(`removed ${removeme} from your wishlist`)
            });
        }
    })
};

exports.getWishList = function (msg) {
    user.find({id: msg.author.id.toString()}, function (err, users) {
        if(users.length <= 0) {
            msg.channel.send("You do not have a wishlist! add to it with \`\`\`yo darnell add ____ to my wishlist\`\`\`");
            self.addUser(msg);
        } else {
            msg.channel.send(`Your wishlist is:\`\`\`diff\n+\ Waifus\n--- ${users[0].waifu.sort().toString().split(',').join('\n--- ')}\n+\ Shows\n--- ${users[0].show.sort().toString().split(',').join('\n--- ')}\`\`\``)
        }
    })
};

exports.getShowFreq = function (msg) {
    shows.find({}).sort([['frequency', -1]]).exec(function (err, retshows) {
        const FinalMSG = [];
        retshows.forEach(show => {
            if (FinalMSG.length < 750) {
                FinalMSG.push(`+ ${show.show}\n--- ${show.frequency}\n`)
            }
        });
        msg.channel.send(`\`\`\`diff\n${FinalMSG.toString().replace(/,/g, "")}\`\`\``)
    })
};

exports.ignoreChannel = function (msg) {
    const id = msg.content.split("ignore ")[1];
    let newIgnore = new ignore({
        server: id,
    });
    newIgnore.save(function (err) {
        if (err) return console.log(err);
        console.log("Ignoring Channel")
    })
};

exports.check = function (msg) {
    try{if(msg.embeds[0].author.name == null){return}} catch {return}
    let name = msg.embeds[0].author.name;
    let show = msg.embeds[0].description.split("<")[0].split("\n")[0].substring(0, 16);

    // Track show frequency
    ignore.find({server: msg.channel.id.toString()}, function (err, retServers) {
        if(retServers <= 0) {
            shows.find({show: show.toString()}, function (err, retShows) {
                if(retShows.length <= 0) {
                    let newShow = new shows({
                        show: show,
                        frequency: 1
                    });
                    newShow.save(function (err) {
                        if (err) return console.log(err);
                    })
                } else {
                    retShows[0].frequency += 1;
                    retShows[0].save(function (err) {
                        if(err) console.log(err);
                    })
                }
            });
        } else {
            msg.channel.send('This channel is being ignored!\nYou cannot un-ignore channels right now but PM Puffycheeses#0001 and he can do it manually')
        }
    });


    shows.find({show: show.toString()}, function (err, retShows) {
        if(retShows.length <= 0) {
            let newShow = new shows({
                show: show,
                frequency: 1
            });
            newShow.save(function (err) {
                if (err) return console.log(err);
            })
        } else {
            retShows[0].frequency += 1;
            retShows[0].save(function (err) {
                if(err) console.log(err);
            })
        }
    });

    // Check DB for character
    user.find({waifu: name.toLowerCase().replace(/^\s+|\s+$/g,'')}, function (err, users) {
        if (users.length > 0) {
            users.forEach(mention => {
                msg.channel.send(`<@${mention.id}> ${name} from your wishlist has appeared!`)
            })
        }
    });
    // Check DB for show
    user.find({show: show.toLowerCase().replace(/^\s+|\s+$/g,'')}, function (err, users) {
        if (users.length > 0) {
            users.forEach(mention => {
                msg.channel.send(`<@${mention.id}> the show ${show} from your wishlist has appeared!`)
            })
        }
    })
};