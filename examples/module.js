var use = require('..');

use(function(fs, path, $util) {
  console.log($util());

  fs.readFile('./README.md', {
    encoding: 'utf-8'
  }, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
  });
});
