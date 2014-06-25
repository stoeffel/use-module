var retrieveArguments = require('retrieve-arguments'),
    overrides = {},
    use;

module.exports = use = function(callback, mappings) {
  if (!isFunction(callback)) {
    throw new Error('No callback defined');
  }
  var moduleNames = retrieveArguments(callback),
    modules = moduleNames.map(function(moduleName) {
      if (overrides[moduleName]) {
        return overrides[moduleName];
      }
      return require(mapName(mappings, moduleName));
    });

  callback.apply(this, modules);
};

module.exports.override = function(module, mapping) {
  overrides[module] = mapping;
  return use;
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
