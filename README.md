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

`use(function callback, Object mappings)`
`use.override(String moduleName, Object module)`

Usage
-----

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
  use(function(_, fs, request, winston){
  }, {
    _: 'underscore'
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

