'use strict'

var Lab = require('lab')
var Code = require('code')
var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var expect = Code.expect

var Varo = require('..')


describe('Varo', function () {
  var varo

  beforeEach(function (done) {
    varo = Varo()
    done()
  })

  it('should work as expected', function (done) {
    varo.handle({role:'test'}, function (msg, done) {
      expect(msg).to.deep.equal({role:'test'})
      return done(null, true)
    })

    varo.observe({role:'test'}, function (msg) {
      expect(msg).to.deep.equal({role:'test'})
    })

    varo.act({role:'test'}, function (err, reply) {
      expect(err).to.equal(null)
      expect(reply).to.equal(true)
    })

    done()

    it('should work as expected', function (done) {
    var testCount1 = 0

    function handler (msg, done) {
      testCount1 ++
      return done(null, msg)
    }

    varo.handle({role: 'test2'}, handler)
    varo.removeHandler(handler)
    expect(testCount1).to.equal(0)

    done()
  })

  it('should work as expected', function (done) {
    var testCount2 = 0
    var observer = function (msg) {
      testCount2 ++
    }
    varo.removeObserver(observer)
    expect(testCount2).to.equal(0)

    done()
  })

})

})
