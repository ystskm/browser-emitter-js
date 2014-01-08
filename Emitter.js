/***/
// [browser-emitter-js] Emitter.js
(function(win) {

  typeof module != 'undefined' && (module.exports = Emitter);
  win.Emitter = Emitter;

  function Emitter() {
    this._events = {};
  }

  var EmitterProtos = {
    on: on,
    off: off,
    emit: emit,
    fire: fire
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
    self.fire();

    return this;

  }

  function fire() {
    var self = this;
    var type = self._type, args = self._args;
    delete self._type, delete self._args, (function(handlers) {
      Array.isArray(handlers) && handlers.forEach(function(fn) {
        fn.apply(self, args);
      });
    })(self._events[type]);
  }

})(window);
