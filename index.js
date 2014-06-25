var retrieveArguments = require('retrieve-arguments'),
    overrides = {}, use;

module.exports = use = function(callback, mappings) {
  checkCallback(callback);
  var moduleNames = retrieveArguments(callback),
    modules = moduleNames.map(function(moduleName) {
      return overrides[moduleName] || require(mapName(mappings, moduleName));
    });

  callback.apply(this, modules);
};

module.exports.override = function(module, mapping) {
  overrides[module] = mapping;
  return use;
};

function checkCallback(callback) {
  if (!isFunction(callback)) {
    throw new Error('No callback defined');
  }
}

function isFunction(func) {
  return typeof func === 'function';
}

function mapName(mappings, name) {
  mappings = mappings || {};
  return mappings[name] || name;
}
