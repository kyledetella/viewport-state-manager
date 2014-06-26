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
