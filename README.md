use-module
==========

> angularjs-style DI for nodemodules

Installation
------------

`npm install use-module`

Usage
-----

```js
  var useModule = require('use-module');

  useModule(function(fs, path){
    fs.readFile(path.join('foo', 'bar', 'test.md'), function (err, data) {
      if (err) throw err;
      console.log(data);
    });
  });
```
