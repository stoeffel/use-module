var retrieveArguments = require('retrieve-arguments');

module.exports = function(callback) {
  if (!isFunction(callback)) {
    throw new Error('No callback defined');
  }
  var moduleNames = retrieveArguments(callback),
    modules = moduleNames.map(function(moduleName) {
    return require(moduleName);
  });

  callback.apply(this, modules);
};

function isFunction(func) {
  return typeof func === 'function';
}
