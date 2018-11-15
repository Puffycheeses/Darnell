const base = require('../../base')
const keys = require('../../keys/keys')
const request = require('request-promise')
const parser = require('osu-parser');
const fs = require('fs')

async function downloadMapData(id) {
  const path = `./temp/${id}.osz`
  let options = {
    url: `https://osu.ppy.sh/beatmapsets/${id}/download?noVideo=1`,
    method: 'GET',
    encoding: null,
    headers: {'User-Agent': 'Super Agent/0.0.1', 'Content-Type': 'application/x-www-form-urlencoded'},
  }

  let response = await request.get(options)
  const buffer = Buffer.from(response, 'utf8');
  await fs.writeFileSync(path, buffer);
  return path
}


// Test function
async function tests() {
  parser.parseFile(await downloadMapData('819153'), (err, map) => {
    if (err) console.log(err)
    console.log(map)
  })
}


tests()