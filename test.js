var useModule = require('./index.js'),
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
    mockery.registerMock('mock', stub);
    mockery.registerMock('mock2', stub);
  });

  afterEach(function() {
    mockery.disable();
  });

  it('should be ready for some hacking', function() {
    assert.equal(typeof useModule, 'function');
  });

  it('should call the given function', function(done) {
    useModule(function() {
      done();
    });
  });

  it('should fail if no callback given', function() {
    assert.throws(useModule, Error);
  });

  it('should require a module using a given argument', function() {
    useModule(function(mock) {
      assert.ok(mock.success);
    });
  });

  it('should require multible modules using a given arguments', function() {
    useModule(function(mock, mock2) {
      assert.ok(mock.success);
      assert.ok(mock2.success);
    });
  });

  it('should read the readme', function(done) {
    useModule(function(fs, path) {
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
    assert.throws(useModule.bind(this, function(unknown) {}), Error);
  });
});
