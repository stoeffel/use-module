use-module
==========

> angularjs-style DI for nodemodules

Installation
------------

`npm install use-module`

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
  use.that('fs', {
    readFile: function() {
    }
  });
  use(function(fs){
  });
```
