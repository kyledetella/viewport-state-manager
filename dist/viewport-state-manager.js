!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ViewportStateManager=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';

var helpers = _dereq_('./helpers');

var doc = document;
var debounceTime;

function ViewportStateManager (opts) {
  this.config = helpers.merge(this.defaults, opts);
  debounceTime = opts.debounceTime ? opts.debounceTime : this.defaults.debounceTime;

  if (window.addEventListener) {
    global.addEventListener(this.config.viewportChangeEvent, helpers.bind(this.observeViewportState, this));
  } else {
    global.attachEvent('on' + this.config.viewportChangeEvent, helpers.bind(this.observeViewportState, this));
  }

  this.observeViewportState.call(this, null);

  return this;
}

ViewportStateManager.prototype = helpers.merge(ViewportStateManager.prototype, {
  lastViewportState: '',
  currentViewportState: '',
  firstRun: true,
  defaults: {
    log: true,
    ranges: {
      desktop: [1025, 5000],
      tablet: [768, 1024],
      handheld: [1, 767]
    },
    debounceTime: 250,
    viewportChangeEvent: 'onorientationchange' in global ? 'orientationchange' : 'resize'
  },

  setViewportState: function (newState, oldState) {
    var shouldLog = this.config.log;

    this.currentViewportState = newState;

    if (oldState) {
      this.lastViewportState = oldState;
    } else {
      oldState = 'default';
    }

    if (typeof this.config.callback === 'function') {
      this.config.callback(newState, oldState);
    }
  },

  getViewportState: function () {
    return this.currentViewportState;
  },

  changeViewportState: function (newState) {
    var currentState, lastState;

    currentState = this.getViewportState();

    if (newState !== currentState) {
      lastState = currentState;
      this.setViewportState(newState, lastState);
    }
  },

  observeViewportState: helpers.debounce(function () {
    var _w = doc.documentElement.clientWidth;
    var ranges = this.config.ranges;

    for (var breakpoint in ranges) {
      if (_w >= ranges[breakpoint][0] && _w <= ranges[breakpoint][1]) {
        if (this.firstRun) {
          this.setViewportState(breakpoint);
          this.firstRun = false;
        } else {
          this.changeViewportState(breakpoint);
        }
      }
    }
  }, debounceTime)
});

module.exports = ViewportStateManager;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./helpers":4}],2:[function(_dereq_,module,exports){
function bind (fn, ctx) {
  return function () {
    fn.apply(ctx, arguments);
  }
}

module.exports = bind;

},{}],3:[function(_dereq_,module,exports){
function debounce (func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  function getNow() {
    return Date.now || function() { return new Date().getTime(); };
  }

  var later = function() {
    var last = getNow() - timestamp;
    if (last < wait) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = getNow();
    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

module.exports = debounce;

},{}],4:[function(_dereq_,module,exports){
exports.bind = _dereq_('./bind');
exports.debounce = _dereq_('./debounce');
exports.merge = _dereq_('./merge');

},{"./bind":2,"./debounce":3,"./merge":5}],5:[function(_dereq_,module,exports){
function merge(base, options) {
  for (var key in options) {
    base[key] = options[key];
  }

  return base;
}

module.exports = merge;

},{}]},{},[1])
(1)
});