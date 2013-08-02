ViewportManager
===============

A viewport state manager utility to observe changes in breakpoints and adapt UIs accordingly.

## Usage

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
