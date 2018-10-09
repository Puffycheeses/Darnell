// ########################
// # Needs to be cleaned! #
// ########################

const Yeah =[
    ["andrew", "gay"],
    ["andrew", "homo"],
    ["andrew", "homosexual"],
    ["andy", "gay"],
    ["andy", "homo"],
    ["andy", "homosexual"],
    ["ele", "bot"],
    ["uwu", "jewish"],
    ["uwu", "jew"],
    ["fall", "tree"],
    ["rewrite", "you"],
    ["love", "dadbot"],
    ["love", "ele"],
    ["love", "deny", "guy"],
    ["love", "dad", "bot"],
    ["detect", "questions"],
    ["you", "thick"],
    ["you", "thicc"],
    ["you", "thic"],
    ["u", "thick"],
    ["u", "thicc"],
    ["u", "thic"],
    ["live", "society"],
    ["thanos", "right"],
    ["thanos", "hottest"],
    ["thanos", "sexiest"],
    ["you", "learn"],
    ["you", "remember"],
    ["gay", "kiss"]
];
const Nah =[
    ["you", "homo"],
    ["you", "gay"],
    ["you", "homosexual"],
    ["kill", "myself"],
    ["i", "depressed"],
    ["traps", "gay"],
    ["traps", "gey"],
    ["traps", "homo"],
    ["traps", "homosexual"],
    ["cain", "abel"],
    ["hang", "myself"],
    ["shoot", "myself"],
    ["favour", "whites"],
    ["favour", "blacks"],
    ["prefer", "whites"],
    ["prefer", "blacks"],
    ["kill", "her"],
    ["kill", "him"],
    ["fuck", "bodies"],
    ['get', 'me']
];


exports.YeahNah = async function yeahnah(msg) {
    let message = msg.content;
    for(let i in Yeah) {
        if(Yeah[i].every(word => message.includes(word))) {
            msg.channel.send("Yeah");
            return
        }
    }
    for(let i in Nah) {
        if(Nah[i].every(word => message.includes(word)))  {
            msg.channel.send("Nah");
            return
        }
    }
    msg.channel.send((Math.floor(Math.random() * (2 - 1 + 1)) + 1) === 1 ? "Yeah" : "Nah");
};