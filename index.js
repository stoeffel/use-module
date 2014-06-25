var retrieveArguments = require('retrieve-arguments');

module.exports = function(callback, mappings) {
  if (!isFunction(callback)) {
    throw new Error('No callback defined');
  }
  var moduleNames = retrieveArguments(callback),
    modules = moduleNames.map(function(moduleName) {
      return require(mapName(mappings, moduleName));
    });

  callback.apply(this, modules);
};

function mapName(mappings, name) {
  mappings = mappings || {};
  if (mappings[name]) {
    return mappings[name];
  }
  return name;
}

function isFunction(func) {
  return typeof func === 'function';
}
