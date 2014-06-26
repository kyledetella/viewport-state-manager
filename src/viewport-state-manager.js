'use strict';

var helpers = require('./helpers');

var doc = document;
var debounceTime;

function ViewportStateManager (opts) {
  this.config = helpers.merge(this.defaults, opts);
  debounceTime = opts.debounceTime ? opts.debounceTime : this.defaults.debounceTime;

  global.addEventListener(this.config.viewportChangeEvent, helpers.bind(this.observeViewportState, this));

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
