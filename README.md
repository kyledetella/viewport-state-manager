ViewportStateManager
====================

A viewport state manager utility to observe changes in breakpoints and adapt UIs accordingly.

## Usage

ViewportStateManager is DOM library agnostic. It does however, require [`lodash.js`](http://lodash.com) or [`underscore.js`](http://underscorejs.org) as a dependency.

### AMD
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

---

To use ViewportStateManager via AMD:

``` js
  define(['viewportStateManager'], function (ViewportStateManager) {
    // Do your thing...
  });
```

---

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

_ranges_ - An object containing 'breakpoint' names and an associated min/max pixel value that comprises its range




---

## Browser Compatibility

Browser support for IE9+, Chrome, Firefox, Safari, Android 2.3+, iOS 5+.

---

## TODO

+ Fully implement change callbacks
+ Write out full documentation