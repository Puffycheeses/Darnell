exports.yo = async function (msg) {
  switch (Math.floor(Math.random() * 200) === 1) { // Make this a function
    case 1:
      msg.channel.send('Yeha')
      break
    default:
      msg.channel.send('Yo')
  }
}
