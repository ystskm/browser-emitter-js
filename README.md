# browser-emitter
  
[![Version](https://badge.fury.io/js/browser-emitter.png)](https://npmjs.org/package/browser-emitter)
[![Build status](https://travis-ci.org/ystskm/browser-emitter-js.png)](https://travis-ci.org/ystskm/browser-emitter-js)  
  
Simple Event Emitter for browser. Using object as the agent of events.
You can use this both node and browsers.

## Install

Install with [npm](http://npmjs.org/):

    npm install browser-emitter
    
## API - Set functions by args

    var Emitter = require('browser-emitter');
    var emitter = new Emitter();
    emitter.on('hoge', function(){ console.log(arguments) });
    emitter.emit('hoge', 'a', 'b', 'c'); // => 'a', 'b', 'c'

### also use on browser

```html
<script type="text/javascript" src="Emitter.js"></script>
<script type="text/javascript">

    var emitter = new Emitter();
    emitter.on('hoge', function(){ console.log(arguments) });
    emitter.emit('hoge', 'a', 'b', 'c'); // => ['a', 'b', 'c']

</script>
```

## if you want to inherit Emitter to another *class*, use prototype chain.

    // for Singleton
    var MyClass = function(){
      this.__proto__.__proto__ = new Emitter();
    }
    
    // for Factory
    var MyClass = function(){
      Emitter.call(this);
    }
    for(var i in Emitter.prototype)
      MyClass.prototype[i] = Emitter.prototype[i];
    