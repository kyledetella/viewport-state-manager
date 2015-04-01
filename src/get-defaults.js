'use strict';

var noop = require('./noop');

module.exports = function getDefaults() {
  return {
    changeEvent: 'onorientationchange' in global ? 'orientationchange' : 'resize',
    shouldLog: false,
    callback: noop,
    ranges: {
      desktop: [1025, 5000],
      tablet: [768, 1024],
      handheld: [1, 767]
    },
    debounceTime: 250
  };
}
