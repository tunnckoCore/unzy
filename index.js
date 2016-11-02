/*!
 * unzy <https://github.com/tunnckoCore/unzy>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

function Unzy (options) {
  if (!(this instanceof Unzy)) {
    return new Unzy(options)
  }
  utils.minibase.MiniBase.call(this, options)
  this.cmd = this.options.command || 'git'
  this.initPlugins()
}

utils.minibase.MiniBase.extend(Unzy)

Unzy.prototype.addCommand = function addCommand (name, options) {
  if (typeof options === 'function') {
    return this.define(name, options)
  }
  this.define(name, function (opts) {
    let args = null
    let mopts = options && typeof options === 'object' ? options : {}

    if (typeof opts === 'string') {
      let argv = opts.split(' ').filter(Boolean)
      args = utils.dargs(utils.minimist(argv, mopts))
    }
    if (arguments.length > 1) {
      args = utils.dargs(utils.minimist([].slice.call(arguments), mopts))
    }
    if (opts && typeof opts === 'object') {
      args = utils.dargs(opts)
    }
    return utils.execa(this.cmd, [name].concat(args))
  })
  return this
}

Unzy.prototype.initPlugins = function initPlugins () {
  this.use(utils.plugins.clone())
  this.use(utils.plugins.checkout())
}

module.exports = new Unzy()
module.exports.Unzy = Unzy
