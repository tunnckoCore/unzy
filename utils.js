'use strict'

var utils = require('lazy-cache')(require)
var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign, no-global-assign

/**
 * Lazily required module dependencies
 */

require('dargs-fork', 'dargs')
require('execa')
require('minibase')
require('minimist')
require = fn // eslint-disable-line no-undef, no-native-reassign, no-global-assign

utils.plugins = {}

utils.plugins.clone = function clonePlugin () {
  return function clone () {
    // TODO: add shortcuts and sugars
    this.addCommand('clone', {
      alias: {
        l: 'local',
        s: 'shared',
        q: 'quiet',
        v: 'verbose',
        o: 'origin',
        b: 'branch',
        u: 'upload-pack',
        c: 'config',
        j: 'jobs'
      }
    })
  }
}

utils.plugins.checkout = function checkoutPlugin () {
  return function checkout () {
    this.addCommand('checkout', {
      alias: {
        p: 'patch',
        q: 'quiet',
        f: 'force',
        t: 'track',
        m: 'merge',
        ours: 'theirs'
      }
    })
  }
}

/**
 * Expose `utils` modules
 */

module.exports = utils
