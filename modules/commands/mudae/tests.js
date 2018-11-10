const should = require('should');
const keys = require('../../keys/keys')
const mudae = require('./mudae')

// Create test data
const data = require('../../../test/data.js')
let msg = new data.Message('general test message')
let addWaifuMsg = new data.Message('yo darnell add megumin to my wishlist')
let addShowMsg = new data.Message('yo darnell add the show konosuba to my wishlist')
let remWaifuMsg = new data.Message('yo darnell remove megumin from my wishlist')
let remShowMsg = new data.Message('yo darnell remove the show konosuba from my wishlist')
let addIgnoreMsg = new data.Message('yo darnell can you ignore 505272972349800458')
let unIgnoreMsg = new data.Message('yo darnell can you un-ignore 505272972349800458')

before(function (done) {
  keys.db.once('open', function () {
    done()
  })
})
describe('#addUser()', function () {
  it('should add a new user', async function () {
    (await mudae.addUser(msg)).should.equal(true)
  })
})
describe('#userExists()', function () {
  it('should return true if the user exists', async function () {
    (await mudae.userExists(msg)).should.equal(true)
  })
})
describe('#getUserData()', function () {
  it('should return a user object', async function () {
    (await mudae.getUserData(msg)).should.be.an.instanceOf(Object)
  })
})
describe('#addWaifu()', function () {
  it('should add waifu to the users document', async function () {
    (await mudae.addWaifu(addWaifuMsg)).should.equal(true)
  })
})
describe('#addShow()', function () {
  it('should add show to the users document', async function () {
    (await mudae.addShow(addShowMsg)).should.equal(true)
  })
})
describe('#removeWaifu()', function () {
  it('should remove waifu from the users document', async function () {
    (await mudae.removeWaifu(remWaifuMsg)).should.equal(true)
  })
})
describe('#removeShow()', function () {
  it('should remove show from the users document', async function () {
    (await mudae.removeShow(remShowMsg)).should.equal(true)
  })
})
describe('#checkWaifu()', function () {
  it('should return an array of ids of users with that waifu in their doc', async function () {
    (await mudae.checkWaifu('megumin')).should.be.an.instanceOf(Array)
  })
})
describe('#checkShow()', function () {
  it('should return an array of ids of users with that show in their doc', async function () {
    (await mudae.checkShow('konosuba')).should.be.an.instanceOf(Array)
  })
})
describe('#addIgnore()', function () {
  it('Should add the channel id to the ignore list', async function () {
    (await mudae.addIgnore(addIgnoreMsg)).should.equal(true)
  })
})
describe('#removeIgnore()', function () {
  it('Should remove the channel id from the ignore list', async function () {
    (await mudae.removeIgnore(unIgnoreMsg)).should.equal(true)
  })
})
describe('#removeUser()', function () {
  it('should remove the user', async function () {
    (await mudae.removeUser(msg)).should.equal(true)
  })
})