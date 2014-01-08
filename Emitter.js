/***/
// [browser-emitter-js] Emitter.js
(function(win) {

  typeof module != 'undefined' && (module.exports = Emitter);
  win.Emitter = Emitter;

  function Emitter() {

    var self = this;
    this._eve = 'click', this._events = {};
    this._via = document.createElement('div');

    this._via.onclick = function() {
      var type = self._type, args = self._args;
      delete self._type, delete self._args, (function(handlers) {
        Array.isArray(handlers) && handlers.forEach(function(fn) {
          fn.apply(self, args);
        });
      })(self._events[type]);
    };

  }

  var EmitterProtos = {
    on: on,
    off: off,
    emit: emit
  };
  for( var i in EmitterProtos)
    Emitter.prototype[i] = EmitterProtos[i];

  function on() {

    var self = this;
    var args = Array.prototype.slice.call(arguments), type = args.shift();
    !Array.isArray(this._events[type]) && (this._events[type] = []);
    this._events[type].push(args[0]); // TODO more options

    return this;

  }

  function off() {

    var self = this;
    var args = Array.prototype.slice.call(arguments), type = args.shift();
    !Array.isArray(this._events[type]) && (this._events[type] = []);

    var splice_pos = 0;
    while(splice_pos < this._events[type].length)
      typeof args[0] != 'function' || args[0] === fn ? (function() {
        self._events[type].splice(splice_pos, 1);
      })(): splice_pos++;

    this._events[type].length == 0 && delete this._events[type];
    return this;

  }

  function emit() {

    var self = this;
    var args = Array.prototype.slice.call(arguments), type = args.shift();
    !Array.isArray(this._events[type]) && (this._events[type] = []);

    if(this._type || this._args)
      throw new Error('[Emitter.js] emit event under unexpected condition.');

    this._type = type, this._args = args;
    self._via.click();

    return this;

  }

})(window);
