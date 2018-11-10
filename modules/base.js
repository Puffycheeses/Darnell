// ########################
// # Needs to be cleaned! #
// ########################

const request = require('request-promise')
const shell = require('shelljs')

exports.contains = function (msg, term) {
  return msg.content.toLowerCase().includes(term)
}

exports.formatNum = function (num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

exports.makeRequest = async function (target, form) {
  let options = {
    url: target,
    method: 'POST',
    headers: {'User-Agent': 'Super Agent/0.0.1', 'Content-Type': 'application/x-www-form-urlencoded'},
    form: form,
  }

  let returnVal = await request(options)
  return JSON.parse(returnVal)
}

exports.makeGetRequest = async function (target) {
  let options = {
    url: target,
    method: 'GET',
    headers: {'User-Agent': 'Super Agent/0.0.1', 'Content-Type': 'application/x-www-form-urlencoded'},
  }

  let returnVal = await request(options)
  return JSON.parse(returnVal)
}

exports.leaveVoice = async function (msg) {
  const voiceChannel = msg.member.voiceChannel
  voiceChannel.leave()
}

exports.checkPhase = async function (msg) {
  // All this shit to add a decimal place cause splice wasn't working
  const commit = shell.exec('cd ~/darnell/darnellMaster/.git && git rev-list --all --count', {silent: true}).split('\n')[0].split('')
  commit.push('.')
  commit[commit.length - 1] = [commit[commit.length - 2], commit[commit.length - 2] = commit[commit.length - 1]][0]
  msg.channel.send(`I am currently on phase ${commit.join('')}.`)
}

exports.mudaeCheck = async function (msg) {
  if (msg.author.id === '432610292342587392' || msg.author.id === '479206206725160960' || msg.author.id === '488711695640821760' || msg.author.id === '494636093711450152') {
    if (msg.embeds !== []) {
      return true
    }
  }
  return false
}

exports.arrayUnique = function (array) {
  let a = array.concat();
  for(let i=0; i<a.length; ++i) {
    for(let j=i+1; j<a.length; ++j) {
      if(a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}