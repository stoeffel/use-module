var use = require('../').init(__dirname);

use(function($foo) {
  $foo();
}, {
  $: './lib/',
  $c: './lib/core',
  _: 'lodash'
})
