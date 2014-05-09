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
    once: once,
    emit: emit,
    listeners: listeners
  };
  for( var i in EmitterProtos)
    Emitter.prototype[i] = _wrap(EmitterProtos[i]);

  function on(type, args) {
    this._events[type].push({
      fn: args[0]
    }); // TODO more options
    return this;
  }

  function once(type, args) {
    this._events[type].push({
      fn: args[0],
      once: true
    }); // TODO more options
    return this;
  }

  function off(type, args) {

    var self = this, splice_pos = 0;
    if(type == null) {
      for( var i in this._events)
        delete this._events[i];
      return this;
    }

    while(splice_pos < this._events[type].length) {
      var stat = this._events[type][splice_pos];
      typeof args[0] != 'function' || args[0] === stat.fn ? (function() {
        self._events[type].splice(splice_pos, 1);
      })(): splice_pos++;
    }

    this._events[type].length == 0 && delete this._events[type];
    return this;

  }

  function emit(type, args) {

    var self = this, splice_pos = 0;
    while(splice_pos < this._events[type].length) {
      var stat = this._events[type][splice_pos];
      stat.fn.apply(this, args), stat.once ? (function() {
        self._events[type].splice(splice_pos, 1);
      })(): splice_pos++;
    }

    return this;

  }

  function listeners(type) {
    return this._events[type].length;
  }

  function _wrap(fn) {
    return function() {
      var args = Array.prototype.slice.call(arguments), type = args.shift();
      !Array.isArray(this._events[type]) && (this._events[type] = []);
      return fn.call(this, type, args);
    };
  }

})(window);
