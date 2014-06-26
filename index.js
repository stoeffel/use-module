var retrieveArguments = require('retrieve-arguments'),
    path = require('path'),
    overrides = {}, use, baseDir;

module.exports = use = function(callback, mappings) {
  checkCallback(callback);
  var moduleNames = retrieveArguments(callback),
    modules = moduleNames.map(function(moduleName) {
      return overrides[moduleName] || require(mapName(mappings, moduleName));
    });

  callback.apply(this, modules);
};

module.exports.init = function(theBaseDir) {
  baseDir = theBaseDir;
  overrides = {};
  return use;
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
  var index;
  mappings = mappings || {};
  name = name.replace(/\$/g,'.');
  if (name[0] === '.') {
    name = name.replace(/\.([a-zA-Z])/g,'./$1');
    name = name.replace(/\.$/g,'./');
    name = path.join(baseDir, name);
  } else {
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  return mappings[name] || name;
}

