var use = require('./index.js'),
  mockery = require('mockery'),
  assert = require('assert'),
  stub = {
    success: true
  };

describe('use-module', function() {
  beforeEach(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
    mockery.registerMock('module1', stub);
    mockery.registerMock('module2', stub);
    mockery.registerMock('module-dashed', stub);
    mockery.registerMock(__dirname + '/util', stub);
    mockery.registerMock(__dirname + '/core', stub);

    use.init(__dirname);
  });

  afterEach(function() {
    mockery.disable();
  });

  it('should be ready for some hacking', function() {
    assert.equal(typeof use, 'function');
  });

  it('should call the given function', function(done) {
    use(function() {
      done();
    });
  });

  it('should fail if no callback given', function() {
    assert.throws(use, Error);
  });

  it('should require a module using a given argument', function() {
    use(function(module1) {
      assert.ok(module1.success);
    });
  });

  it('should require multible modules using a given arguments', function() {
    use(function(module1) {
      assert.ok(module1.success);
    });
    use(function(module1, module2, moduleDashed) {
      assert.ok(module1.success);
      assert.ok(module2.success);
      assert.ok(moduleDashed.success);
    });
  });

  it('should read the readme', function(done) {
    use(function(fs, path) {
      fs.readFile('./README.md', { encoding: 'utf-8' }, function(err, data) {
        if (err) {
          throw err;
        }
        assert.equal(path.extname('README.md'), '.md');
        done();
      });
    });
  });

  it('should fail if a module is not found', function() {
    assert.throws(use.bind(this, function(unknown) {}), Error);
  });


  it('should map module names', function() {
    use(function(mapped1, mapped2, module1) {
      assert.ok(mapped1.success);
      assert.ok(mapped2.success);
      assert.ok(module1.success);
    }, {
      mapped1: 'module1',
      mapped2: 'module2'
    });
  });

  it('should require the mocked module', function() {
    use.override('module1', {
      mocked: true
    }).override('module2', {
      mocked: true
    });

    use(function(module1, module2) {
      assert.ok(!module1.success);
      assert.ok(module1.mocked);
      assert.ok(module2.mocked);
    });
  });

  it('should mock the readFile function', function(done) {
    use.override('fs', {
      readFile: function(filename, options, callback) {
        callback(null, 'hello');
      }
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
  });

  it('should require a local module', function() {
    use(function($util, $core) {
      assert.ok($util.success);
      assert.ok($core.success);
    });
  });

});
