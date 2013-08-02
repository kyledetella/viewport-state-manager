ViewportStateManager
====================

A viewport state manager utility to observe changes in breakpoints and adapt UIs accordingly.

## Usage

ViewportStateManager is DOM library agnostic. It does however, require [`lodash.js`](http://lodash.com) or [`underscore.js`](http://underscorejs.org) as a dependency.

Basic instantiation

``` js
  
  // Use the defaults
  var viewportStateManager = new ViewportStateManager();
  
  // Pass in your own configurations
  var viewportStateManager = new ViewportStateManager({
    ranges: {
      desktop: [1025, 5000],
      tablet: [768, 1024],
      handheld: [1, 767]
    },
    
    // Define a callback to be fired whenever the
    // viewport state is changed
    callback: function (newState, oldState) {
      
    }
  });
```

### Configuration Options

#### ranges (breakpoints)
**Type:** _Object_

```js
  // key – breakpoint name
  // value – min, max array of pixel dimenstions
  tablet: [768, 1024]
```

+ default – `desktop: [1025, 5000], tablet: [768, 1024], handheld: [1, 767]`


#### callback
Method to be applied each time your viewport crosses into a new breakpoint range

**Type:** _Function_

```js
 function (newState, oldState) { /* ... */ };
```

+ `newState` - **Type:** _String_ - The name of the breakpoint you are currently in
+ `oldState` - **Type:** _String_ - The name of the breakpoint you exited from


#### debounceTime
Duration of debounce set on the window `resize` or `orientationchange` events

**Type:** _Number_
+ default: `250`


#### currentViewportState
The default viewport state. _Note:_ This will automatically be set on instantiation, so this step isn't always necessary.

**Type:** _String_
+ default: `''`

---

## Browser Compatibility

Browser support for IE9+, Chrome, Firefox, Safari, Android 2.3+, iOS 5+.

---

## AMD/RequireJS
The utility AMD compliant, so you can use it with [require.js](http://requirejs.org). Just remember, it carries its own dependency on 'lodash/underscore' so ensure that your configurations allow for VSM's consumption of that library.

I typically use the '_' key for my lodash/underscore configuration in RequireJS to allow me to switch cleanly between the two. For example:

``` js
  // Use lodash
  requirejs.config({
    paths: {
      '_' : 'lodash.compat.min'
    }
  });
  
  // Use underscore
  requirejs.config({
    paths: {
      '_' : 'underscore'
    }
  });
    
  // And then in your modules
  define(['_'], function (_) {
    // _ is either lodash or underscore, which for the 
    // most part is safely interchangeable
  });
    
```

To use ViewportStateManager via AMD:

``` js
  define(['viewportStateManager'], function (ViewportStateManager) {
    // Do your thing...
  });
```

---

## TODO
+ Allow for overlap across breakpoint ranges
+ Add method to toggle listeners on/off
+ Add destroy method
+ Add some examples
+ Write out tests
