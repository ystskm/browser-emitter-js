var nodeunit = require('nodeunit');
var jsdom = require("jsdom");
var repo = 'https://raw.github.com/ystskm/browser-emitter-js/';

function setup(callback) {
  jsdom.env('<html><head></head><body></body></head>', {
    scripts: [repo + "master/Emitter.js"],
    done: function(errors, window) {
      errors && console.error(errors);
      callback(window);
    }
  });
}

module.exports = nodeunit.testCase({
  'readme': function(t) {
    setup(function(window) {
      var Emitter = window.Emitter;
      t.equal(typeof Emitter, 'function');
      var emitter = new Emitter();
      emitter.on('readme-test', function() {
        t.equal(arguments[0], 1);
        t.equal(arguments[1], 1);
        t.equal(arguments[2], 1);
        t.done();
      });
      emitter.emit('readme-test', 0, 1, 2);
    });
  }
});
