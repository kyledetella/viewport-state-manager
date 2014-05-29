/*
 * ViewportStateManager v0.0.1
 * Babysit your viewport so you can manage that UI you made!
 *
 * Author: Kyle DeTella – @kyledetella / kyledetella.com
 * https://github.com/kyledetella/viewportStateManager
 */

/* global define:true */

(function (global) {

  'use strict';

  var VM;
  var doc = document;
  var debounceTime;

  function merge(base, options) {
    for (var key in options) {
      base[key] = options[key];
    }

    return base;
  }

  function bind (fn, ctx) {
    return function () {
      fn.apply(ctx, arguments);
    }
  }

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

  VM = function () {
    var ViewportStateManager;

    ViewportStateManager = function (opts) {
      this.config = merge(this.defaults, opts);
      debounceTime = opts.debounceTime ? opts.debounceTime : this.defaults.debounceTime;

      global.addEventListener(this.config.viewportChangeEvent, bind(this.observeViewportState, this));

      this.observeViewportState.call(this, null);

      return this;
    };


    ViewportStateManager.prototype = {
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

      observeViewportState: debounce(function () {
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
    };

    return ViewportStateManager;
  };


  if (typeof define === 'function' && define.amd) {
    define(VM);
  } else if ( typeof exports === 'object' ) {
    module.exports = VM();
  } else {
    global.viewportStateManager = VM();
  }

})(window);
