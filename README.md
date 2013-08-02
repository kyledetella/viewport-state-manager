ViewportStateManager
====================

A viewport state manager utility to observe changes in breakpoints and adapt UIs accordingly.

## Usage

ViewportStateManager is DOM library agnostic. It does however, require [`lodash.js`](http://lodash.com) or [`underscore.js`](http://underscorejs.org) as a dependency.

### AMD
The utility AMD compliant, so you can use it with [require.js](http://requirejs.org).

``` js
  define(['/path/to/viewportStateManager'], function (ViewportStateManager) { // Do your thing... });
```

``` js
  
  // Basic instantiation
  var viewportStateManager = new ViewportStateManager();
  
  // Pass in configurations
  var viewportStateManager = new ViewportStateManager({
    ranges: {
      desktop: [1025, 5000],
      tablet: [768, 1024],
      handheld: [1, 767]
    }
  });
```

---

## Browser Compatibility

Browser support for IE9+, Chrome, Firefox, Safari, Android 2.3+, iOS 5+.

---

## TODO

+ Fully implement change callbacks
+ Write out full documentation