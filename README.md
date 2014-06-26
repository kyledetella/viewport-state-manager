ViewportStateManager
====================

Observe changes in the viewport and adapt your UIs accordingly.

## Usage

### Browserify
Viewport State Manager can be consumed as a CommonJS module using [browserify](http://browserify.org).

```
npm install viewport-state-manager
```


```js
var ViewportStateManager = require('viewport-state-manager');

var manager = new ViewportStateManager({
  ranges: {
    desktop: [1025, 5000],
    tablet: [768, 1024],
    handheld: [1, 767]
  },
  callback: function (currentState, previousState) {
    // ...
  }
});
```

### RequireJS
ViewportStateManager is AMD compliant, so you can use it with [require.js](http://requirejs.org).

```js
// Configure RequireJs
requirejs.config({
  paths: {
    'viewportStateManager' : 'path/to/viewport-state-manager'
  }
});

define(['viewportStateManager'], function (ViewportStateManager) {
  var manager = new ViewportStateManager({
    ranges: {
      desktop: [1025, 5000],
      tablet: [768, 1024],
      handheld: [1, 767]
    },
    callback: function (currentState, previousState) {
      // ...
    }
  });
});
```

### Without modules

```html
<html>
  <head></head>
  <body>

  <script src="viewport-state-manager.js"></script>
  <script>
    var manager = new ViewportStateManager({
      ranges: {
        desktop: [1025, 5000],
        tablet: [768, 1024],
        handheld: [1, 767]
      },
      callback: function (currentState, previousState) {
        // ...
      }
    });
  </script>
  </body>
</html>
```

## Options

#### ranges (breakpoints)
**Type:** _Object_

```js
  // key – breakpoint name
  // value – min, max array of pixel dimensions
  tablet: [768, 1024]
```

+ default – `desktop: [1025, 5000], tablet: [768, 1024], handheld: [1, 767]`


#### callback
Function to be invoked each time a breakpoint threshold is crossed

**Type:** _Function_

```js
 function (currentState, previousState) { /* ... */ };
```

+ `currentState` - **Type:** _String_ - The name of the breakpoint you are currently in
+ `previousState` - **Type:** _String_ - The name of the breakpoint you exited from


#### debounceTime
Duration of debounce set on the window `resize` or `orientationchange` events

**Type:** _Number_
+ default: `250`


#### currentViewportState
The default viewport state. _Note:_ This will automatically be set on instantiation if no argument is supplied

**Type:** _String_
+ default: `''`

---

## Browser Compatibility
IE9+, Chrome, Firefox, Safari, Android 2.3+, iOS 5+. You know, the good stuff!

---
