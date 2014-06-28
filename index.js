var retrieveArguments = require('retrieve-arguments'),
  path = require('path'),
  use, baseDir;


module.exports = use = function(callback, mappings) {
  if (!baseDir) {
    throw new Error('you should call init');
  }
  checkCallback(callback);
  var moduleNames = retrieveArguments(callback),
    modules = moduleNames.map(function(moduleName) {
      return use.overrides[moduleName] || require(mapName(mappings, moduleName));
    });

  callback.apply(this, modules);
};
global.use = use;

module.exports.init = function(theBaseDir) {
  baseDir = theBaseDir;
  use.overrides = {};
  return use;
};

module.exports.override = function(module, mapping) {
  use.overrides[module] = mapping;
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
  use.mappings = mergeObjects(use.mappings, mappings || {});
  name = name.replace(/\$/g, '.');
  if (name[0] === '.') {
    name = name.replace(/\.([a-zA-Z])/g, './$1');
    name = name.replace(/\.$/g, './');
    if (use.mappings['$']) {
      name = name.replace(/\./g, use.mappings['$']);
    }
    name = path.join(baseDir, name);
  } else {
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  return use.mappings[name] || name;
}

function mergeObjects(obj1, obj2) {
  var obj3 = {};
  for (var attrname in obj1) {
    obj3[attrname] = obj1[attrname];
  }
  for (var attrname in obj2) {
    obj3[attrname] = obj2[attrname];
  }
  return obj3;
}
