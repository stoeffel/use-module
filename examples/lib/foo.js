use(function(_) {
  module.exports = function() {
    console.log('lodash:', _.random(0, 5));
    console.log(__filename);
    func();
  };
});
