'use strict';

var bind = require('lodash.assign');
var has = require('lodash.has');
var assign = require('lodash.assign');
var debounce = require('lodash.debounce');
var getInitialState = require('./get-initial-state');
var getDefaults = require('./get-defaults');

function ViewportStateManager(options) {
  this.config = assign(getDefaults(), options);

  this.state = getInitialState();

  this.attachEvents();
  this.detectViewportState.call(this, null);
}

ViewportStateManager.prototype.attachEvents = function () {
  var debounceTime = this.config.debounceTime;

  this.detectHandler = debounce(this.detectViewportState.bind(this), debounceTime);

  global.addEventListener(this.config.changeEvent, this.detectHandler);
};

ViewportStateManager.prototype.setViewportState = function (newState, previousState) {
  this.setState({
    currentViewportState: newState,
    previousViewportState: previousState || 'default'
  });

  this.config.callback(this.state.currentViewportState, this.state.previousViewportState);
};

ViewportStateManager.prototype.changeViewportState = function (newState) {
  var lastState;
  var currentState = this.state.currentViewportState;

  if (newState !== currentState) {
    lastState = currentState;
    this.setViewportState(newState, lastState);
  }
};

ViewportStateManager.prototype.detectViewportState = function () {
  var width = document.documentElement.clientWidth;
  var ranges = this.config.ranges;

  for (var breakpoint in ranges) {
    if (ranges.hasOwnProperty(breakpoint)) {
      if (width >= ranges[breakpoint][0] && width <= ranges[breakpoint][1]) {
        if (this.state.firstRun) {
          this.setViewportState(breakpoint);
          this.setState({firstRun: false});
        } else {
          this.changeViewportState(breakpoint);
        }
      }
    }
  }
};

ViewportStateManager.prototype.setState = function (newStateValue) {
  assign(this.state, newStateValue);
};

module.exports = ViewportStateManager;
