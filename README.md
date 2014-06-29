> not yet ready for production

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

### init
Use this function to set the root of your module.

`use.init(String folder)`

### use
Use this function to inject modules into your module.

`use(function callback, Object mappings)`

### override
Use override in your tests to mock a module

`use.override(String moduleName, Object module)`

Usage
-----

Make sure you checkout the examples.

1. Setup
```js
// setup your base folder in the root of your module
require('use-module'); creates a global 'use'
use.init(__dirname); // this also clears all overriden modules.
```

```js
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
    // == require('./util.js');
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
```

