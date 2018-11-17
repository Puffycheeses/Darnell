const base = require('../../base')
const keys = require('../../keys/keys')
const request = require('request-promise')
const parser = require('osu-parser');
const fs = require('fs')
const filePath = require('path')
const AdmZip = require('adm-zip');
let osu = require("ojsama");

let cookie = keys.cookie
let cookiejar = request.jar()
cookiejar.setCookie(cookie, 'https://osu.ppy.sh');

let tempDir = filePath.join(__dirname, `temp`)

async function downloadMapData(id) {
  let path = filePath.join(`temp`, `${id}.osz`)
  let options = {
    url: `https://osu.ppy.sh/beatmapsets/${id}/download?noVideo=1`,
    method: 'GET',
    encoding: null,
    jar: cookiejar,
    headers: {'User-Agent': 'Super Agent/0.0.1', 'Content-Type': 'application/x-www-form-urlencoded'},
  }

  let response = await request.get(options)
  const buffer = Buffer.from(response, 'utf8');
  await fs.writeFileSync(path, buffer);
  return path
}

async function getMapData(path) {
  let zip = new AdmZip(filePath.resolve(__dirname, path))
  let file = zip.getEntries()
  for (let i = 0; i < file.length; i ++) {
    if (/(.osu)/.test(file[i].entryName.toString())) {
      zip.extractEntryTo(file[i], tempDir)
      console.log("Found .osu file")
      return filePath.join(tempDir, file[i].entryName)
    }
  }
}

// Test function
async function tests() {
  console.log("Downloading")
  let id = "879477"
  let path = filePath.resolve(__dirname, await getMapData(await downloadMapData(id)))
  console.log(`Path:`, path)
  let parser = new osu.parser();
  await fs.readFile(path, "utf8",  (err, file) => {
    if (err) console.log(err);
    parser.feed(file)
    console.log(osu.ppv2({map: parser.map}).toString());
    fs.unlinkSync(path)
    fs.unlinkSync(filePath.resolve(__dirname, filePath.join(`temp`, `${id}.osz`)))
    console.log("Done!")
  })
}


tests()