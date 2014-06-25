#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
  pkg = require('./package.json'),
  useModule = require('./index');

if (argv.help || argv.h) {
  console.log([
    '# ' + pkg.name,
    pkg.description,
    '',
    'Usage',
    '-----',
  ].join('\n'));
} else {
}
