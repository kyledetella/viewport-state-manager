ViewportStateManager
====================

A viewport state manager utility to observe changes in breakpoints and adapt UIs accordingly.

## Usage

The only hard dependency is `lodash.js`[http://lodash.com] ord `underscore.js`[http://underscorejs.org].

``` js
  
  // Basic instantiation
  var viewportManager = new ViewportManager();
  
  // Pass in configurations
  var viewportManager = new ViewportManager({
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