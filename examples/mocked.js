var use = require('../').override('fs', {
  readFile: function(filename, options, callback) {
    callback(null, 'hello');
  }
});

require('../examples/module.js');
