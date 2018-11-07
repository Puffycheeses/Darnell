const should = require('should');
const keys = require('../../keys/keys')
const coins = require('./coins')

// Create test data
const data = require('../../../test/data.js')
let msg = new data.Message('testData')

before(function (done) {
  keys.db.once('open', function () {
    done()
  })
});

describe('Coins', function () {
  describe('#addUser()', function () {
    it('should add a new user', async function () {
      (await coins.addUser(msg)).should.equal(true)
    })
  })
  describe('#userExists()', function () {
    it('should return true if the user exists', async function () {
      (await coins.userExists(msg)).should.equal(true)
    })
  })
  describe('#getUserData()', function () {
    it('should return a user object', async function () {
      (await coins.getUserData(msg)).should.be.an.instanceOf(Object)
    })
  })
  describe('#getCoins()', function () {
    it('should return the users coins', async function () {
      (await coins.getCoins(msg)).should.be.an.instanceOf(Number)
    })
  })
  describe('#addCoins()', function () {
    it('should add coins then return true', async function () {
      (await coins.addCoins(msg, 10)).should.equal(true)
    })
  })
  describe('#removeCoins()', function () {
    it('should remove coins then return true', async function () {
      (await coins.removeCoins(msg, 10)).should.equal(true)
    })
  })
  describe('#removeUser()', function () {
    it('should remove the user', async function () {
      (await coins.removeUser(msg)).should.equal(true)
    })
  })
})
