(function () {
  var vsm;

  function handleViewportStateChange(newState, lastState) {
    if (lastState === 'default') {
      output = 'Starting at ' + newState;
    } else {
      output = 'Changed from ' + lastState + ' to ' + newState;
    }
    reporter.innerHTML = output;
  }

  vsm = new ViewportStateManager({
    ranges: {
      desktop: [1025, 5000],
      tablet: [768, 1024],
      handheld: [1, 767]
    },
    callback: handleViewportStateChange
  });
})();
