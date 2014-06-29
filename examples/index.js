var use = require('../').init(__dirname);

use(function(foo) {
  foo();
}, {
  foo: './lib/foo',
  core: './lib/core/func',
  _: 'lodash'
})
