use-module
==========

> angularjs-style DI for nodemodules

### from
```js
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var winston = require('winston');
```
### to
```js
use(function(underscore, fs, path, winston) {
});
```

Installation
------------

`npm install use-module`

API
---

### use
Use this function to inject modules into your module.

`use(function callback, Object mappings)`

### override
Use override in your tests to mock a module

`use.override(String moduleName, Object module)`

Usage
-----

```js
// setup your base folder in the root of your module
var use = require('use-module');
use.init(__dirname); // this also clears all overriden modules.
```

```js
  var use = require('use-module');

  // inject modules
  use(function(fs, path){
    fs.readFile(path.join('foo', 'bar', 'test.md'), function (err, data) {
      if (err) throw err;
      console.log(data);
    });
  });

  // map module name
  use(function(_, _s, fs, request, winston, cliColor){ 
    // camelcase is converted to dashed
  }, {
    _: 'underscore',
    _s: 'underscore.string'
  });

  // inject local modules
  use(function($util, $$){ 
    // == require('./util/');
    // == require('../');
  });

  // mock a dependency
  use.override('fs', {
    readFile: function(filename, options, callback) {
      callback(null, 'hello');
    }
  }).override('path', {
    /*...*/
  });
  use(function(fs, path) {
    fs.readFile('./README.md', { encoding: 'utf-8' }, function(err, data) {
      if (err) {
        throw err;
      }
      assert.equal(data, 'hello');
      done();
    });
  });
```

