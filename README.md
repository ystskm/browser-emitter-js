# browser-emitter
  
[![Build status](https://travis-ci.org/ystskm/browser-emitter-js.png)](https://travis-ci.org/ystskm/browser-emitter-js)  
  
Simple Event Emitter for browser. Using dom as the agent of events.
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