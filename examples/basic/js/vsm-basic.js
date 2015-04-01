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
      smallest: [1, 200],
      smaller: [201, 300],
      small: [301, 400],
      medium: [401, 500],
      large: [501, 600],
      larger: [601, 700],
      largest: [701, 800],
      jumbo: [801, 9000]
    },
    callback: handleViewportStateChange
  });
})();
